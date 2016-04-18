module.exports = {report: Plato}

var plato = require('plato')
var path = require('path')

function Plato (opts) {
  var files = [
    path.join(__dirname, '../*.js'),
    path.join(__dirname, '../client/*.js'),
    path.join(__dirname, '../server/*.js')
  ]
  // FILES, REPORT DIR , OPTIONS, CALLBACK WITH REPORT
  plato.inspect(files, path.join(__dirname, './plato/'), opts, function (report) {
    // console.log(report, 'report')
    // console.log(plato.getOverviewReport(report), 'getOverviewReport')
  })
}
