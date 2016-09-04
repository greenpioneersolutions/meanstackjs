var debug = require('debug')('meanstackjs:environment')
var environment = 'development'

exports.get = function (env) {
  environment = env || process.env.NODE_ENV || environment
  debug('get:', environment)
  return environment
}
exports.set = function (env) {
  environment = process.env.NODE_ENV = env
  debug('set:', environment)
  return environment
}
