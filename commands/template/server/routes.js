var __name__ = require('./__name__.controller.js')

module.exports = function (app, auth, mail, settings) {
  // GET
  app.get('/api/__name__/', __name__.get__Name__)
  app.get('/api/__name__/:__name__Id', __name__.get__Name__ById)
  // POST
  app.post('/api/__name__', __name__.post__Name__)
  // PUT
  app.put('/api/__name__/:__name__Id', __name__.put__Name__)
  // DELETE
  app.delete('/api/__name__/:__name__Id', __name__.delete__Name__)
  // PARAM
  app.param('__name__Id', __name__.param__Name__)
}
