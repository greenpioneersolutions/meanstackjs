/**
 * Module dependencies.
 */

var settings = require('./configs/settings.js')
var express = require('express')
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
var chalk = require('chalk')
var fs = require('fs')
var _ = require('lodash')
var MongoStore = require('connect-mongo')(session)
var flash = require('express-flash')
var path = require('path')
var mongoose = require('mongoose')
var passport = require('passport')
var expressValidator = require('express-validator')
var environment = 'development'
if (process.env.NODE_ENV === 'test') {
  environment = 'test'
} else if (process.env.NODE_ENV === 'production') {
  environment = 'production'
}

// var serveStatic = require('serve-static')
// var helmet = require('helmet')
// well-known web vulnerabilities
//  apps[n].use(helmet())
/**
 * Create Express server.
 */
var app = express()
/**
 * Aggregation & dynamic api building
 */
var Register = require('./server/register.js')(app)
var build = require('buildreq')(settings.buildreq)

/**
 * Connect to MongoDB.
 */
//  mongoose.connect('mongodb://localhost/mean-dev', {server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 }}})
// var db = mongoose.connection
// db.on('error', console.error.bind(console, 'connection error:'))
// db.once('open', function callback () {
//   // console.log("connection")
// })
mongoose.connect(settings.db, settings.dbOptions)
mongoose.connection.on('error', function () {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.')
  process.exit(1)
})
mongoose.Promise = Promise
/**
 * Swig configuration.
 */
// // assign the template engine to .html files
//  app.engine('html', consolidate[config.templateEngine])

//  // set .html as the default extension
//  app.set('view engine', 'html')
// cache=memory or swig dies in NODE_ENV=production
app.locals.cache = 'memory'
var swig = require('swig')
app.engine('html', swig.renderFile)
app.set('view engine', 'html')
app.set('views', __dirname + '/client')

/**
 * Express configuration.
 */
app.set('port', settings.http.port)
app.use(compress())
app.use(logger(settings.logger))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(expressValidator())
app.use(methodOverride())
app.use(cookieParser())
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: settings.sessionSecret,
  store: new MongoStore({
    url: settings.db,
    autoReconnect: true
  })
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(function (req, res, next) {
  res.locals.user = req.user
  next()
})
app.use(function (req, res, next) {
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

/**
 * Dynamic Query Builder
 */
app.use(build.query())
/**
 * Manual Routes - returns file structure for the front end
 */
var fileStructure = Register.all(settings)
/**
 * Middleware to use throughout the backend
 */
var User = mongoose.model('User')
app.locals.findUser = function (id, cb) {
  User.findOne({
    _id: id
  }, function (err, user) {
    if (err || !user) return cb(null)
    cb(user)
  })
}
app.locals.requiresLogin = function (req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).send({
      msg: 'User is not authorized'
    })
  }
  app.locals.findUser(req.user._id, function (user) {
    if (!user) return res.status(401).send({msg: 'User is not authorized'})
    req.user = user
    next()
  })
}
app.locals.isMongoId = function (req, res, next) {
  if ((_.size(req.params) === 1) && (!mongoose.Types.ObjectId.isValid(_.values(req.params)[0]))) {
    return res.status(500).send('Parameter passed is not a valid Mongo ObjectId')
  }
  next()
}
/**
 * Dynamic Routes / Manually enabling them . You can change it back to automatic in the settings
 * build.routing(app, mongoose) - if reverting back to automatic
 */
build.routing({
  mongoose: mongoose,
  remove: ['user'],
  middleware: {
    auth: [app.locals.requiresLogin]
  }
}, function (error, data) {
  if (error) console.log(error)
  _.forEach(data, function (m) {
    console.log(chalk.green('Route Built by NPM buildreq ', m.route))
    app.use(m.route, m.app)
  })
})

/**
 * Make Client Folder Public
 */
app.use(express.static(path.join(__dirname, 'client/'), {
  maxAge: 31557600000
}))
// app.use(express.static(path.join(__dirname, 'client/uploads'), { maxAge: 31557600000 }))

/**
 * Primary Failover routes.
 */
