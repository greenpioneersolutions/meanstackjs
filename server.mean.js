module.exports = Mean

var express = require('express')
var async = require('async')
var cookieParser = require('cookie-parser')
var compress = require('compression')
var session = require('express-session')
var bodyParser = require('body-parser')
var Promise = require('bluebird')
var logger = require('morgan')
var errorHandler = require('errorhandler')
var methodOverride = require('method-override')
var sass = require('node-sass')
var less = require('less')
var chokidar = require('chokidar')
var chalk = require('chalk')
var fs = require('fs')
var _ = require('lodash')
var MongoStore = require('connect-mongo')(session)
var flash = require('express-flash')
var path = require('path')
var mongoose = require('mongoose')
var passport = require('passport')
var auth = require('./server/passport.js')
var expressValidator = require('express-validator')
var status = require('express-system-status')

function Mean (opts, done) {
  var self = this
  self.opts = opts
  self.debug = require('debug')('meanstackjs:server')
  self.setupEnv()
  self.setupExpressConfigs()
  self.setupHeaders()
  if (self.settings.logger)self.setupLogger()
  if (self.settings.swagger)self.swagger()
  if (self.environment === 'development') {
    self.nightwatch()
    self.plato()
  }
  self.setupRoutesMiddleware()
  self.setupStatic()
  self.livereload()

  async.parallel({
    connectMongoDb: function (callback) {
      mongoose.Promise = Promise
      mongoose.set('debug', self.environment === 'production')
      mongoose.connect(self.settings.db, self.settings.dbOptions)
      mongoose.connection.on('error', function (err) {
        console.log('MongoDB Connection Error. Please make sure that MongoDB is running.')
        self.debug('MongoDB Connection Error ')
        callback(err, null)
      })
      mongoose.connection.on('open', function () {
        self.debug('MongoDB Connection Open ')
        callback(null, {
          db: self.settings.db,
          dbOptions: self.settings.dbOptions
        })
      })
    },
    server: function (callback) {
      self.app.listen(self.app.get('port'), function () {
        console.log('Express server listening on port %d in %s mode', self.app.get('port'), self.app.get('env'))
        self.debug('Express server listening on port %d in %s mode', self.app.get('port'), self.app.get('env'))
        callback(null, {
          port: self.app.get('port'),
          env: self.app.get('env')
        })
      })
    }
  },
    function (err, results) {
      if (err) {
        self.debug('Exiting because of error %d', err)
        process.exit(1)
      }
      done(null)
    })

  self.debug('Finished Server Load')
}

Mean.prototype.setupEnv = function () {
  var self = this
  self.environment = require('./server/environment.js').get()
  self.settings = require('./configs/settings.js').get()
  self.dir = __dirname
}

Mean.prototype.setupExpressConfigs = function () {
  var self = this
  self.port = self.opts.port || self.settings.http.port
  self.debug('started')

  self.app = express()

  // Trust "X-Forwarded-For" and "X-Forwarded-Proto" nginx headers
  self.app.enable('trust proxy')

  // Disable "powered by express" header
  self.app.disable('x-powered-by')

  // cache=memory or swig dies in NODE_ENV=production
  self.app.locals.cache = 'memory'
  var swig = require('swig')
  self.app.engine('html', swig.renderFile)
  self.app.set('view engine', 'html')
  self.app.set('views', path.join(self.dir, '/client'))

  /**
   * Express configuration.
   */
  self.app.set('port', self.port)
  self.app.use(compress())
  self.app.use(bodyParser.json())
  self.app.use(bodyParser.urlencoded({
    extended: true
  }))
  self.app.use(expressValidator())
  self.app.use(methodOverride())
  self.app.use(cookieParser())
  self.app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: self.settings.sessionSecret,
    store: new MongoStore({
      url: self.settings.db,
      autoReconnect: true
    })
  }))
  self.app.use(passport.initialize())
  self.app.use(passport.session())
  passport.serializeUser(auth.serializeUser)
  passport.deserializeUser(auth.deserializeUser)
  passport.use(auth.passportStrategy)

  self.app.use(flash())
  self.app.use(function (req, res, next) {
    res.locals.user = req.user
    if (/api/i.test(req.path)) {
      try {
        if (req.body.redirect) {
          req.session.returnTo = req.body.redirect
        }
      } catch (err) {
        console.log(err)
      }
    }
    next()
  })
  self.app.use(errorHandler())
}

