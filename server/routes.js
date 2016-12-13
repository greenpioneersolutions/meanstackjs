module.exports = routes

var express = require('express')
var ejs = require('ejs')
var path = require('path')
var queryParameters = require('express-query-parameters')()
var seo = require('./seo')
function routes (self) {
  queryParameters.config({
    settings: {
      schema: ['_id', 'id', '__v', 'created', 'title', 'content', 'user', 'email', 'roles'], // the names people can search
      adapter: 'mongoose' // <object|string:supported adapter(MONGOOSE)>
    }
  })
  self.app.use(queryParameters.middleware())
  self.fileStructure = self.register(self)
  // {
  //   app: self.app,
  //   settings: self.settings,
  //   middleware: self.middleware,
  //   environment: self.environment
  // }
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
  function nothingFoundHandler (msg) {
    return function (req, res) {
      res.status(400).send({
        error: msg
      })
    }
  }
  self.app.get('/api/seo/*', function (req, res) {
    seo(self, req, req.path.replace('/api/seo', ''), function (seoSettings) {
      res.send(seoSettings)
    })
  })

  self.app.use(require('./prerenderer'))
  self.app.get('/api/*', nothingFoundHandler('nothing found in api'))
  self.app.get('/bower_components/*', nothingFoundHandler('nothing found in bower_components'))
  self.app.get('/images/*', nothingFoundHandler('nothing found in images'))
  self.app.get('/scripts/*', nothingFoundHandler('nothing found in scripts'))
  self.app.get('/styles/*', nothingFoundHandler('nothing found in styles'))
  self.app.get('/uploads/*', nothingFoundHandler('nothing found in uploads'))
  self.app.get('/*', function (req, res) {
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
      }, function (err, str) {
        if (err)console.log(err)
        res.send(str)
      })
    })
  })
}
