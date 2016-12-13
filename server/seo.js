module.exports = Seo

var pathToRegexp = require('path-to-regexp')
var _ = require('lodash')

// ADD AUTH TO ROUTES
function Seo (self, path, query, cb) {
  var matched = false
  if (!self.settings.seo) return cb(self.settings.html)
  _.forEach(self.settings.seo, function (pathSettings, pathValue) {
    var keys = []
    var regexMatch = pathToRegexp(pathValue, keys, { sensitive: false, strict: true, end: true })
    var match = regexMatch.exec(path)
    if (match) {
      matched = true
      var obj = {
        query: query,
        params: {}
      }
      for (var i = 1; i < match.length; i++) {
        obj.params[keys[i - 1].name] = match[i]
      }
      if (pathSettings.hook) {
        pathSettings.hook(self, obj, function (err, data) {
          if (err) {
            return cb(self.settings.html)
          }
          if (!data) {
            data = obj
          }
          cb(_.merge(self.settings.html, compile(pathSettings, data)))
        })
      } else {
        cb(_.merge(self.settings.html, compile(pathSettings, obj)))
      }

      return false
    }
  })
  if (!matched) {
    return cb(self.settings.html)
  }
}
function compile (seo, data) {
  var compiled = {}
  _.forEach(seo, function (value, prop) {
    if (prop === 'hook') { return }
    var propTemplate = _.template(value)
    try {
      compiled[prop] = propTemplate(data)
    } catch (err) {
      console.log(err.message, ' in seo compile')
    }
  })

  return compiled
}
