var auth = require('./server/passport.js')
var auto = require('run-auto')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var cors = require('cors')
var compress = require('compression')
var debug = require('debug')('meanstackjs:server')
var ejs = require('ejs')
var contentLength = require('express-content-length-validator')
var express = require('express')
var expressValidator = require('express-validator')
var flash = require('express-flash')
var fs = require('fs')
var glob = require('glob')
var helmet = require('helmet')
var hpp = require('hpp')
var https = require('https')
var logger = require('morgan')
var MaxCDN = require('maxcdn')
var methodOverride = require('method-override')
var mongoose = require('mongoose')
var path = require('path')
var passport = require('passport')
var Promise = require('bluebird')
var session = require('express-session')
var status = require('express-system-status')
var throttler = require('mongo-throttle')
var queryParameters = require('express-query-parameters')()
var _ = require('lodash')
var MongoStore = require('connect-mongo')(session)

function Mean (opts, done) {
  var self = this
  self.opts = opts
  self.run = require('./run.js')
  self.environment = require('./configs/environment.js').get()
  self.settings = require('./configs/settings.js').get()
  self.port = self.opts.port || self.settings.http.port
  self.middleware = require('./server/middleware.js')
  self.mail = require('./server/mail.js')
  self.dir = __dirname
  self.register = require('./server/register.js')

  // Start of the build process
  // setupExpressConfigs > Used to set up expressjs initially, middleware & passport.
  self.setupExpressConfigs()
  // setupExpressErrorHandler > Used to set up our customer error handler in the server folder.
  self.setupExpressErrorHandler()
  // setupExpressSecurity > Used to set up helmet, hpp, cors & content length.
  self.setupExpressSecurity()
  // setupExpressHeaders > Used to set up the headers that go out on every route.
  self.setupExpressHeaders()
  // setupExpressLogger > Used to set up our morgan logger & debug statements on all routes.
  self.setupExpressLogger()
  // setupServerRoutesModels > Used to set up the register function to dynamically build all of the models, routes & frontend files.
  self.setupServerRoutesModels()
  // setupTools > Used to set up every tool in the tools directory.
  self.setupTools()
  // setupStaticRoutes > Used to set up all system static routes including the main '/*' route with ejs templating.
  self.setupStaticRoutes()
  // purgeMaxCdn - *** OPTIONAL ***  > Used to purge the max cdn cache of the file. We Support MAXCDN
  self.purgeMaxCdn()

  // auto  - connectMongoDb :  server > Used to finsh the final set up of the server. at the same time we start connecting to mongo and turning on the server.
  auto({
    connectMongoDb: function (callback) {
      mongoose.Promise = Promise
      mongoose.set('debug', self.settings.mongodb.debug)
      mongoose.connect(self.settings.mongodb.uri, self.settings.mongodb.options)

      mongoose.connection.on('error', function (err) {
        console.log('MongoDB Connection Error. Please make sure that MongoDB is running.')
        debug('MongoDB Connection Error ')
        callback(err, null)
      })

      mongoose.connection.on('open', function () {
        debug('MongoDB Connection Open ')
        callback(null, {
          db: self.settings.mongodb.uri,
          dbOptions: self.settings.mongodb.options
        })
      })
    },
    server: function (callback) {
      if (self.settings.https.active) {
        https.createServer({
          key: fs.readFileSync(self.settings.https.key),
          cert: fs.readFileSync(self.settings.https.cert)
        }, self.app).listen(self.settings.https.port, function () {
          console.log('HTTPS Express server listening on port %d in %s mode', self.settings.https.port, self.app.get('env'))
          debug('HTTPS Express server listening on port %d in %s mode', self.settings.https.port, self.app.get('env'))
          if (!self.settings.http.active) {
            callback(null, {
              port: self.app.get('port'),
              env: self.app.get('env')
            })
          }
        })
      }

      // check if you set both to false we default to turn on http
      if (self.settings.http.active || (self.settings.https.active === false) === (self.settings.http.active === false)) {
        self.app.listen(self.app.get('port'), function () {
          console.log('HTTP Express server listening on port %d in %s mode', self.app.get('port'), self.app.get('env'))
          debug('HTTP Express server listening on port %d in %s mode', self.app.get('port'), self.app.get('env'))
          callback(null, {
            port: self.app.get('port'),
            env: self.app.get('env')
          })
        })
      }
    }
  },
    function (err, results) {
      if (err) {
        console.log('Exiting because of error %d', err)
        debug('Exiting because of error %d', err)
        process.exit(1)
      }
      debug('Finished Server Load')
      done(null)
    })
}

Mean.prototype.setupExpressConfigs = function () {
  debug('started setupExpressConfigs')
  var self = this

  self.app = express()
  self.app.enable('trust proxy')
  self.app.disable('x-powered-by')
  self.app.set('view engine', 'html')
  self.app.set('views', path.join(self.dir, '/client'))
  self.app.set('port', self.port)
  self.app.use(compress())
  self.app.use(bodyParser.json(self.settings.bodyparser.json))
  self.app.use(bodyParser.urlencoded(self.settings.bodyparser.urlencoded))
  self.app.use(expressValidator(self.settings.expresValidator))
  self.app.use(methodOverride())
  self.app.use(cookieParser())
  self.app.use(session({
    name: self.settings.sessionName,
    resave: true,
    saveUninitialized: true,
    secret: self.settings.sessionSecret,
    store: new MongoStore({
      url: self.settings.mongodb.uri,
      autoReconnect: true
    })
  }))
  self.app.use(passport.initialize())
  self.app.use(passport.session())
  passport.serializeUser(auth.serializeUser)
  passport.deserializeUser(auth.deserializeUser)
  passport.use(auth.passportStrategy)
  self.app.use(flash())
  debug('end setupExpressConfigs')
}

