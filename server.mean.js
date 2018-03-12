module.exports = Mean
/**
 * Mean Stack Server File
 * @name Mean
 * @constructor
 * @param {Object} opts the options passed to create the server
 * @param {Function} done the callback function
 * MIT Licensed
*/

var debug = require('debug')('meanstackjs:server')
var forceSSL = require('express-force-ssl')
var fs = require('fs')
var http = require('http')
var https = require('https')
var run = require('./run.js')
var express = require('express')
var auto = require('run-auto')

function Mean (opts, done) {
  /**
   * self context to be used through out the application
   * @this
   */
  var self = this

  /**
   * stores the root directory at dir
   * @global
   */
  self.dir = __dirname
  /**
   * stores the options pass in to the server
   * @global
   */
  self.opts = opts
  /**
   * stores the run function incase you need to spin up any other servers
   * @global
   */
  self.run = run
  /**
   * creates the logging throught the entire app
   * @global
   */
  self.logger = require('./server/logger.js').logger
  /**
   * gets & store the current environment
   * @global
   */
  self.environment = require('./configs/environment.js').get()
  /**
   * gets & store the current settings based off of the environment
   * @global
   */
  self.settings = require('./configs/settings.js').get()
  /**
   * sets the port based on the options or settings
   * @global
   */
  self.port = self.opts.port || self.settings.https.active ? self.settings.https.port : self.settings.http.port
  self.app = express()
  // Connect to MongoDb & Register mongoose schemas
  /**
   * Connect to MongoDb & Register mongoose schemas
   * @function
   */
  require('./server/db.js').mongoDB(self)
  /**
   * sets up all middleware & placed after db connect to give middleware access
   * @global
   */
  self.middleware = require('./server/middleware.js')
  /**
   * sets up mailer after db connect to give it access
   * @global
   */
  self.mail = require('./server/mail.js')
  /**
   * setupRegister > Used to gather all modules to gether and to register them properly
   * @function
   */
  require('./server/register.js').registerSystemInfo(self)
  /**
   * setupExpressConfigs > Used to set up expressjs initially, middleware & passport.
   * @function
   */
  require('./server/config.js').configMiddleware(self)
  /**
   * setupAuthentication > Used to set up passport authentication & sessions
   * @function
   */
  require('./server/authentication.js').passport(self)
  /**
   * setupExpressSecurity > Used to set up helmet, hpp, cors & content length.
   * @function
   */
  require('./server/security.js').securityMiddleware(self)
  /**
   * setupExpressHeaders > Used to set up the headers that go out on every route.
   * @function
   */
  require('./server/headers.js').headersMiddleware(self)
  /**
   * setupExpressLogger > Used to set up our morgan logger & debug statements on all routes.
   * @function
   */
  require('./server/logger.js').loggerMiddleware(self)
  /**
   * setupTools > Used to set up every tool in the tools directory.
   * @function
   */
  require('./server/tools.js').setupTools(self)
  /**
   * setupStaticRoutes > Used to set up all system static routes including the main '/*' route with ejs templating.
   * @function
   */
  require('./server/routes.js').buildRoutes(self)
  /**
   * errorMiddleware > Used to set up our customer error handler in the server folder. NOTE: This goes after routes because we do not want it potentally default to express error handler
   * @function
   */
  require('./server/error.js').errorMiddleware(self)
  /**
   * maxCDN - *** OPTIONAL ***  > Used to purge the max cdn cache of the file. We Support MAXCDN
   * @function
   */
  require('./server/cdn.js').maxCDN(self)
  /**
   * auto  - connectMongoDb :  server > Used to finsh the final set up of the server. at the same time we start connecting to mongo and turning on the server.
   * @function
   */
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
      if (!self.settings.https.active) return cb()
      https.createServer({
        key: fs.readFileSync(self.settings.https.key),
        cert: fs.readFileSync(self.settings.https.cert)
      }, self.app).listen(self.settings.https.port, function () {
        self.logger.info('HTTPS Express server listening on port %d in %s mode', self.settings.https.port, self.environment)
        debug('HTTPS Express server listening on port %d in %s mode', self.settings.https.port, self.environment)
        cb()
      })
    },
    redirect: function (cb) {
      if (self.settings.http.active || !self.settings.https.redirect || !self.settings.https.active) return cb()
      var app = require('express')()
      app.set('forceSSLOptions', {
        httpsPort: self.settings.https.port
      })
      app.use('/*', forceSSL)
      http.createServer(app).listen(self.settings.http.port, function () {
        self.logger.info('HTTP FORCE SSL Express server listening on port %d in %s mode', self.settings.http.port, self.environment)
        debug('HTTP FORCE SSL Express server listening on port %d in %s mode', self.settings.http.port, self.environment)
        cb()
      })
    }
  }, done)
}

if (!module.parent) {
  run(Mean)
}
