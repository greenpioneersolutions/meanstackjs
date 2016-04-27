module.exports = seed
var mongoose = require('mongoose')
var User = mongoose.model('users')
var Blog = mongoose.model('blog')

function seed (cb) {
  User.find({}).remove().exec()
  Blog.find({}).remove().exec()
  var users = User.create({
    email: 'test@greenpioneersolutions.com',
    password: 'truetrue1!',
    profile: {
      name: 'jason greenpioneer'
    }
  })
  var blog = Blog.create({
    title: 'Mean',
    content: 'Mongo Express Angular Node',
    user: users._id
  })
  cb(blog)
}
