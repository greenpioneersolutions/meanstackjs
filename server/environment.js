module.exports = {
  set: set,
  get: get
}
var debug = require('debug')('meanstackjs:environment')
var environment = 'development'

function get (env) {
  environment = env || process.env.NODE_ENV || environment
  debug('get:', environment)
  return environment
}
function set (env) {
  environment = process.env.NODE_ENV = env
  debug('set:', environment)
  return environment
}
