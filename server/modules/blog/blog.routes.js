var blog = require('./blog.controller.js')

module.exports = function (app, auth, mail, settings) {
  // GET
  app.get('/api/blog/', blog.getBlog)
  app.get('/api/blog/:blogId', blog.getBlogById)
  // POST
  app.post('/api/blog', auth.isAuthenticated, blog.postBlog)
  // PUT
  app.put('/api/blog/:blogId', auth.isAuthenticated, blog.putBlog)
  // DELETE
  app.delete('/api/blog/:blogId', auth.isAuthenticated, blog.deleteBlog)
  // PARAM
  app.param('blogId', blog.paramBlog)
}
