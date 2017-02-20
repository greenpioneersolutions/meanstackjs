module.exports.middleware = middleware

var morgan = require('morgan')
var pathExists = require('is-there')
var fs = require('fs')
var path = require('path')
var winston = require('winston')
require('winston-daily-rotate-file')
var MongoDB = require('winston-mongodb').MongoDB
var WinstonFile = (process.env.NODE_ENV !== 'production' ? winston.transports.File : winston.transports.DailyRotateFile)
var settings = require('../configs/settings').get()

if (!pathExists(path.join(__dirname, '/../logs/'))) {
  fs.mkdirSync(path.join(__dirname, '/../logs/'))
}

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      prettyPrint: true,
      colorize: true,
      showLevel: false,
      timestamp: false,
      handleExceptions: true
    }),
    new (WinstonFile)({
      name: 'error',
      filename: 'logs/error-meanstackjs.log',
      datePattern: 'yyyy-MM-dd.',
      prepend: true,
      level: 'error',
      handleExceptions: true,
      json: true,
      maxsize: 52428800, // 50MB
      maxFiles: 5
    }),
    new (WinstonFile)({
      name: 'info',
      filename: 'logs/info-meanstackjs.log',
      datePattern: 'yyyy-MM-dd.',
      prepend: true,
      handleExceptions: true,
      json: true,
      maxsize: 52428800, // 50MB
      maxFiles: 5
    }),
    new (WinstonFile)({
      name: 'warn',
      filename: 'logs/warn-meanstackjs.log',
      datePattern: 'yyyy-MM-dd.',
      prepend: true,
      level: 'warn',
      handleExceptions: true,
      json: true,
      maxsize: 52428800, // 50MB
      maxFiles: 5
    }),
    new (MongoDB)({
      level: 'error',
      db: settings.mongodb.uri,
      collection: 'errors',
      handleExceptions: true,
      json: true,
      maxsize: 52428800, // 50MB
      maxFiles: 5
    })
  ],
  exitOnError: false
})

function middleware (self) {
  if (self.settings.logger) {
    self.app.use(morgan(self.settings.logger, {
      stream: {
        write: function (message) {
          self.logger.info(message.replace(/\n$/, ''))
        }
      }
    }))
  }
}

module.exports.logger = logger
