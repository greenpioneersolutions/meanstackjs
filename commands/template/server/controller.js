exports.get<%= Name %> = get<%= Name %>
exports.delete<%= Name %> = delete<%= Name %>
exports.post<%= Name %> = post<%= Name %>
exports.put<%= Name %> = put<%= Name %>
exports.get<%= Name %>ById = get<%= Name %>ById
exports.param<%= Name %> = param<%= Name %>
exports.on<%= Name %> = on<%= Name %>

var auto = require('run-auto')
var mongoose = require('mongoose')
var <%= name %>s = mongoose.model('<%= name %>')
var _ = require('lodash')
//var logger = require('./../../logger.js').logger

function get<%= Name %> (req, res, next) {
  auto({
    <%= name %>s: function (cb) {
      <%= name %>s
        .find()
        .exec(cb)
    }
  }, function (error, results) {
    if (error) return next(error)
    return res.status(200).send(results.<%= name %>s)
  })
}

function delete<%= Name %> (req, res, next) {
  req.<%= name %>.remove(function () {
    res.status(204).send()
  })
}

function post<%= Name %> (req, res, next) {
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
  <%= name %>s.create(req.body, function (error, data) {
    if (error) return next(error)
    return res.status(201).send(data)
  })
}

function put<%= Name %> (req, res, next) {
  req.<%= name %> = _.assign(req.<%= name %>, req.body)
  req.<%= name %>.save(function (error) {
    if (error) return next(error)
    return res.status(200).send(req.<%= name %>)
  })
}


function get<%= Name %>ById (req, res, next) {
  res.send(req.<%= name %>)
}

function param<%= Name %> (req, res, next, id) {
  req.assert('<%= name %>Id', 'Your <%= Name %> ID cannot be blank').notEmpty()
  req.assert('<%= name %>Id', 'Your <%= Name %> ID has to be a real id').isMongoId()

  var errors = req.validationErrors()
  if (errors) {
    return res.status(400).send({
      success: false,
      message: errors[0].message,
      redirect: '/'
    })
  }
  auto({
    <%= name %>: function (cb) {
      <%= name %>s
        .findOne({_id: id})
        .exec(cb)
    }
  }, function (error, results) {
    if (error) return next(error)
    req.<%= name %> = results.<%= name %>
    next()
  })
}

function on<%= Name %> (io, socket) {
  return function (msg) {
    io.emit('<%= name %>', msg)
  }
}