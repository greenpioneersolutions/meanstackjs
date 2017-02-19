exports.getUsers = getUsers
exports.deleteUsers = deleteUsers
exports.postUsers = postUsers
exports.putUsers = putUsers
exports.getUsersById = getUsersById
exports.paramUsers = paramUsers
exports.getErrors = getErrors
exports.deleteErrors = deleteErrors
exports.postErrors = postErrors
exports.putErrors = putErrors
exports.getErrorsById = getErrorsById
exports.paramErrors = paramErrors

var auto = require('run-auto')
var mongoose = require('mongoose')
var Errors = mongoose.model('error')
var Users = mongoose.model('users')
var _ = require('lodash')
var debug = require('debug')('meanstackjs:admin')

// Users
function getUsers (req, res, next) {
  debug('start getUsers')
  Users
    .find(req.queryParameters.filter || '')
    .where(req.queryParameters.where || '')
    .sort(req.queryParameters.sort || '')
    .limit(req.queryParameters.limit || '')
    .skip(req.queryParameters.skip || '')
    .populate(req.queryParameters.populateId || 'user', req.queryParameters.populateItems || '')
    .select('-password -apikey')
    .exec(function (error, users) {
      if (error) return next(error)
      debug('end getUsers')
      return res.send(users)
    })
}

function deleteUsers (req, res, next) {
  req.adminUser.remove(function () {
    res.status(204).send()
  })
}

function postUsers (req, res, next) {
  // req.assert('name', 'The name cannot be blank').notEmpty()

  var errors = req.validationErrors()
  if (errors) {
    return res.status(400).send({
      success: false,
      message: errors[0].message,
      redirect: '/'
    })
  }
  Users.create(req.body, function (error, data) {
    if (error) return next(error)
    return res.status(201).send(data)
  })
}

function putUsers (req, res, next) {
  req.adminUser = _.merge(req.adminUser, req.body)
  req.adminUser.save(function (error) {
    if (error) return next(error)
    return res.status(200).send(req.adminUser)
  })
}

function getUsersById (req, res, next) {
  res.send(req.adminUser)
}

function paramUsers (req, res, next, id) {
  req.assert('userId', 'Your Users ID cannot be blank').notEmpty()
  req.assert('userId', 'Your Users ID has to be a real id').isMongoId()

  var errors = req.validationErrors()
  if (errors) {
    return res.status(400).send({
      success: false,
      message: errors[0].message,
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
  }, function (error, results) {
    if (error) return next(error)
    req.adminUser = results.adminUser
    next()
  })
}

// ERRORS
function getErrors (req, res, next) {
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
  }, function (error, results) {
    if (error) return next(error)
    return res.status(200).send(results.errors)
  })
}

function deleteErrors (req, res, next) {
  req.error.remove(function () {
    res.status(204).send()
  })
}

function postErrors (req, res, next) {
  // req.assert('name', 'The name cannot be blank').notEmpty()

  var errors = req.validationErrors()
  if (errors) {
    return res.status(400).send({
      success: false,
      message: errors[0].message,
      redirect: '/'
    })
  }
  Errors.create(req.body, function (error, data) {
    if (error) return next(error)
    return res.status(201).send(data)
  })
}

function putErrors (req, res, next) {
  req.error = _.merge(req.error, req.body)
  req.error.save(function (error) {
    if (error) return next(error)
    return res.status(200).send(req.error)
  })
}

function getErrorsById (req, res, next) {
  res.send(req.error)
}

function paramErrors (req, res, next, id) {
  req.assert('errorId', 'Your Errors ID cannot be blank').notEmpty()
  req.assert('errorId', 'Your Errors ID has to be a real id').isMongoId()

  var errors = req.validationErrors()
  if (errors) {
    return res.status(400).send({
      success: false,
      message: errors[0].message,
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
  }, function (error, results) {
    if (error) return next(error)
    req.error = results.error
    next()
  })
}
