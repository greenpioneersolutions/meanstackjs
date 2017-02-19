var admin = require('./admin.controller.js')

module.exports = function (app, auth, mail, settings, models, logger) {
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

  // LOGS
  app.get('/api/admin/logs/', auth.isAdmin, function (req, res, next) {
    logger.query({
      from: req.query.from || (new Date() - 24 * 60 * 60 * 1000),
      until: req.query.until || new Date(),
      limit: req.query.limit || 10,
      start: req.query.start || 0,
      order: req.query.order || 'desc',
      fields: req.query.fields || undefined
    }, function (error, results) {
      if (error) return next(error)
      if (req.query.select) return res.status(200).send(results[req.query.select])
      return res.status(200).send(results)
    })
  })
}
