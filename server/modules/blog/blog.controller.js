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
    }
  }, function (err, results) {
    if (err) return next(err)
    return res.status(200).send(results.blogs)
  })
}
exports.deleteBlog = function (req, res, next) {
  req.blog.remove(function () {
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
    console.log('err', err)
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
    console.log(errors)
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

// THIS IS WHAT WAS BUILT BY BUILDREQ
// https://github.com/GreenPioneer/buildreq
// WE HAVE IT COMMENTED BECAUSE WE USE THE DYNAMIC BUILDER
//

// var mongoose = require('mongoose')
// var Blog = mongoose.model('Blog')
// var build = require('buildreq')
// var _ = require('lodash')
// var bodyParser = require('body-parser')
// var methodOverride = require('method-override')
// var helmet = require('helmet')
// var compression = require('compression')

// var system = require('./system.controller.js')
// var express = require('express')
// var app = express() // the sub app
// // body parsing middleware.
// app.use(bodyParser.json())
// // Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
// app.use(methodOverride())
// // well-known web vulnerabilities
// app.use(helmet())
// // Gzip compressing
// app.use(compression())
// // ERROR middleware - still need to develop
// app.use(build.error())
// // GET all
// // NEED TO UPDATE THE POPULATE
// app.get('/', function (req, res, next) {
//   Blog
//     .find(req.queryParameters.filter)
//     .where(req.queryParameters.where)
//     .sort(req.queryParameters.sort)
//     .select(req.queryParameters.select)
//     .limit(req.queryParameters.limit)
//     .skip(req.queryParameters.skip)
//     .populate(req.queryParameters.populateId)
//     .exec()
//     .then(function (thenData) {
//       Blog.count(req.queryParameters.filter, function (err, totalCount) {
//         if (err) {
//           return res.status(500).json({
//             error: err.message
//           })
//         }
//         build.response(res, {
//           count: totalCount,
//           method: 'json',
//           query: req.queryParameters,
//           hostname: req.get('host') + req.path,
//           route: req.route,
//           data: thenData,
//           type: 'blog'
//         })
//       })
//     }).catch(
//     function (err) {
//       return next(err)
//     })
// })
// // CREATE new
// app.post('/', function (req, res, next) {
//   Blog
//     .create(req.body)
//     .then(function (thenData) {
//       build.response(res, {
//         method: 'json',
//         query: req.queryParameters,
//         hostname: req.get('host') + req.path,
//         route: req.route,
//         data: thenData,
//         type: 'blog'
//       })
//     })
//     .catch(function (err) {
//       return next(err)
//     })
// })

// // UPDATE by ID
// app.put('/:blogId', function (req, res, next) {
//   var data = req.blog
//   data = _.merge(data, req.body)
//   data.save().then(function (thenData) {
//     build.response(res, {
//       method: 'json',
//       query: req.queryParameters,
//       hostname: req.get('host') + req.path,
//       route: req.route,
//       data: thenData,
//       type: 'blog'
//     })
//   }).catch(function (err) {
//     return next(err)
//   })
// })

// // DELETE by ID
// app.delete('/:blogId', function (req, res, next) {
//   var data = req.blog
//   data.remove().then(function (thenData) {
//     build.response(res, {
//       method: 'json',
//       query: req.queryParameters,
//       hostname: req.get('host') + req.path,
//       route: req.route,
//       data: thenData,
//       type: 'blog'
//     })
//   }).catch(function (err) {
//     return next(err)
//   })
// })

// // SHOW by ID
// app.get('/:blogId', function (req, res) {
//   build.response(res, {
//     method: 'json',
//     query: req.queryParameters,
//     hostname: req.get('host') + req.path,
//     route: req.route,
//     data: req.blog,
//     type: 'blog'
//   })
// })
// // PARAM of the ID
// app.param('/:blogId', function (req, res, next, id) {
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(500).send('Parameter passed is not a valid Mongo ObjectId')
//   } else {
//     try {
//       Blog
//         .findOne({
//           _id: id
//         })
//         .populate(req.queryParameters.populateId)
//         .exec()
//         .then(function (thenData) {
//           if (!thenData) return next(new Error('Failed to load data ' + id))
//           req.blog = thenData
//           next()
//         })
//         .catch(function (err) {
//           if (err) return next(err)
//         })
//     } catch (err) {
//       console.log(err)
//       req.blog = {}
//       next()
//     }
//   }
// })
// // use aggregation framework
// app.get('/task/aggregate/', function (req, res, next) {
//   if (req.queryParameters.aggregate) {
//     Blog.aggregate(req.queryParameters.aggregate).then(function (results) {
//       build.response(res, {
//         count: results.length,
//         method: 'json',
//         query: req.queryParameters,
//         hostname: req.get('host') + req.path,
//         route: req.route,
//         data: results,
//         type: 'blog'
//       })
//     }).catch(function (err) {
//       console.log('err was here', err)
//       return next(err)
//     })
//   } else {
//     build.response(res, {
//       method: 'json',
//       query: req.queryParameters,
//       hostname: req.get('host') + req.path,
//       route: req.route,
//       data: {error: 'no data object for aggregate'},
//       type: 'blog'
//     })
//   }
// })
// // show count
// app.get('/task/count/', function (req, res, next) {
//   Blog.count(req.queryParameters.filter).then(function (totalCount) {
//     build.response(res, {
//       count: totalCount,
//       method: 'json',
//       query: req.queryParameters,
//       hostname: req.get('host') + req.path,
//       route: req.route,
//       data: {count: totalCount},
//       type: 'blog'
//     })
//   }).catch(function (err) {
//     return next(err)
//   })
// })

// // show fields
// app.get('/task/fields/', function (req, res) {
//   var fields = _.remove(_.keys(Blog.schema.tree), function (f) {
//     if ('_id' === f)return false
//     else if ('id' === f)return false
//     else if ('__v' === f)return false
//     else return true
//   })
//   var treePath = Blog.schema.paths
//   var tree = {}
//   _.forEach(treePath, function (t, k) {
//     if (k !== 'id' && k !== '__v' && k !== '_id') {
//       tree[k] = {
//         instance: t.instance,
//         isRequired: t.isRequired || false
//       }
//     }
//   })
//   build.response(res, {
//     method: 'json',
//     query: req.queryParameters,
//     hostname: req.get('host') + req.path,
//     route: req.route,
//     data: {
//       fields: fields,
//       tree: tree
//     },
//     type: 'blog'
//   })
// })
// // options
// app.get('/task/options/', function (req, res) {
//   build.response(res, {
//     method: 'json',
//     query: req.queryParameters,
//     hostname: req.get('host') + req.path,
//     route: req.route,
//     data: _.keys(Blog.schema.options),
//     type: 'blog'
//   })
// })
// // _indexes
// app.get('/task/_indexes/', function (req, res) {
//   build.response(res, {
//     method: 'json',
//     query: req.queryParameters,
//     hostname: req.get('host') + req.path,
//     route: req.route,
//     data: _.keys(Blog.schema._indexes),
//     type: 'blog'
//   })
// })

// module.exports = app
