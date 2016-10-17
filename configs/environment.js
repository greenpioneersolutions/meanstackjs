var debug = require('debug')('meanstackjs:environment')
var environment = process.env.NODE_ENV || 'development'

exports.get = function (env) {
  environment = env || environment
  debug('get:', environment)
  return environment
}
exports.set = function (env) {
  environment = env
  debug('set:', environment)
  return environment
}
