module.exports = Mean

var debug = require('debug')('meanstackjs:server')
var forceSSL = require('express-force-ssl')
var fs = require('fs')
var http = require('http')
var https = require('https')
var run = require('./run.js')
var express = require('express')
var auto = require('run-auto')

function Mean (opts, done) {
  var self = this
  // setupVariables > used throughout the entire system that dont require db access
  self.dir = __dirname
  self.opts = opts
  self.run = run
  self.logger = require('./server/logger.js').logger
  self.environment = require('./configs/environment.js').get()
  self.settings = require('./configs/settings.js').get()
  self.port = self.opts.port || self.settings.https.active ? self.settings.https.port : self.settings.http.port
  self.app = express()
  // Connect to MongoDb & Register mongoose schemas
  require('./server/db.js').mongoDB(self)
  // setupVariables > that require access to the db
  self.middleware = require('./server/middleware.js')
  self.mail = require('./server/mail.js')
  // setupRegister > Used to gather all modules to gether and to register them properly
  require('./server/register.js').info(self)
  // setupExpressConfigs > Used to set up expressjs initially, middleware & passport.
  require('./server/config.js').middleware(self)
  // setupAuthentication > Used to set up passport authentication & sessions
  require('./server/authentication.js').passport(self)
  // setupExpressSecurity > Used to set up helmet, hpp, cors & content length.
  require('./server/security.js').middleware(self)
  // setupExpressHeaders > Used to set up the headers that go out on every route.
  require('./server/headers.js').middleware(self)
  // setupExpressLogger > Used to set up our morgan logger & debug statements on all routes.
  require('./server/logger.js').middleware(self)
  // setupTools > Used to set up every tool in the tools directory.
  require('./server/tools.js').setup(self)
  // setupStaticRoutes > Used to set up all system static routes including the main '/*' route with ejs templating.
  require('./server/routes.js').build(self)
  // setupExpressErrorHandler > Used to set up our customer error handler in the server folder. NOTE: This goes after routes because we do not want it potentally default to express error handler
  require('./server/error.js').middleware(self)
  // purgeMaxCdn - *** OPTIONAL ***  > Used to purge the max cdn cache of the file. We Support MAXCDN
  require('./server/cdn.js').maxCDN(self)
  // auto  - connectMongoDb :  server > Used to finsh the final set up of the server. at the same time we start connecting to mongo and turning on the server.
  auto({
    http: function (cb) {
      if (!self.settings.http.active && (self.settings.https.active === false) !== (self.settings.http.active === false)) return cb()
      http.createServer(self.app).listen(self.settings.http.port, function () {
        self.logger.info('HTTP Express server listening on port %d in %s mode', self.settings.http.port, self.environment)
        debug('HTTP Express server listening on port %d in %s mode', self.settings.http.port, self.environment)
        cb()
      })
    },
    https: function (cb) {
      if(!self.settings.https.active) return cb()
      https.createServer({
        key: fs.readFileSync(self.settings.https.key),
        cert: fs.readFileSync(self.settings.https.cert)
      }, self.app).listen(self.settings.https.port, function () {
        self.logger.info('HTTPS Express server listening on port %d in %s mode', self.settings.https.port, self.environment)
        debug('HTTPS Express server listening on port %d in %s mode', self.settings.https.port, self.environment)
        cb()
      })
    },
    redirect:function (cb) {
      if (self.settings.http.active || !self.settings.https.redirect || !self.settings.https.active ) return cb()
      var app = require('express')()
      app.set('forceSSLOptions', {
        httpsPort: self.settings.https.port
      })
      app.use('/*', forceSSL)
      http.createServer(app).listen(self.settings.http.port, function () {
        self.logger.info('HTTP FORCE SSL Express server listening on port %d in %s mode', self.settings.http.port, self.environment)
        debug('HTTP FORCE SSL Express server listening on port %d in %s mode', self.settings.http.port, self.environment)
        done()
      })
    }
  }, function(err, results) {
    return done()
  })
}

if (!module.parent) {
  run(Mean)
}
