var _ = require('lodash')
var debug = require('debug')('meanstackjs:middleware')
var tokenAPI = require('./token.js')

exports.checkAuthenticated = function (req, cb) {
  debug('middleware: checkAuthenticated')
  var token = req.headers.authorization || req.query.token || req.body.token // || req.headers['x-access-token']
  if (req.isAuthenticated()) {
    return cb()
  } else if (token) {
    tokenAPI.checkKey(token, function (err, user) {
      if (err) return cb(err)
      req.user = user
      return cb()
    })
  } else {
    return cb({
      success: false,
      msg: 'User needs to authenticated'
    })
  }
}

exports.isAuthenticated = function (req, res, next) {
  debug('middleware: isAuthenticated')
  exports.checkAuthenticated(req, function (err) {
    if (err) return res.status(401).send(err)
    return next()
  })
}

exports.isAuthorized = function (name, extra) {
  return function (req, res, next) {
    debug('middleware: isAuthorized')
    exports.checkAuthenticated(req, function (err) {
      if (err) return res.status(401).send(err)
      var user
      var reqName = req[name]
      if (extra) {
        var reqExtra = reqName[extra]
        reqExtra && reqExtra.user && (user = reqExtra.user)
      } else {
        user = reqName.user
      }
      if (req.user) {
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
    })
  }
}

exports.hasRole = function (role) {
  return function (req, res, next) {
    debug('middleware: hasRole')
    exports.checkAuthenticated(req, function (err) {
      if (err) return res.status(401).send(err)
      if (req.user) {
        if (_.includes(req.user.roles, role)) {
          return next()
        }
      }
      return res.status(403).send({
        success: false,
        msg: 'Forbidden'
      })
    })
  }
}

exports.isAdmin = function (req, res, next) {
  debug('middleware: isAdmin')
  exports.checkAuthenticated(req, function (err) {
    if (err) return res.status(401).send(err)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}

