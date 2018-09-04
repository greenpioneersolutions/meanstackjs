const blog = require('./blog.controller.js')
const { check } = require('express-validator/check')

const blogIdChecks = [
  check('blogId').exists().withMessage('Your Blog ID cannot be blank'),
  check('blogId').isMongoId().withMessage('Your Blog ID has to be a real id')
]
const blogCreateIdChecks = [
  check('title').exists().withMessage('title cannot be blank'),
  check('content').exists().withMessage('content cannot be blank'),
  check('user').isMongoId().withMessage('user has to be a real id')
]

module.exports = (app, auth, mail, settings, models, logger) => {
  app.get('/api/blog/', blog.getBlog)
  app.get('/api/blog/:blogId', blogIdChecks, blog.paramBlog, blog.getBlogById)
  app.post('/api/blog', auth.isAuthenticated, blogCreateIdChecks, blog.postBlog)
  app.put('/api/blog/:blogId', blogIdChecks, blog.paramBlog, auth.isAuthorized('blog'), blog.putBlog)
  app.delete('/api/blog/:blogId', blogIdChecks, blog.paramBlog, auth.isAuthorized('blog'), blog.deleteBlog)
}