app.get('/api/*', function (req, res) {
  res.status(400).send({
    error: 'nothing found in api'
  })
})
app.get('/bower_components/*', function (req, res) {
  res.status(400).send({
    error: 'nothing found in bower_components'
  })
})
app.get('/images/*', function (req, res) {
  res.status(400).send({
    error: 'nothing found in images'
  })
})
app.get('/scripts/*', function (req, res) {
  res.status(400).send({
    error: 'nothing found in scripts'
  })
})
app.get('/styles/*', function (req, res) {
  res.status(400).send({
    error: 'nothing found in styles'
  })
})
app.get('/uploads/*', function (req, res) {
  res.status(400).send({
    error: 'nothing found in uploads'
  })
})
/**
 * Primary app routes.
 */
app.get('/*', function (req, res) {
  if (_.isUndefined(req.user)) {
    req.user = {}
    req.user.authenticated = false
  } else {
    req.user.authenticated = true
  }
  // took out user
  res.render(path.resolve('server') + '/layout/index.html', {
    html: settings.html,
    assets: app.locals.frontendFilesFinal,
    environment: environment
  })
})
/**
 * Error Handler.
 */
app.use(errorHandler())
/**
 * Livereload
 */
if (environment === 'development') {
  var livereload = require('livereload')
  var server = livereload.createServer()
  var chokidar = require('chokidar')
  server.watch(path.resolve(__dirname + '/client'))
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
        includePaths: [path.join(__dirname, './client/modules'), path.join(__dirname, './client/styles'), path.join(__dirname, './client/bower_components/bootstrap-sass/assets/stylesheets'), path.join(__dirname, './client/bower_components/Materialize/sass'), path.join(__dirname, './client/bower_components/foundation/scss')],
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
      _.forEach(fileStructure.style.less, function (l, k) {
        var lessContents = fs.readFileSync(path.join(__dirname, l.orginal), 'utf8')
        less.render(lessContents, function (err, result) {
          if (err) {
            console.log(chalk.red(err))
          }
          fs.writeFileSync(path.join(__dirname, l.compiled), result.css)
        })
      })
      console.log(chalk.green('Recompiled LESS'))
    } else {
      // RENDER THE GLOBAL STYLE
      var globalContents = fs.readFileSync(__dirname + '/client/styles/global.style.scss', 'utf8')
      var result = sass.renderSync({
        includePaths: [path.join(__dirname, './client/modules'), path.join(__dirname, './client/styles'), path.join(__dirname, './client/bower_components/bootstrap-sass/assets/stylesheets'), path.join(__dirname, './client/bower_components/Materialize/sass'), path.join(__dirname, './client/bower_components/foundation/scss')],
        data: globalContents
      })
      fs.writeFileSync(__dirname + '/client/styles/compiled/global.style.css', result.css)
      _.forEach(fileStructure.style.scss, function (s, k) {
        var scssContents = fs.readFileSync(path.join(__dirname, s.orginal), 'utf8')
        // PLACED includePaths: so that @import 'global-variables.styles.scss'; work properly
        var result = sass.renderSync({
          includePaths: [path.join(__dirname, './client/modules'), path.join(__dirname, './client/styles'), path.join(__dirname, './client/bower_components/bootstrap-sass/assets/stylesheets'), path.join(__dirname, './client/bower_components/Materialize/sass'), path.join(__dirname, './client/bower_components/foundation/scss')],
          data: scssContents
        })
        fs.writeFileSync(path.join(__dirname, s.compiled), result.css)
      })
      console.log(chalk.green('Recompiled Global SCSS'))
    }
  })
  scss_lessWatcher.add('./client/modules/*/*.less')
  scss_lessWatcher.add('./client/modules/*/*.scss')
  scss_lessGlobalWatcher.add('./client/*/*.less')
  scss_lessGlobalWatcher.add('./client/*/*.scss')
}

/**
 * Socketio Realtime
 */
// var server = require('http').createServer(app)
// var io = require('socket.io')(server)
// io.on('connection', function(){ /* … */ })
// server.listen(3000)
/**
 * Swagger
 */
// var swaggerpath = express()
// app.use('/swagger', swaggerpath)
// var swagger = require('swagger-node-express')
// swagger.createNew(swaggerpath)

/**
 * Start Express server.
 */
app.listen(app.get('port'), function () {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'))
})

module.exports = app
