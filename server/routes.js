module.exports = { routes }

const express = require('express')
const path = require('path')

function routes (self) {
  for (let i = 0; i < self.files.routes.length; i++) {
    require(self.files.routes[i])(self.app, self.middleware, self.mail, self.settings, self.models, self.logger)
  }
  self.app.get('/:url(api|modules)/*', function (req, res) {
    res.status(404).send({
      error: 'nothing found at ' + req.path
    })
  })
  self.app.use(express.static(path.resolve('./dist/client')))
  self.app.get('/*', function (req, res, next) {
    res.sendFile(path.resolve('./dist/client/index.html'))
  })
}

// var seo = require('./seo')
// self.app.get('/api/seo/*', function (req, res) {
//   seo(self, req, req.path.replace('/api/seo', ''), function (seoSettings) {
//     res.send(seoSettings)
//   })
// })
// seo(self, req, function (seoSettings) {
//   ejs.renderFile(path.join(__dirname, './layout/index.html'), {
//     html: seoSettings,
//     googleAnalytics: self.settings.googleAnalytics,
//     name: self.settings.app.name,
//     assets: self.app.locals.frontendFilesFinal,
//     environment: self.environment,
//     user: req.user ? req.user : {}
//   }, {
//     cache: true
//   }, function (error, str) {
//     if (error) next(error)
//     res.send(str)
//   })
// })
