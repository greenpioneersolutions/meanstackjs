var __name__ = require('./__name__.controller.js')

module.exports = function (app, auth, mail, settings) {
  app.get('/__name__/', __name__.__name__)
}
