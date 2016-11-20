module.exports = logger
var morgan = require('morgan')
var debug = require('debug')('meanstackjs:logger')

function logger (self) {
  if (self.settings.logger) {
    self.app.use(morgan(self.settings.logger))
    self.app.use(function (req, res, next) {
      // Log requests using the "debug" module so that the output is hidden by default.
      // Enable with DEBUG=* environment variable.
      debug(req.method + ' ' + req.originalUrl + ' ' + req.ip)
      next()
    })
  }
}