Mean.prototype.setupExpressErrorHandler = function () {
  debug('started setupExpressErrorHandler')
  var self = this
  require('./server/error.js')(self)
  debug('end setupExpressErrorHandler')
}

Mean.prototype.setupExpressSecurity = function () {
  debug('started setupExpressSecurity')
  var self = this
  // Mongo-Throttle
  // Limit/Throttle the requests to your system
  // You have multiple options with package \/
  // only rate-limit requests that begin with /api/ , configure limits: & configure a custom limit handler
  self.app.use(throttler(self.settings.throttle))

  // 7 security middleware
  self.app.use(helmet(self.settings.bodyparser.helmet))

  // 3 security middleware
  // self.app.use(helmet.contentSecurityPolicy())
  // self.app.use(helmet.hpkp())
  // self.app.use(helmet.noCache())
  // HTTP Parameter Pollution attacks
  self.app.use(hpp())

  // CORS
  // var whitelist = ['http://example1.com', 'http://example2.com']
  // var corsOptions = {
  //   origin: function (origin, callback) {
  //     var originIsWhitelisted = whitelist.indexOf(origin) !== -1
  //     callback(null, originIsWhitelisted)
  //   }
  // }
  // self.app.use(cors(corsOptions))
  self.app.use(cors())

  // CORS PREFLIGHT OPTIONS
  // app.options('*', cors()) // include before other routes
  // Validate MAX_CONTENT_LENGTH_ACCEPTED
  var MAX_CONTENT_LENGTH_ACCEPTED = 9999
  self.app.use(contentLength.validateMax({
    max: MAX_CONTENT_LENGTH_ACCEPTED,
    status: 400,
    message: 'Please make a small payload'
  }))

  // ENFORCE SSL
  // var express_enforces_ssl = require('express-enforces-ssl')
  // self.app.use(express_enforces_ssl())
  debug('end setupExpressSecurity')
}

Mean.prototype.setupExpressHeaders = function () {
  debug('started setupExpressHeaders')
  var self = this
  self.app.use(function (req, res, next) {
    // Add all custom system headers here
    // Force IE to use latest rendering engine or Chrome Frame
    res.header('X-UA-Compatible', 'IE=Edge,chrome=1')
    next()
  })
  debug('end setupExpressHeaders')
}

Mean.prototype.setupExpressLogger = function () {
  debug('started setupExpressLogger')
  var self = this
  if (self.settings.logger) {
    self.app.use(logger(self.settings.logger))
    self.app.use(function (req, res, next) {
      // Log requests using the "debug" module so that the output is hidden by default.
      // Enable with DEBUG=* environment variable.
      debug(req.method + ' ' + req.originalUrl + ' ' + req.ip)
      next()
    })
  }
  debug('end setupExpressLogger')
}

Mean.prototype.setupServerRoutesModels = function () {
  debug('started setupServerRoutesModels')
  var self = this
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
  debug('end setupServerRoutesModels')
}

Mean.prototype.setupTools = function () {
  var self = this
  var files = glob.sync('./tools/*/package.json')
  _.forEach(files, function (n, k) {
    var packageInfo = require(n)
    if (packageInfo.active || _.isUndefined(packageInfo.active)) {
      var mainPath = _.replace(n, 'package.json', packageInfo.main)
      require(mainPath).call(self)
    }
  })
}

Mean.prototype.setupStaticRoutes = function () {
  debug('started setupStaticRoutes')
  var self = this
  self.app.use(express.static(path.join(self.dir, 'client/'), {
    maxAge: 31557600000
  }))
  if (self.environment === 'development') {
    self.app.use('/api/v1/status',
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

    ejs.renderFile(path.join(__dirname, './server/layout/index.html'), {
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

  debug('end setupStaticRoutes')
}

Mean.prototype.purgeMaxCdn = function () {
  debug('started purgeMaxCdn')

  var self = this
  if (self.settings.maxcdn.zoneId) {
    var maxcdn = new MaxCDN(
      self.settings.maxcdn.companyAlias,
      self.settings.maxcdn.consumerKey,
      self.settings.maxcdn.consumerSecret
    )
    maxcdn.del('zones/pull.json/' + self.settings.maxcdn.zoneId + '/cache', function (err, res) {
      console.log('MAXCDN: STATUS')
      if (err) {
        console.error('PURGE ERROR: ', err.stack || err.message || err)
        return
      } else if (res.code !== 200) {
        console.error('PURGE ERROR: ', res.code)
        return
      }
      console.log('PURGE SUCCESS')
    })
  }

  debug('end purgeMaxCdn')
}

var run = require('./run.js')
if (!module.parent) {
  run(Mean)
}

module.exports = Mean
