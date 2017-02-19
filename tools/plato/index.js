module.exports = setupToolPlato

var express = require('express')
var debug = require('debug')('meanstackjs:tools')
var plato = require('plato')
var path = require('path')

function setupToolPlato (self) {
  debug('started setupToolPlato')
  if (self.environment === 'development') {
    self.app.use('/plato', express.static(path.join(self.dir, 'tools/plato/reports/')))
    var files = [
      path.join(__dirname, '../../*.js'),
      path.join(__dirname, '../../client/*.js'),
      path.join(__dirname, '../../server/*.js')
    ]
    // FILES, REPORT DIR , OPTIONS, CALLBACK WITH REPORT
    plato.inspect(files, path.join(__dirname, './reports/'), self.settings.plato, function (report) {
      // console.log(report, 'report')
      // console.log(plato.getOverviewReport(report), 'getOverviewReport')
    })
  }
  debug('end setupToolPlato')
}
