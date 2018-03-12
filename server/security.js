module.exports.securityMiddleware = security

var cors = require('cors')
var contentLength = require('express-content-length-validator')
var helmet = require('helmet')
var hpp = require('hpp')
var throttler = require('mongo-throttle')

function security (self) {
  // LIMIT/THROTTLE THE REQUESTS
  if (self.settings.security.throttler.active) self.app.use(throttler(self.settings.security.throttler.options))
  // HELMET SECURITY MIDDLEWARE
  self.app.use(helmet(self.settings.security.helmet.options))
  if (self.settings.security.contentSecurityPolicy.active)self.app.use(helmet.contentSecurityPolicy(self.settings.security.contentSecurityPolicy.options))
  if (self.settings.security.hpkp.active)self.app.use(helmet.hpkp(self.settings.security.hpkp.options))
  if (self.settings.cache.headers.active)self.app.use(helmet.noCache())
  // HTTP Parameter Pollution attacks
  if (self.settings.security.hpp.active)self.app.use(hpp(self.settings.security.hpp.options))
  // CORS
  if (self.settings.security.cors.active)self.app.use(cors(self.settings.security.cors.options))
  if (self.settings.security.cors.preflight)self.app.options('*', cors(self.settings.security.cors.options)) // include before other routes
  // CONTENT LENGTH
  if (self.settings.security.contentLength.active) self.app.use(contentLength.validateMax(self.settings.security.contentLength.options))
}
