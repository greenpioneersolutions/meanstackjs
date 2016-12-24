var auto = require('run-auto')
var mongoose = require('mongoose')
var <%= name %>s = mongoose.model('<%= name %>')
var _ = require('lodash')

exports.get<%= Name %> = function (req, res, next) {
  auto({
    <%= name %>s: function (cb) {
      <%= name %>s
        .find()
        .exec(cb)
    }
  }, function (err, results) {
    if (err) return next(err)
    return res.status(200).send(results.<%= name %>s)
  })
}
exports.delete<%= Name %> = function (req, res, next) {
  req.<%= name %>.remove(function () {
    res.status(204).send()
  })
}
exports.post<%= Name %> = function (req, res, next) {
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
  <%= name %>s.create(req.body, function (err, data) {
    if (err) return next(err)
    return res.status(201).send(data)
  })
}
exports.put<%= Name %> = function (req, res, next) {
  req.<%= name %> = _.merge(req.<%= name %>, req.body)
  req.<%= name %>.save(function (err) {
    console.log('err', err)
    if (err) return next(err)
    return res.status(200).send(req.<%= name %>)
  })
}

exports.get<%= Name %>ById = function (req, res, next) {
  res.send(req.<%= name %>)
}
exports.param<%= Name %> = function (req, res, next, id) {
  req.assert('<%= name %>Id', 'Your <%= Name %> ID cannot be blank').notEmpty()
  req.assert('<%= name %>Id', 'Your <%= Name %> ID has to be a real id').isMongoId()

  var errors = req.validationErrors()
  if (errors) {
    console.log(errors)
    return res.status(400).send({
      success: false,
      msg: errors[0].msg,
      redirect: '/'
    })
  }
  auto({
    <%= name %>: function (cb) {
      <%= name %>s
        .findOne({_id: id})
        .exec(cb)
    }
  }, function (err, results) {
    if (err) return next(err)
    req.<%= name %> = results.<%= name %>
    next()
  })
}
