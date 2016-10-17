var auto = require('run-auto')
var mongoose = require('mongoose')
var blogs = mongoose.model('blog')
var _ = require('lodash')
var debug = require('debug')('meanstackjs:blog')

exports.getBlog = function (req, res, next) {
  debug('start getBlog')
  auto({
    blogs: function (cb) {
      debug(req.queryParameters)
      blogs
        .find(req.queryParameters.filter || '')
        .where(req.queryParameters.where || '')
        .sort(req.queryParameters.sort || '')
        .select(req.queryParameters.select || '')
        .limit(req.queryParameters.limit || '')
        .skip(req.queryParameters.skip || '')
        .populate(req.queryParameters.populateId || 'user', req.queryParameters.populateItems || '')
        .exec(cb)
    },
    count: function (cb) {
      blogs
        .find(req.queryParameters.filter || '')
        .where(req.queryParameters.where || '')
        .count()
        .exec(cb)
    }
  }, function (err, results) {
    if (err) return next(err)
    debug('end getBlog')
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
  // EX. of how to use express validator
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
  debug('start getBlogById')
  res.send(req.blog)
  debug('end getBlogById')
}

exports.paramBlog = function (req, res, next, id) {
  debug('start paramBlog')

  req.assert('blogId', 'Your Blog ID cannot be blank').notEmpty()
  req.assert('blogId', 'Your Blog ID has to be a real id').isMongoId()

  var errors = req.validationErrors()
  if (errors) {
    return res.status(400).send({
      success: false,
      msg: errors[0].msg,
      redirect: '/'
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
    debug('end paramBlog')
    next()
  })
}
