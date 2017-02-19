exports.getBlog = getBlog
exports.deleteBlog = deleteBlog
exports.postBlog = postBlog
exports.putBlog = putBlog
exports.getBlogById = getBlogById
exports.paramBlog = paramBlog

var auto = require('run-auto')
var mongoose = require('mongoose')
var blogs = mongoose.model('blog')
var _ = require('lodash')
var debug = require('debug')('meanstackjs:blog')

function getBlog (req, res, next) {
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
  }, function (error, results) {
    if (error) return next(error)
    debug('end getBlog')
    return res.status(200).send(results)
  })
}

function deleteBlog (req, res, next) {
  req.blog.remove(function (error) {
    if (error) return next(error)
    res.status(204).send()
  })
}

function postBlog (req, res, next) {
  // EX. of how to use express validator
  // req.assert('name', 'The name cannot be blank').notEmpty()
  var errors = req.validationErrors()

  if (errors) {
    return res.status(400).send({
      success: false,
      message: errors[0].message,
      redirect: '/'
    })
  }

  req.body.user = req.user._id
  blogs.create(req.body, function (error, data) {
    if (error) return next(error)
    return res.status(201).send(data)
  })
}

function putBlog (req, res, next) {
  req.blog = _.merge(req.blog, req.body)
  req.blog.save(function (error) {
    if (error) return next(error)
    return res.status(200).send(req.blog)
  })
}

function getBlogById (req, res, next) {
  debug('start getBlogById')
  res.send(req.blog)
  debug('end getBlogById')
}

function paramBlog (req, res, next, id) {
  debug('start paramBlog')

  req.assert('blogId', 'Your Blog ID cannot be blank').notEmpty()
  req.assert('blogId', 'Your Blog ID has to be a real id').isMongoId()

  var errors = req.validationErrors()
  if (errors) {
    return res.status(400).send({
      success: false,
      message: errors[0].message,
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
  }, function (error, results) {
    if (error) return next(error)
    req.blog = results.blog
    debug('end paramBlog')
    next()
  })
}
