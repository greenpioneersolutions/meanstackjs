var system = require('./system.controller.js')

module.exports = function (app, auth, mail, settings, models) {
  app.get('/api/testing/', system.testing(mail, settings))
  app.get('/api/settings/', system.pug(settings))
  app.use('/api/proxy/*', system.proxy)
}
