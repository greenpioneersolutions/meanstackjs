var system = require('./system.controller.js')

module.exports = function (app, auth, mail, settings) {
  app.get('/api/testing/', system.testing(mail, settings))
}
