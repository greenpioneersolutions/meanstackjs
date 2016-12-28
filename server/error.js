exports.log = log
exports.middleware = middleware

var chalksay = require('chalksay')
var httpStatus = require('http-status-codes')
var debug = require('debug')('meanstackjs:error')
var mongoose = require('mongoose')

function log (error, cb) {
  if (typeof cb !== 'function') {
    cb = function () { return }
  }
  try {
    var Errors = mongoose.model('error')
  } catch (e) {
    chalksay.red('This Error happend before mongoose could set up or you have deleted model')
    chalksay.red('This Uncaught Exceptions will not be tracked in the database')
    chalksay.red(JSON.stringify(error))
    return cb(true)
  }
  // error instanceof Error - maybe implement something last that is more specific to only Error's
  Errors.findOne({
    message: error.message || error
  }, function (err, data) {
    if (err)chalksay.red('Error trying to record error', err)
    if (typeof cb === 'function') {
      cb()
    }
    if (!data) {
      var errors = Errors({
        code: error.code,
        message: error.message || JSON.stringify(error),
        name: error.name,
        stack: error.stack,
        type: error.type || 'exception',
        history: [Date.now()]
      })
      errors.save(function (err) {
        if (err) {
          chalksay.red('Error trying to record error', err)
          return cb(err)
        }
        if (typeof cb === 'function') {
          chalksay.red(JSON.stringify(errors))
          return cb(false)
        }
      })
    } else {
      data.count++
      data.history.push(Date.now())
      data.save(function (err) {
        if (err) {
          chalksay.red('Error trying to record error', err)
          return cb(err)
        }
        if (typeof cb === 'function') {
          chalksay.red(JSON.stringify(data))
          return cb(false)
        }
      })
    }
  })
}

function middleware (self) {
  self.app.use(function (err, req, res, next) {
    var code = 500
    var message = err
    var type = 'express'
    var ip = req.ip
    if (!ip) {
      if (req.headers) {
        ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for']
      }
      if (!ip && req.connection && req.connection.remoteAddress) {
        ip = req.connection.remoteAddress
      }
    }
    if (typeof err.status === 'number') {
      code = err.status
    }
    if (err.message || err.msg) {
      message = err.message || err.msg
    }

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

    var text = '\n=== EXCEPTION ===\n  <br>' +
'Message:<br>' + message + '\n <br>' +
'Code:<br>' + code + '\n <br>' +
'User:<br>' + (req.user ? req.user.email : 'no user info') + '\n <br>' +
'IP Address:<br>' + (ip || 'no IP') + '\n <br>' +
'User-Agent:<br>' + JSON.stringify(req.headers['user-agent']) + '\n <br>' +
'Route:<br>' + req.method + '-' + req.url + '\n <br>' +
'Headers:<br>' + '\n' + JSON.stringify(req.headers) + '\n <br>' +
'Params:<br>' + '\n' + JSON.stringify(req.params) + '\n <br>' +
'Body:<br>' + '\n' + JSON.stringify(req.body) + '\n <br>' +
'Session:<br>' + '\n' + JSON.stringify(req.session) + '\n <br>' +
'Stack:<br>' + err.stack + '\n'
    code = 500
    res.status(code)

    if (code > 499) {
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
    debug('error message & code:' + message.message + ' - ' + code)
    return res.send(renderData)
  })
}

