var _ = require('lodash')
var jwt = require('jsonwebtoken')
var settings = require('./../configs/settings.js')
var mongoose = require('mongoose')

function findUser (id, cb) {
  var User = mongoose.model('users')
  User.findOne({
    _id: id
  }, '-password', function (err, user) {
    if (err || !user) return cb(null)
    cb(user)
  })
}

/**
 * Login Required middleware.
 */
function isAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    return res.status(401).send({
      success: false, msg: 'User needs to re-authenticated'
    })
  }
}
function isMongoId (req, res, next) {
  if ((_.size(req.params) === 1) && (!mongoose.Types.ObjectId.isValid(_.values(req.params)[0]))) {
    return res.status(500).send({success: false, msg: 'Parameter passed is not a valid Mongo ObjectId'})
  }
  next()
}

function verify (req, res, next) {
  var User = mongoose.model('users')
  try {
    var token = getToken(req.headers)
    if (token) {
      jwt.verify(token, settings.jwt.secret, function (err, decoded) {
        if (err) {
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
          User.findOne({
            email: decoded.email
          }, function (err, user) {
            if (err) throw err
            if (!user) {
              return res.status(401).send({success: false, msg: 'Authentication failed. User not found.'})
            } else {
              next()
            }
          })
        }
      })
    } else {
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

module.exports = exports = {
  findUser: findUser,
  isAuthenticated: isAuthenticated,
  isMongoId: isMongoId,
  verify: verify,
  getToken: getToken
}
