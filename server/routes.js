module.exports = routes

var express = require('express')
var ejs = require('ejs')
var status = require('express-system-status')
var mongoose = require('mongoose')
var path = require('path')
var _ = require('lodash')
var queryParameters = require('express-query-parameters')()
function routes (self) {
  queryParameters.config({
    settings: {
      schema: ['_id', 'id', '__v', 'created', 'title', 'content', 'user', 'email', 'roles'], // the names people can search
      adapter: 'mongoose' // <object|string:supported adapter(MONGOOSE)>
    }
  })
  self.app.use(queryParameters.middleware())
  self.fileStructure = self.register({
    app: self.app,
    settings: self.settings,
    middleware: self.middleware,
    environment: self.environment
  })
  // Dynamic Routes / Manually enabling them . You can change it back to automatic in the settings
  // build.routing(app, mongoose) - if reverting back to automatic

  // self.app.use(self.build.responseMiddleware({mongoose: mongoose}))
  // self.build.routing({
  //   mongoose: mongoose,
  //   remove: ['users'],
  //   middleware: {
  //     auth: [self.middleware.verify, self.middleware.isAuthenticated]
  //   }
  // }, function (error, data) {
  //   if (error) console.log(error)
  //   _.forEach(data, function (m) {
  //     debug('Route Built by NPM buildreq:', m.route)
  //     self.app.use(m.route, m.app)
  //   })
  // })
  self.app.use(express.static(path.join(self.dir, 'client/'), {
    maxAge: 31557600000
  }))
  if (self.environment === 'development') {
    self.app.use('/api/status',
      status({
        app: self.app,
        config: self.settings,
        auth: true,
        user: 'admin',
        pass: 'pass',
        extra: {
          environment: self.environment
        },
        mongoose: mongoose
      })
    )
  }
  function nothingFoundHandler (msg) {
    return function (req, res) {
      res.status(400).send({
        error: msg
      })
    }
  }

  self.app.get('/api/*', nothingFoundHandler('nothing found in api'))
  self.app.get('/bower_components/*', nothingFoundHandler('nothing found in bower_components'))
  self.app.get('/images/*', nothingFoundHandler('nothing found in images'))
  self.app.get('/scripts/*', nothingFoundHandler('nothing found in scripts'))
  self.app.get('/styles/*', nothingFoundHandler('nothing found in styles'))
  self.app.get('/uploads/*', nothingFoundHandler('nothing found in uploads'))
  self.app.get('/*', function (req, res) {
    if (_.isUndefined(req.user)) {
      req.user = {}
      req.user.authenticated = false
    } else {
      req.user.authenticated = true
    }
    var html = self.settings.html
    var seoSettings = self.settings.seo[req.path]

    if (seoSettings) {
      if (seoSettings.title)html.title = seoSettings.title
      if (seoSettings.description)html.description = seoSettings.description
      if (seoSettings.keywords)html.keywords = seoSettings.keywords
    }

    ejs.renderFile(path.join(__dirname, './layout/index.html'), {
      html: html,
      assets: self.app.locals.frontendFilesFinal,
      environment: self.environment
    }, {
      cache: true
    }, function (err, str) {
      if (err)console.log(err)
      res.send(str)
    })
  })
}
