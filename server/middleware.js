exports.checkAuthenticated = checkAuthenticated
exports.isAuthenticated = isAuthenticated
exports.isAuthorized = isAuthorized
exports.hasRole = hasRole
exports.isAdmin = isAdmin

var _ = require('lodash')
var debug = require('debug')('meanstackjs:middleware')
var tokenAPI = require('./token.js')

function checkAuthenticated (req, cb) {
  debug('middleware: checkAuthenticated')
  var token = req.headers.authorization || req.query.token || req.body.token // || req.headers['x-access-token']
  if (req.isAuthenticated()) {
    return cb()
  } else if (token) {
    tokenAPI.checkKey(token, function (error, user) {
      if (error) return cb(error)
      req.user = user
      return cb()
    })
  } else {
    return cb({
      success: false,
      message: 'User needs to authenticated'
    })
  }
}

function isAuthenticated (req, res, next) {
  debug('middleware: isAuthenticated')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    return next()
  })
}

function isAuthorized (name, extra) {
  return function (req, res, next) {
    debug('middleware: isAuthorized')
    checkAuthenticated(req, function (error) {
      if (error) return res.status(401).send(error)
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
            message: 'User is not Authorized'
          })
        } else {
          debug('middleware: isAuthenticated')
          return next()
        }
      } else {
        debug('middleware: is Not Authorized ')
        return res.status(401).send({
          success: false,
          message: 'User needs to re-authenticated'
        })
      }
    })
  }
}

function hasRole (role) {
  return function (req, res, next) {
    debug('middleware: hasRole')
    checkAuthenticated(req, function (error) {
      if (error) return res.status(401).send(error)
      if (req.user) {
        if (_.includes(req.user.roles, role)) {
          return next()
        }
      }
      return res.status(403).send({
        success: false,
        message: 'Forbidden'
      })
    })
  }
}

function isAdmin (req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}

