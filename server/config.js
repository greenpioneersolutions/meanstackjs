module.exports.configMiddleware = config

var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var compress = require('compression')
var expressValidator = require('express-validator')
var methodOverride = require('method-override')
var path = require('path')
var statusMonitor = require('express-status-monitor')
var queryParameters = require('express-query-parameters')()

function config (self) {
  self.app.enable('trust proxy')
  self.app.disable('x-powered-by')
  self.app.set('view engine', 'html')
  self.app.set('views', path.join(self.dir, '/client'))
  self.app.set('port', self.port)
  self.app.use(statusMonitor({
    path: '/api/status'
  }))
  self.app.use(compress())
  self.app.use(bodyParser.json(self.settings.bodyparser.json))
  self.app.use(bodyParser.urlencoded(self.settings.bodyparser.urlencoded))
  self.app.use(expressValidator(self.settings.expresValidator))
  self.app.use(methodOverride())
  self.app.use(cookieParser())
  queryParameters.config({
    settings: {
      schema: ['_id', 'id', '__v', 'created', 'title', 'content', 'user', 'email', 'roles'], // the names people can search
      adapter: 'mongoose' // <object|string:supported adapter(MONGOOSE)>
    }
  })
  self.app.use(queryParameters.middleware())
  self.app.use(require('./prerenderer'))
}
