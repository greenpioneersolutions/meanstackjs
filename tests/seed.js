var mongoose = require('mongoose')
var User = mongoose.model('users')
var Blog = mongoose.model('blog')
User.find({}).remove().exec()
Blog.find({}).remove().exec()
User.create({
  email: 'test@greenpioneersolutions.com',
  password: 'truetrue1!',
  profile: {
    name: 'jason greenpioneer'
  }
}).then(function (users) {
  Blog.create({
    title: 'Mean',
    content: 'Mongo Express Angular Node',
    user: users._id
  })
})
