module.exports = { config }

const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const compress = require('compression')
const favicon = require('serve-favicon')
const methodOverride = require('method-override')
const path = require('path')
const express = require('express')

function config (self) {
  self.app.use(morgan('dev'))
  self.app.use(express.json({
    limit: '100kb'
  }))
  self.app.use(express.urlencoded({
    limit: '100kb', extended: true
  }))
  self.app.use(compress())
  self.app.use(methodOverride())
  self.app.use(cookieParser())
  self.dir = __dirname
  self.app.enable('trust proxy')
  self.app.disable('x-powered-by')
  self.app.set('view engine', 'html')
  self.app.set('views', path.join(self.dir, '/client'))
  self.app.set('port', self.port)
  self.app.use(favicon(path.join(__dirname, '../configs/assets/favicon.ico')))
}
