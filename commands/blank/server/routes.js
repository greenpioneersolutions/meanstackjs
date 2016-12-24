var <%= name %> = require('./<%= name %>.controller.js')

module.exports = function (app, auth, mail, settings, models) {
  // GET
  app.get('/api/<%= name %>/', <%= name %>.get<%= Name %>)
}
