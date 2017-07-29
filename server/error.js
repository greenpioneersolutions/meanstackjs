exports.log = log
exports.middleware = middleware

var httpStatus = require('http-status-codes')
var debug = require('debug')('meanstackjs:error')
var logger = require('./logger.js').logger

function log (error, cb) {
  if (typeof cb !== 'function') {
    cb = function () {}
  }
  if (!(error instanceof Error)) {
    error = new Error(error)
  }
  logger.error(error.message, error)
}

function jsonStringify (obj) {
  return JSON.stringify(obj, null, 2)
}

function middleware (self) {
  self.app.use(function (error, req, res, next) {
    var code = typeof error.status === 'number' ? error.status : 500
    var message = error.message || error.msg
    var type = 'express'
    var ip = req.ip || req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress

    if (error.name === 'ValidationError') {
      code = 400
      message = 'Validation Error'
      type = 'mongo'
    }
    if (error.name === 'CastError') {
      code = 400
      message = 'Invalid Cast'
      type = 'mongo'
    }
    if (error.message === 'MongoError') {
      code = 400
      if (error.code === 11000) message = 'Duplicate key error '
      else message = 'Database Error'
      type = 'mongo'
    }

    var text = '\n=== EXCEPTION ===\n  \n' +
      'Message:\n' +
      message + '\n\n' +
      'Code:\n' + code + '\n \n' +
      'User:\n' + (req.user ? req.user.email : 'no user info') + '\n \n' +
      'IP Address:\n' + (ip || 'no IP') + '\n \n' +
      'User-Agent:\n' + jsonStringify(req.headers['user-agent']) + '\n \n' +
      'Route:\n' + req.method + '-' + req.url + '\n \n' +
      'Headers:\n' + '\n' + jsonStringify(req.headers) + '\n \n' +
      'Params:\n' + '\n' + jsonStringify(req.params) + '\n \n' +
      'Body:\n' + '\n' + jsonStringify(req.body) + '\n \n' +
      'Session:\n' + '\n' + jsonStringify(req.session) + '\n \n' +
      'Stack:\n' + error.stack + '\n'

    res.status(code)

    if (code >= 500) {
      error.type = type
      error.stack = text
      log(error)
    }

    var renderData = {
      text: '',
      message: message,
      code: code,
      title: code + ' ' + httpStatus.getStatusText(code)
    }
    if (self.environment !== 'production') {
      renderData.text = text
    }
    debug('error message & code:' + message + ' - ' + code)
    return res.send(renderData)
  })
}
