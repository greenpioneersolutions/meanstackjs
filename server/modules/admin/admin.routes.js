var admin = require('./admin.controller.js')

module.exports = function (app, auth, mail, settings, models) {
  // USERS
  app.get('/api/admin/users', auth.isAdmin, admin.getUsers)
  app.get('/api/admin/users/:userId', auth.isAdmin, admin.getUsersById)
  // POST
  app.post('/api/admin/users', auth.isAdmin, admin.postUsers)
  // PUT
  app.put('/api/admin/users/:userId', auth.isAdmin, admin.putUsers)
  // DELETE
  app.delete('/api/admin/users/:userId', auth.isAdmin, admin.deleteUsers)
  // PARAM
  app.param('userId', admin.paramUsers)

// ERRORS
  app.get('/api/admin/errors/', auth.isAdmin, admin.getErrors)
  app.get('/api/admin/errors/:errorId', auth.isAdmin, admin.getErrorsById)
  // POST
  app.post('/api/admin/errors', auth.isAdmin, admin.postErrors)
  // PUT
  app.put('/api/admin/errors/:errorId', auth.isAdmin, admin.putErrors)
  // DELETE
  app.delete('/api/admin/errors/:errorId', auth.isAdmin, admin.deleteErrors)
  // PARAM
  app.param('errorId', admin.paramErrors)
}
