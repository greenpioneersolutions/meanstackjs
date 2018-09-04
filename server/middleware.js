module.exports = { hasRole, isAdmin, isAuthorized, isAuthenticated, checkAuthenticated }

const _ = require('lodash')
const tokenAPI = require('./token.js')

function checkAuthenticated (req, cb) {
  const token = req.headers.authorization || req.query.token || req.body.token // || req.headers['x-access-token']
  if (req.isAuthenticated()) {
    return cb()
  } else if (token) {
    tokenAPI.checkKey(token, (error, user) => {
      if (error) return cb(error)
      req.user = user
      return cb()
    })
  } else {
    const errMsg = {
      success: false,
      message: 'User needs to authenticated'
    }
    return cb(errMsg)
  }
}

function isAuthenticated (req, res, next) {
  checkAuthenticated(req, error => {
    if (error) return res.status(401).send(error)
    return next()
  })
}

function isAuthorized (name, extra) {
  return (req, res, next) => {
    checkAuthenticated(req, error => {
      if (error) return res.status(401).send(error)
      let user
      const reqName = req[name]
      if (extra) {
        const reqExtra = reqName[extra]
        reqExtra && reqExtra.user && (user = reqExtra.user)
      } else {
        user = reqName.user
      }
      if (req.user) {
        if (user._id.toString() !== req.user._id.toString()) {
          return next({
            status: 401,
            message: 'User is not Authorized'
          })
        } else {
          return next()
        }
      } else {
        return res.status(401).send({
          success: false,
          message: 'User needs to re-authenticated'
        })
      }
    })
  }
}

function hasRole (role) {
  return (req, res, next) => {
    checkAuthenticated(req, error => {
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
  checkAuthenticated(req, error => {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
