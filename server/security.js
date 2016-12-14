module.exports = security
var cors = require('cors')
var contentLength = require('express-content-length-validator')
var helmet = require('helmet')
var hpp = require('hpp')
// var throttler = require('mongo-throttle')

function security (self) {
  // Mongo-Throttle
  // Limit/Throttle the requests to your system
  // You have multiple options with package \/
  // only rate-limit requests that begin with /api/ , configure limits: & configure a custom limit handler
  // self.app.use(throttler(self.settings.throttle))

  // 7 security middleware
  self.app.use(helmet(self.settings.bodyparser.helmet))

  // 3 security middleware
  // self.app.use(helmet.contentSecurityPolicy())
  // self.app.use(helmet.hpkp())
  // self.app.use(helmet.noCache())
  // HTTP Parameter Pollution attacks
  self.app.use(hpp())

  // CORS
  // var whitelist = ['http://example1.com', 'http://example2.com']
  // var corsOptions = {
  //   origin: function (origin, callback) {
  //     var originIsWhitelisted = whitelist.indexOf(origin) !== -1
  //     callback(null, originIsWhitelisted)
  //   }
  // }
  // self.app.use(cors(corsOptions))
  self.app.use(cors())

  // CORS PREFLIGHT OPTIONS
  // app.options('*', cors()) // include before other routes
  // Validate MAX_CONTENT_LENGTH_ACCEPTED
  var MAX_CONTENT_LENGTH_ACCEPTED = 9999
  self.app.use(contentLength.validateMax({
    max: MAX_CONTENT_LENGTH_ACCEPTED,
    status: 400,
    message: 'Please make a small payload'
  }))
}
