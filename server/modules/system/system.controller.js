var request = require('request')
var _ = require('lodash')
var pug = require('pug')
var path = require('path')

exports.testing = function (mail, settings) {
  return function (req, res, next) {
    res.status(200).send({
      query: req.queryParameters
    })
  }
}
exports.pug = function (settings) {
  return function (req, res, next) {
    res.send(pug.renderFile(path.join(__dirname, 'setting.view.pug'), {settings: settings}))
  }
}
exports.proxy = function (req, res, next) {
  try {
    var url = _.replace(req.originalUrl, '/api/proxy/', '')
    var requestOptions = {
      url: url,
      qs: req.query,
      method: req.method,
      headers: {
        'content-type': 'application/json'
      }
    }
    if (req.method === 'POST' || req.method === 'PUT') {
      requestOptions.body = JSON.stringify(req.body)
    }
    req.pipe(request(requestOptions)).on('error', function (err) {
      next(err)
    }).pipe(res).on('error', function (err) {
      next(err)
    })
  } catch (err) {
    next(err)
  }
}
