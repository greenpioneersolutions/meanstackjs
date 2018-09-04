require('dotenv').config({ silent: true })
const environment = process.env.NODE_ENV || 'development'
const globalSettings = {
  mongodb: {
    uri: 'mongodb://localhost/dev',
    options: {}
  },
  app: {
    name: process.env.APP_NAME || 'MenStackJS'
  },
  port: {
    http: 3000,
    https: 3000,
    http2: 3001,
    mongoexpress: 8081,
    socket: 8282
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'MEANSTACKJS',
    options: {
      expiresIn: 86400 // 24 hours
    }
  }
}
var settings = {}
exports.init = function (options) {
  if (!options) options = {}
  settings = Object.assign({},
    globalSettings,
    getEnvSettings(environment),
    options,
    { environment: environment }
  )
  return settings
}
exports.get = function () {
  return settings
}

exports.set = function (identifer, value) {
  settings[identifer] = value
  return settings
}
function getEnvSettings (env) {
  return require(`./environments/${env}.js`)
}
