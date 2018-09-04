module.exports = Mean

const http = require('http')
const https = require('https')
const express = require('express')
const fs = require('fs')
const path = require('path')
const spdy = require('spdy')
const auto = require('run-auto')
const run = require('../run.js')

function Mean (options, done) {
  if (!done) {
    done = function () {
      return self
    }
  }
  const self = this
  self.settings = require('../configs/settings.js').init(options)
  self.done = done
  self.logger = require('./logger.js').logger
  self.app = express()
  self.run = run
  require('./register.js').register(self)
  require('./config.js').config(self)
  require('./db.js').init(self)
  self.middleware = require('./middleware.js')
  self.mail = require('./mail.js')
  require('./authentication.js').authentication(self)
  require('./security.js').security(self)
  require('./header.js').header(self)
  require('./tool.js').tool(self)
  require('./routes.js').routes(self)
  require('./error.js').middleware(self)
  require('./cdn.js').cdn(self)
  auto({
    http: function (cb) {
      if (!self.settings.http.active && (self.settings.https.active === false) !== (self.settings.http.active === false)) return cb()
      http.createServer(self.app).listen(self.settings.http.port, function () {
        self.logger.info(`HTTP Express server listening on port ${self.settings.http.port} in ${self.settings.environment} mode`)
        cb()
      })
    },
    https: function (cb) {
      if (!self.settings.https.active) return cb()
      if (self.settings.https.http2) {
        spdy.createServer({
          key: fs.readFileSync(path.join(__dirname, './../../../config/certificates/keyExample.pem')),
          cert: fs.readFileSync(path.join(__dirname, './../../../config/certificates/certExample.pem')),
          spdy: {
            protocols: ['h2']
          }
        }, self.app).listen(self.settings.port.http2, function () {
          self.logger.info(`HTTPS Express server listening on port ${self.settings.https.port} in ${self.settings.environment} mode`)
          cb()
        })
      } else {
        https.createServer({
          key: fs.readFileSync(self.settings.https.key),
          cert: fs.readFileSync(self.settings.https.cert)
        }, self.app).listen(self.settings.https.port, function () {
          self.logger.info(`HTTPS Express server listening on port ${self.settings.https.port} in ${self.settings.environment} mode`)
          cb()
        })
      }
    },
    redirect: function (cb) {
      if (self.settings.http.active || !self.settings.https.redirect || !self.settings.https.active) return cb()
      var app = require('express')()
      app.use('/*', function (req, res, next) {
        res.redirect(301, `https://${req.hostname}${(self.settings.https.port === 443 ? '' : (':' + self.settings.https.port))}${req.originalUrl}`)
      })
      http.createServer(app).listen(self.settings.http.port, function () {
        self.logger.info(`HTTP FORCE SSL Express server listening on port ${self.settings.http.port} in ${self.settings.environment} mode`)
        cb()
      })
    }
  }, done)
}

if (!module.parent) {
  run(Mean)
}
