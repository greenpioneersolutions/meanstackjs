module.exports.setupTools = tools

var _ = require('lodash')
var glob = require('glob')

function tools (self) {
  var files = glob.sync('./tools/*/package.json')
  files.forEach(function (n, k) {
    var packageInfo = require('../' + n)
    if (packageInfo.active || _.isUndefined(packageInfo.active)) {
      var mainPath = _.replace(n, 'package.json', packageInfo.main)
      require('../' + mainPath)(self)
    }
  })
}
