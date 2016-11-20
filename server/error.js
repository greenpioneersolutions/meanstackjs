module.exports = errorMiddleware

var pug = require('pug')
var httpStatus = require('http-status-codes')
var debug = require('debug')('meanstackjs:error')

function errorMiddleware (self) {
  self.app.use(function (err, req, res, next) {
    var code = 500
    var message = err

    if (err.message || err.msg) {
      message = {message: err.message || err.msg}
    }

    if (err.name === 'ValidationError') {
      err.status = 400
    }

    if (err.message === 'MongoError') {
      err.status = 400
      if (err.code === 11000) message.message = 'duplicate key error '
    }

    if (typeof err.status === 'number') {
      code = err.status
    }

    var text = '\n=== EXCEPTION ===\n' +
      req.method + ': ' + req.url + '\n' +
      err.stack + '\n' +
      'Headers:' + '\n' + req.headers + '\n' +
      'Params:' + '\n' + req.params + '\n' +
      'Body:' + '\n' + req.body + '\n' +
      'Session:' + '\n' + req.session + '\n'

    res.status(code)

    switch (code) {
      case 400:
      case 401:
      case 402:
      case 403:
      case 404:
        self.debug('No notify for ' + code + ' error')
        break
      default:
        var renderOptions = {
          text: text,
          code: code,
          title: code + ' ' + httpStatus.getStatusText(code)
        }

        if (self.environment === 'production') {
          renderOptions.text = ''
        }

        var html = pug.renderFile('./server/error.pug', renderOptions)
        return res.send(html)
    }

    debug('error message & code:' + message.message + ' - ' + code)
    res.send(message)
  })
  return
}
