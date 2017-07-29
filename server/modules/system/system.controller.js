exports.testing = testing
exports.pug = pug
exports.status = status
exports.proxy = proxy

var request = require('request')
var _ = require('lodash')
var path = require('path')

function testing (mail, settings) {
  return function (req, res, next) {
    res.status(200).send({
      query: req.queryParameters
    })
  }
}

function pug (settings) {
  return function (req, res, next) {
    res.send(require('pug').renderFile(path.join(__dirname, 'setting.view.pug'), {settings: settings}))
  }
}

function status (req, res, next) {
  res.status(200).send()
}

function proxy (req, res, next) {
  try {
    var url = _.replace(req.originalUrl, '/api/proxy/', '')
    var requestOptions = {
      url: url,
      qs: req.query,
      method: req.method,
      headers: _.assign({
        'content-type': 'application/json'
      }, req.headers),
      rejectUnauthorized: false,
      json: true
    }
    if (req.query.proxy) {
      requestOptions.proxy = req.query.proxy
      delete req.query.proxy
      requestOptions.qs = req.query
    }
    if (req.method === 'POST' || req.method === 'PUT') {
      requestOptions.body = JSON.stringify(req.body)
    }
    req.pipe(request(requestOptions)).on('error', function (error) {
      next(error)
    }).pipe(res).on('error', function (error) {
      next(error)
    })
  } catch (error) {
    next(error)
  }
}
