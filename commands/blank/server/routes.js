var __name__ = require('./__name__.controller.js')

module.exports = function (app, auth, mail, settings, models) {
  // GET
  app.get('/api/__name__/', __name__.get__Name__)
}
