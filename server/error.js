module.exports = errorMiddleware

var pug = require('pug')
// var errorHandler = require('errorhandler')
var httpStatus = require('http-status-codes')

function errorMiddleware (self) {
  // if (self.environment === 'development') {
  //   self.app.use(errorHandler())
  // }
  self.app.use(function (err, req, res, next) {
    var code = 500
    var message = err
    if (err.message) {
      message = {message: err.message}
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
    if (code === 400) {
      self.debug('No notify for 400 error')
    } else if (code === 401) {
      self.debug('No notify for 401 error')
    } else if (code === 402) {
      self.debug('No notify for 402 error')
    } else if (code === 403) {
      self.debug('No notify for 403 error')
    } else if (code === 404) {
      self.debug('No notify for 404 error')
    } else {
      // send mail?
      var html
      if (self.environment === 'production') {
        html = pug.renderFile('./server/error.pug', {
          text: '',
          code: code,
          title: code + ' ' + httpStatus.getStatusText(code)
        })
      } else {
        html = pug.renderFile('./server/error.pug', {
          text: text,
          code: code,
          title: code + ' ' + httpStatus.getStatusText(code)
        })
      }
      return res.send(html)
    }
    res.send(message)
  })
}
