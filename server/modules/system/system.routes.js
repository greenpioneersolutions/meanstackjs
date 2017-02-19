var system = require('./system.controller.js')

module.exports = function (app, auth, mail, settings, models, logger) {
  app.get('/api/testing/', system.testing(mail, settings))
  app.get('/api/settings/', system.pug(settings))
  app.get('/api/system/status', system.status)
  app.use('/api/proxy/*', system.proxy)
}
