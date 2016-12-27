var auto = require('run-auto')
var mongoose = require('mongoose')
var Errors = mongoose.model('error')
var Users = mongoose.model('users')
var _ = require('lodash')
var debug = require('debug')('meanstackjs:admin')
// Users
exports.getUsers = function (req, res, next) {
  debug('start getUsers')
  Users
    .find(req.queryParameters.filter || '')
    .where(req.queryParameters.where || '')
    .sort(req.queryParameters.sort || '')
    .limit(req.queryParameters.limit || '')
    .skip(req.queryParameters.skip || '')
    .populate(req.queryParameters.populateId || 'user', req.queryParameters.populateItems || '')
    .select('-password')
    .exec(function (err, users) {
      if (err) return next(err)
      debug('end getUsers')
      return res.send(users)
    })
}
exports.deleteUsers = function (req, res, next) {
  req.adminUser.remove(function () {
    res.status(204).send()
  })
}
exports.postUsers = function (req, res, next) {
  // req.assert('name', 'The name cannot be blank').notEmpty()

  var errors = req.validationErrors()
  if (errors) {
    return res.status(400).send({
      success: false,
      msg: errors[0].msg,
      redirect: '/'
    })
  }
  Users.create(req.body, function (err, data) {
    if (err) return next(err)
    return res.status(201).send(data)
  })
}
exports.putUsers = function (req, res, next) {
  req.adminUser = _.merge(req.adminUser, req.body)
  req.adminUser.save(function (err) {
    console.log('err', err)
    if (err) return next(err)
    return res.status(200).send(req.adminUser)
  })
}

exports.getUsersById = function (req, res, next) {
  res.send(req.adminUser)
}
exports.paramUsers = function (req, res, next, id) {
  req.assert('userId', 'Your Users ID cannot be blank').notEmpty()
  req.assert('userId', 'Your Users ID has to be a real id').isMongoId()

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
    adminUser: function (cb) {
      Users
        .findOne({_id: id})
        .populate('user')
        .select('-password')
        .exec(cb)
    }
  }, function (err, results) {
    if (err) return next(err)
    req.adminUser = results.adminUser
    next()
  })
}

// ERRORS
exports.getErrors = function (req, res, next) {
  auto({
    errors: function (cb) {
      Errors
        .find()
        .find(req.queryParameters.filter || '')
        .where(req.queryParameters.where || '')
        .sort(req.queryParameters.sort || '')
        .limit(req.queryParameters.limit || '')
        .skip(req.queryParameters.skip || '')
        .populate(req.queryParameters.populateId || 'user', req.queryParameters.populateItems || '')
        .select('-password')
        .exec(cb)
    }
  }, function (err, results) {
    if (err) return next(err)
    return res.status(200).send(results.errors)
  })
}
exports.deleteErrors = function (req, res, next) {
  req.error.remove(function () {
    res.status(204).send()
  })
}
exports.postErrors = function (req, res, next) {
  // req.assert('name', 'The name cannot be blank').notEmpty()

  var errors = req.validationErrors()
  if (errors) {
    return res.status(400).send({
      success: false,
      msg: errors[0].msg,
      redirect: '/'
    })
  }
  Errors.create(req.body, function (err, data) {
    if (err) return next(err)
    return res.status(201).send(data)
  })
}
exports.putErrors = function (req, res, next) {
  req.error = _.merge(req.error, req.body)
  req.error.save(function (err) {
    console.log('err', err)
    if (err) return next(err)
    return res.status(200).send(req.error)
  })
}

exports.getErrorsById = function (req, res, next) {
  res.send(req.error)
}
exports.paramErrors = function (req, res, next, id) {
  req.assert('errorId', 'Your Errors ID cannot be blank').notEmpty()
  req.assert('errorId', 'Your Errors ID has to be a real id').isMongoId()

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
    error: function (cb) {
      Errors
        .findOne({_id: id})
        .populate('user')
        .select('-password')
        .exec(cb)
    }
  }, function (err, results) {
    if (err) return next(err)
    req.error = results.error
    next()
  })
}
