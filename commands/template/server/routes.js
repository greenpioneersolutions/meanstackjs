var <%= name %> = require('./<%= name %>.controller.js')

module.exports = function (app, auth, mail, settings, models, logger) {
  // GET
  app.get('/api/<%= name %>/', <%= name %>.get<%= Name %>)
  app.get('/api/<%= name %>/:<%= name %>Id', <%= name %>.get<%= Name %>ById)
  // POST
  app.post('/api/<%= name %>', <%= name %>.post<%= Name %>)
  // PUT
  app.put('/api/<%= name %>/:<%= name %>Id', <%= name %>.put<%= Name %>)
  // DELETE
  app.delete('/api/<%= name %>/:<%= name %>Id', <%= name %>.delete<%= Name %>)
  // PARAM
  app.param('<%= name %>Id', <%= name %>.param<%= Name %>)
}
