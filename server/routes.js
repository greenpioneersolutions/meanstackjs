module.exports.buildRoutes = routes

var express = require('express')
var ejs = require('ejs')
var path = require('path')
var seo = require('./seo')
var debug = require('debug')('meanstackjs:routes')
var glob = require('glob')

function routes (self) {
  debug('started createBackendRoutes')
  // Dynamic Routes / Manually enabling them . You can change it back to automatic in the settings
  // var build = require('buildreq')()
  // var mongoose = require('mongoose')
  // build.routing(app, mongoose) - if reverting back to automatic

  // self.app.use(self.build.responseMiddleware({mongoose: mongoose}))
  // self.build.routing({
  //   mongoose: mongoose,
  //   remove: ['users'],
  //   middleware: {
  //     auth: [self.middleware.verify, self.middleware.isAuthenticated]
  //   }
  // }, function (error, data) {
  //   if (error)  self.logger.warn(error)
  //   _.forEach(data, function (m) {
  //     debug('Route Built by NPM buildreq:', m.route)
  //     self.app.use(m.route, m.app)
  //   })
  // })
  var files = glob.sync('server/modules/**/*.routes.js')
  files.forEach(function (router) {
    debug('Route : %s', router)
    require('../' + router)(self.app, self.middleware, self.mail, self.settings, self.models, self.logger)
  })
  self.app.use(express.static(path.join(self.dir, 'client/'), {
    maxAge: self.settings.cache.maxAge
  }))
  self.app.get('/api/seo/*', function (req, res) {
    seo(self, req, req.path.replace('/api/seo', ''), function (seoSettings) {
      res.send(seoSettings)
    })
  })
  self.app.get('/:url(api|images|scripts|styles|components|uploads|modules)/*', function (req, res) {
    res.status(400).send({
      error: 'nothing found at ' + req.path
    })
  })
  self.app.get('/*', function (req, res, next) {
    seo(self, req, function (seoSettings) {
      ejs.renderFile(path.join(__dirname, './layout/index.html'), {
        html: seoSettings,
        googleAnalytics: self.settings.googleAnalytics,
        name: self.settings.app.name,
        assets: self.app.locals.frontendFilesFinal,
        environment: self.environment,
        user: req.user ? req.user : {}
      }, {
        cache: true
      }, function (error, str) {
        if (error) next(error)
        res.send(str)
      })
    })
  })
  debug('end createBackendRoutes')
}
