exports.log = log
exports.middleware = middleware

var chalksay = require('chalksay')
var httpStatus = require('http-status-codes')
var debug = require('debug')('meanstackjs:error')
var mongoose = require('mongoose')
var ErrorsModel = null

function checkError (err, cb) {
  if (err) {
    chalksay.red('Error trying to record error', err.stack)
    cb && cb(err)
    return true
  }
}

function log (error, cb) {
  if (typeof cb !== 'function') {
    cb = function () {}
  }

  try {
    ErrorsModel = ErrorsModel || mongoose.model('error')
  } catch (e) {
    chalksay.red('This Error happend before mongoose could set up or you have deleted model')
    chalksay.red('This Uncaught Exceptions will not be tracked in the database')
    chalksay.red('Reason:')
    chalksay.red(e.stack)
    chalksay.red('Original error:')
    chalksay.red(error.stack)
    return cb(true)
  }

  if (!(error instanceof Error)) {
    error = new Error(error)
  }

  // error instanceof Error - maybe implement something last that is more specific to only Error's
  ErrorsModel.findOne({
    message: error.message
  }, function (err, data) {
    checkError(err)

    if (!data) {
      var errors = ErrorsModel({
        code: error.code,
        message: error.message,
        name: error.name,
        stack: error.stack,
        type: error.type || 'exception',
        history: [Date.now()]
      })
      errors.save(function (err) {
        if (checkError(err, cb)) { return }
        chalksay.red(errors)
        cb(false)
      })
    } else {
      data.count++
      data.history.push(Date.now())
      data.save(function (err) {
        if (checkError(err, cb)) { return }
        chalksay.red(data)
        cb(false)
      })
    }
  })
}

function jsonStringify (obj) {
  return JSON.stringify(obj, null, 2)
}

function middleware (self) {
  self.app.use(function (err, req, res, next) {
    var code = typeof err.status === 'number' ? err.status : 500
    var message = err.message || err.msg
    var type = 'express'
    var ip = req.ip || req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress

    if (err.name === 'ValidationError') {
      code = 400
      message = 'Validation Error'
      type = 'mongo'
    }
    if (err.name === 'CastError') {
      code = 400
      message = 'Invalid Cast'
      type = 'mongo'
    }
    if (err.message === 'MongoError') {
      code = 400
      if (err.code === 11000) message = 'Duplicate key error '
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
      'Stack:\n' + err.stack + '\n'

    res.status(code)

    if (code >= 500) {
      err.type = type
      err.stack = text
      log(err)
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

