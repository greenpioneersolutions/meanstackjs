module.exports = setupToolNightwatch

var express = require('express')
var debug = require('debug')('meanstackjs:tools')
var path = require('path')

function setupToolNightwatch (self) {
  debug('started setupToolNightwatch')
  if (self.environment === 'development') self.app.use('/e2e', express.static(path.join(self.dir, 'tools/nightwatch/reports')))
  debug('end setupToolNightwatch')
}
