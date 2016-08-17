var auto = require('run-auto')
var mongoose = require('mongoose')
var __name__s = mongoose.model('__name__')
var _ = require('lodash')

exports.get__Name__ = function (req, res, next) {
  auto({
    __name__s: function (cb) {
      __name__s
        .find()
        .exec(cb)
    }
  }, function (err, results) {
    if (err) return next(err)
    return res.status(200).send(results.__name__s)
  })
}
exports.delete__Name__ = function (req, res, next) {
  req.__name__.remove(function () {
    res.status(204).send()
  })
}
exports.post__Name__ = function (req, res, next) {
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
  __name__s.create(req.body, function (err, data) {
    if (err) return next(err)
    return res.status(201).send(data)
  })
}
exports.put__Name__ = function (req, res, next) {
  req.__name__ = _.merge(req.__name__, req.body)
  req.__name__.save(function (err) {
    console.log('err', err)
    if (err) return next(err)
    return res.status(200).send(req.__name__)
  })
}

exports.get__Name__ById = function (req, res, next) {
  res.send(req.__name__)
}
exports.param__Name__ = function (req, res, next, id) {
  req.assert('__name__Id', 'Your __Name__ ID cannot be blank').notEmpty()
  req.assert('__name__Id', 'Your __Name__ ID has to be a real id').isMongoId()

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
    __name__: function (cb) {
      __name__s
        .findOne({_id: id})
        .exec(cb)
    }
  }, function (err, results) {
    if (err) return next(err)
    req.__name__ = results.__name__
    next()
  })
}
