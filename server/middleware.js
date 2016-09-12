var _ = require('lodash')
var jwt = require('jsonwebtoken')
var settings = require('./../configs/settings.js').get()
var mongoose = require('mongoose')
var debug = require('debug')('meanstackjs:middleware')

function findUser (id, cb) {
  var User = mongoose.model('users')
  User.findOne({
    _id: id
  }, '-password', function (err, user) {
    if (err || !user) return cb(null)
    cb(user)
  })
}

exports.isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    debug('middleware: isAuthenticated')
    return next()
  } else {
    debug('middleware: is Not Authenticated ')
    return res.status(401).send({
      success: false, msg: 'User needs to re-authenticated'
    })
  }
}

exports.isAuthorized = function (name, extra) {
  return function (req, res, next) {
    var user
    try {
      if (extra) user = req[name][extra].user
      else user = req[name].user
    } catch (err) {
      next(err)
    }
    if (req.isAuthenticated()) {
      if (user._id.toString() !== req.user._id.toString()) {
        debug('middleware: is Not Authorized')
        return next({
          status: 401,
          msg: 'User is not Authorized'
        })
      } else {
        debug('middleware: isAuthenticated')
        return next()
      }
    } else {
      debug('middleware: is Not Authorized ')
      return res.status(401).send({
        success: false,
        msg: 'User needs to re-authenticated'
      })
    }
  }
}
exports.hasRole = function (role) {
  return function (req, res, next) {
    if (!req.isAuthenticated() || req.user.roles.indexOf(role) === -1) {
      return res.status(403).send({
        success: false,
        msg: 'Forbidden'
      })
    }
    next()
  }
}
exports.isAdmin = function (req, res, next) {
  if (req.isAuthenticated()) {
    debug('middleware: isAdmin')
    findUser(req.user._id, function (user) {
      if (!user) return res.status(401).send('User is not authorized')
      if (user.roles.indexOf('admin') === -1) return res.status(401).send('User is not authorized')
      req.user = user
      return next()
    })
  } else {
    debug('middleware: is Not Admin ')
    return res.status(401).send({
      success: false, msg: 'User is not authorized'
    })
  }
}
exports.isMongoId = function (req, res, next) {
  if ((_.size(req.params) === 1) && (!mongoose.Types.ObjectId.isValid(_.values(req.params)[0]))) {
    debug('middleware Not Mongo ID: ' + _.values(req.params)[0])
    return res.status(500).send({success: false, msg: 'Parameter passed is not a valid Mongo ObjectId'})
  }
  next()
}

exports.verify = function (req, res, next) {
  var User = mongoose.model('users')
  try {
    var token = getToken(req.headers)
    if (token) {
      jwt.verify(token, settings.jwt.secret, function (err, decoded) {
        if (err) {
          debug('middleware verify error: ', err)
          switch (err.name) {
            case 'TokenExpiredError':
              res.status(401).send({
                success: false,
                msg: 'It appears your token has expired'
              }) // Date(err.expiredAt)
              break
            case 'JsonWebTokenError':
              res.status(401).send({
                success: false,
                msg: 'It appears you have invalid signature'
              })
              break
          }
        } else {
          if (decoded._id === req.user._id.toString()) {
            User.findOne({
              _id: decoded._id
            }, function (err, user) {
              if (err) throw err
              if (!user) {
                return res.status(401).send({success: false, msg: 'Authentication failed. User not found.'})
              } else {
                debug('middleware verify user: ', user.email)
                next()
              }
            })
          } else {
            res.status(401).send({
              success: false,
              msg: 'Please log in'
            })
          }
        }
      })
    } else {
      debug('middleware no token provided')
      return res.status(401).send({success: false, msg: 'No token provided.'})
    }
  } catch (err) {
    console.log(err, 'err')
  }
}
function getToken (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ')
    if (parted.length === 2) {
      return parted[1]
    } else {
      return null
    }
  } else {
    return null
  }
}