Mean.prototype.setupHeaders = function () {
  var self = this
  self.app.use(function (req, res, next) {
    // var extname = path.extname(url.parse(req.url).pathname)

    // // Add cross-domain header for fonts, required by spec, Firefox, and IE.
    // if (['.eot', '.ttf', '.otf', '.woff', '.woff2'].indexOf(extname) >= 0) {
    //   res.header('Access-Control-Allow-Origin', '*')
    // }

    // Prevents IE and Chrome from MIME-sniffing a response to reduce exposure to
    // drive-by download attacks when serving user uploaded content.
    res.header('X-Content-Type-Options', 'nosniff')

    // Prevent rendering of site within a frame
    res.header('X-Frame-Options', 'DENY')

    // Enable the XSS filter built into most recent web browsers. It's usually
    // enabled by default anyway, so role of this headers is to re-enable for this
    // particular website if it was disabled by the user.
    res.header('X-XSS-Protection', '1; mode=block')

    // Force IE to use latest rendering engine or Chrome Frame
    res.header('X-UA-Compatible', 'IE=Edge,chrome=1')

    next()
  })
}

Mean.prototype.setupLogger = function () {
  var self = this
  self.app.use(logger(self.settings.logger))
  self.app.use(function (req, res, next) {
    // Log requests using the "debug" module so that the output is hidden by default.
    // Enable with DEBUG=* environment variable.
    self.debug(req.method + ' ' + req.originalUrl + ' ' + req.ip)
    next()
  })
}
Mean.prototype.swagger = function () {
  var self = this
  var Swagger = require('swagger-node-express')
  var swaggerUI = require('swagger-ui')
  self.app.use('/api' + '/index.html', handleIndex)
  self.app.use('/api' + '/', handleIndex)
  self.app.use('/api', express.static(swaggerUI.dist))
  var html
  function handleIndex (req, res, next) {
    if (req.url !== '/' && req.url !== '/index.html') {
      return next()
    }
    if (req.originalUrl === '/api') {
      return res.redirect(301, '/api' + '/')
    }
    if (html) {
      return res.send(html)
    }
    fs.readFile(swaggerUI.dist + '/index.html', {
      encoding: 'utf8'
    }, function (err, data) {
      if (err) {
        console.error(err)
        return res.send(500)
      }
      html = data.replace('http://petstore.swagger.io/v2/swagger.json', '/api-docs')
      res.send(html)
    })
  }
  var swagger = Swagger.createNew(self.app)

  var paramTypes = swagger.paramTypes
  var sortParm = paramTypes.query('sort', 'Comma seperated list of params to sort by.  (e.g "-created,name") ', 'string')
  var limitParm = paramTypes.query('limit', 'Number of items to return', 'number')
  var skipParm = paramTypes.query('skip', 'Number of items to skip', 'number')

  var defaultGetParams = [
    sortParm,
    limitParm,
    skipParm
  ]

  var swaggerPath = path.resolve(self.dir, './server/swagger')
  if (!fs.existsSync(swaggerPath)) {
    throw new Error('Critical Folder Missing:')
  }
  var swaggerDir = _.filter(fs.readdirSync(swaggerPath), function (n) {
    return !_.startsWith(n, '.')
  })
  _.forEach(swaggerDir, function (n) {
    var model = require(path.join(self.dir, '/server/swagger/', n, '/models'))
    swagger.addModels(model)
    require(path.join(self.dir, '/server/swagger/', n, '/services'))
      .load(swagger, {
        searchableOptions: defaultGetParams
      })
  })
  swagger.configureSwaggerPaths('', '/api-docs', '')
  swagger.configureDeclaration('Meanstackjs', {
    description: 'Meanstackjs API',
    authorizations: [''],
    produces: ['application/json']
  })
  swagger.setApiInfo({
    title: 'Meanstackjs',
    description: 'Meanstackjs API',
    termsOfServiceUrl: 'http://meanstackjs.com',
    contact: 'info@meanstackjs.com',
    licenseUrl: 'http://en.wikipedia.org/wiki/MIT_License'
  })
  swagger.setAuthorizations({
    apiKey: {
      type: 'apiKey',
      passAs: 'header'
    }
  })
  swagger.configure('/api', '1.0')
}
Mean.prototype.nightwatch = function () {
  var self = this
  self.app.use('/e2e', express.static(path.join(self.dir, 'reports/nightwatch/')))
}
Mean.prototype.plato = function () {
  var self = this
  self.app.use('/plato', express.static(path.join(self.dir, 'reports/plato')))
  require('./reports/plato.js').report(self.settings.plato)
}
Mean.prototype.setupStatic = function () {
  var self = this

  self.app.use(express.static(path.join(self.dir, 'client/'), {
    maxAge: 31557600000
  }))
  if (self.environment === 'development') {
    self.app.use('/api/v1/status', // middleware.verify  if you want the api to be behind token based
      status({
        app: self.app,
        config: self.settings,
        auth: true,
        user: 'admin',
        pass: 'pass',
        extra: {
          environment: self.environment
        },
        mongoose: mongoose // Now Supporting Mongoose
      })
    )
  }
  /**
   * Primary Failover routes.
   */
  self.app.get('/api/*', function (req, res) {
    res.status(400).send({
      error: 'nothing found in api'
    })
  })
  self.app.get('/bower_components/*', function (req, res) {
    res.status(400).send({
      error: 'nothing found in bower_components'
    })
  })
  self.app.get('/images/*', function (req, res) {
    res.status(400).send({
      error: 'nothing found in images'
    })
  })
  self.app.get('/scripts/*', function (req, res) {
    res.status(400).send({
      error: 'nothing found in scripts'
    })
  })
  self.app.get('/styles/*', function (req, res) {
    res.status(400).send({
      error: 'nothing found in styles'
    })
  })
  self.app.get('/uploads/*', function (req, res) {
    res.status(400).send({
      error: 'nothing found in uploads'
    })
  })
  /**
   * Primary app routes.
   */
  self.app.get('/*', function (req, res) {
    if (_.isUndefined(req.user)) {
      req.user = {}
      req.user.authenticated = false
    } else {
      req.user.authenticated = true
    }
    // took out user
    res.render(path.resolve('server') + '/layout/index.html', {
      html: self.settings.html,
      assets: self.app.locals.frontendFilesFinal,
      environment: self.environment
    })
  })
}
Mean.prototype.setupRoutesMiddleware = function () {
  var self = this
  /**
   * Middleware.
   */
  self.middleware = require('./server/middleware.js')
  self.build = require('buildreq')(self.settings.buildreq)
  self.app.use(self.build.queryMiddleware({mongoose: mongoose}))
  /**
   * Routes.
   */
  self.Register = require('./server/register.js')
  self.app.use(self.build.responseMiddleware({mongoose: mongoose}))
  self.fileStructure = self.Register({
    app: self.app,
    settings: self.settings,
    middleware: self.middleware
  })
  /**
   * Dynamic Routes / Manually enabling them . You can change it back to automatic in the settings
   * build.routing(app, mongoose) - if reverting back to automatic
   */

  self.build.routing({
    mongoose: mongoose,
    remove: ['users'],
    middleware: {
      auth: [self.middleware.verify, self.middleware.isAuthenticated]
    }
  }, function (error, data) {
    if (error) console.log(error)
    _.forEach(data, function (m) {
      self.debug('Route Built by NPM buildreq:', m.route)
      self.app.use(m.route, m.app)
    })
  })
}
Mean.prototype.livereload = function () {
  var self = this
  /**
   * Livereload
   */
  if (self.environment === 'development') {
    var scss_lessWatcher = chokidar.watch('file, dir, glob, or array', {
      ignored: /[\/\\]\./,
      persistent: true
    })
    var scss_lessGlobalWatcher = chokidar.watch('file, dir, glob, or array', {
      ignored: /[\/\\]\./,
      persistent: true
    })
    scss_lessWatcher.on('add', function (url) {
      // console.log(url)
    })
    scss_lessWatcher.on('change', function (url) {
      var fileData = _.words(url, /[^./ ]+/g)
      if (fileData[fileData.length - 1] === 'less') {
        var lessContents = fs.readFileSync(path.resolve(url), 'utf8')
        less.render(lessContents, function (err, result) {
          if (err) {
            console.log(chalk.red(err))
          }
          fs.writeFileSync(path.resolve('./client/styles/compiled/' + fileData[fileData.length - 3] + '.' + fileData[fileData.length - 2] + '.' + fileData[fileData.length - 1] + '.css'), result.css)
        })
        console.log(chalk.green('Recompiled LESS'))
      } else {
        console.log(url)
        var scssContents = fs.readFileSync(path.resolve(url), 'utf8')
        var result = sass.renderSync({
          includePaths: [path.join(self.dir, './client/modules'), path.join(self.dir, './client/styles'), path.join(self.dir, './client/bower_components/bootstrap-sass/assets/stylesheets'), path.join(self.dir, './client/bower_components/Materialize/sass'), path.join(self.dir, './client/bower_components/foundation/scss'), path.join(self.dir, './client/bower_components/font-awesome/scss')],
          data: scssContents
        })
        fs.writeFileSync(path.resolve('./client/styles/compiled/' + fileData[fileData.length - 3] + '.' + fileData[fileData.length - 2] + '.' + fileData[fileData.length - 1] + '.css'), result.css)
        console.log(chalk.green('Recompiled SCSS'))
      }
    })
    scss_lessGlobalWatcher.on('change', function (url) {
      var fileData = _.words(url, /[^./ ]+/g)
      if (fileData[fileData.length - 1] === 'less') {
        var lessContents = fs.readFileSync(path.resolve(url), 'utf8')
        less.render(lessContents, function (err, result) {
          if (err) {
            console.log(chalk.red(err))
          }
          fs.writeFileSync(path.resolve('./client/styles/compiled/' + fileData[fileData.length - 3] + '.' + fileData[fileData.length - 2] + '.' + fileData[fileData.length - 1] + '.css'), result.css)
        })
        _.forEach(self.fileStructure.style.less, function (l, k) {
          var lessContents = fs.readFileSync(path.join(self.dir, l.orginal), 'utf8')
          less.render(lessContents, function (err, result) {
            if (err) {
              console.log(chalk.red(err))
            }
            fs.writeFileSync(path.join(self.dir, l.compiled), result.css)
          })
        })
        console.log(chalk.green('Recompiled LESS'))
      } else {
        // RENDER THE GLOBAL STYLE
        var globalContents = fs.readFileSync(path.join(self.dir, '/client/styles/global.style.scss'), 'utf8')
        var result = sass.renderSync({
          includePaths: [path.join(self.dir, './client/modules'), path.join(self.dir, './client/styles'), path.join(self.dir, './client/bower_components/bootstrap-sass/assets/stylesheets'), path.join(self.dir, './client/bower_components/Materialize/sass'), path.join(self.dir, './client/bower_components/foundation/scss'), path.join(self.dir, './client/bower_components/font-awesome/scss')],
          data: globalContents
        })
        fs.writeFileSync(path.join(self.dir, '/client/styles/compiled/global.style.css'), result.css)
        _.forEach(self.fileStructure.style.scss, function (s, k) {
          var scssContents = fs.readFileSync(path.join(self.dir, s.orginal), 'utf8')
          // PLACED includePaths: so that @import 'global-variables.styles.scss'; work properly
          var result = sass.renderSync({
            includePaths: [path.join(self.dir, './client/modules'), path.join(self.dir, './client/styles'), path.join(self.dir, './client/bower_components/bootstrap-sass/assets/stylesheets'), path.join(self.dir, './client/bower_components/Materialize/sass'), path.join(self.dir, './client/bower_components/foundation/scss'), path.join(self.dir, './client/bower_components/font-awesome/scss')],
            data: scssContents
          })
          fs.writeFileSync(path.join(self.dir, s.compiled), result.css)
        })
        console.log(chalk.green('Recompiled Global SCSS'))
      }
    })
    scss_lessWatcher.add('./client/modules/*/*.less')
    scss_lessWatcher.add('./client/modules/*/*.scss')
    scss_lessGlobalWatcher.add('./client/*/*.less')
    scss_lessGlobalWatcher.add('./client/*/*.scss')
  }
}

var run = require('./run.js')
if (!module.parent) {
  run(Mean)
}
