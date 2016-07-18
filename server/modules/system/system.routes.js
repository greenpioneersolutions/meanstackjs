var system = require('./system.controller.js')
var pug = require('pug')
var path = require('path')

module.exports = function (app, auth, mail, settings) {
  app.get('/api/testing/', system.testing(mail, settings))
  app.get('/api/settings/', function (req, res) {
    res.send(pug.renderFile(path.join(__dirname, 'setting.view.pug'), {settings: settings}))
  })
}
