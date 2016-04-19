module.exports = {
  set: set,
  get: get
}

var environment = 'development'

function get (env) {
  environment = env || process.env.NODE_ENV || environment
  return environment
}
function set (env) {
  environment = process.env.NODE_ENV = env
  return environment
}
