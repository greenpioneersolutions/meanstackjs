var auto = require('run-auto')
var mongoose = require('mongoose')
var blogs = mongoose.model('blog')
var _ = require('lodash')

exports.getBlog = function (req, res, next) {
  auto({
    blogs: function (cb) {
      blogs
        .find()
        .populate('user')
        .exec(cb)
    },
    count: function (cb) {
      blogs
        .find()
        .count()
        .exec(cb)
    }
  }, function (err, results) {
    if (err) return next(err)
    // You Can send back the count if you wish   results.count
    return res.status(200).send(results)
  })
}
exports.deleteBlog = function (req, res, next) {
  req.blog.remove(function (err) {
    if (err) return next(err)
    res.status(204).send()
  })
}
exports.postBlog = function (req, res, next) {
  // req.assert('name', 'The name cannot be blank').notEmpty()

  var errors = req.validationErrors()
  if (errors) {
    return res.status(400).send({
      success: false,
      msg: errors[0].msg,
      redirect: '/'
    })
  }
  req.body.user = req.user._id
  blogs.create(req.body, function (err, data) {
    if (err) return next(err)
    return res.status(201).send(data)
  })
}
exports.putBlog = function (req, res, next) {
  req.blog = _.merge(req.blog, req.body)
  req.blog.save(function (err) {
    if (err) return next(err)
    return res.status(200).send(req.blog)
  })
}

exports.getBlogById = function (req, res, next) {
  res.send(req.blog)
}
exports.paramBlog = function (req, res, next, id) {
  req.assert('blogId', 'Your Blog ID cannot be blank').notEmpty()
  req.assert('blogId', 'Your Blog ID has to be a real id').isMongoId()

  var errors = req.validationErrors()
  if (errors) {
    return res.status(400).send({
      success: false,
      msg: errors[0].msg,
      redirect: '/d'
    })
  }
  auto({
    blog: function (cb) {
      blogs
        .findOne({_id: id})
        .populate('user')
        .exec(cb)
    }
  }, function (err, results) {
    if (err) return next(err)
    req.blog = results.blog
    next()
  })
}
