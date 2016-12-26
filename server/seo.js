module.exports = Seo

var pathToRegexp = require('path-to-regexp')
var _ = require('lodash')
var ejs = require('ejs')
// ADD AUTH TO ROUTES
function Seo (self, req, path, cb) {
  var matched = false
  if (typeof path === 'function') {
    cb = path
    path = req.path
  }
  if (!self.settings.seo) return cb(self.settings.html)
  _.forEach(self.settings.seo, function (pathSettings, pathValue) {
    var keys = []
    var regexMatch = pathToRegexp(pathValue, keys, { sensitive: false, strict: true, end: true })
    var match = regexMatch.exec(path)
    if (match) {
      matched = true
      var obj = {
        query: req.query,
        user: req.user || {},
        params: {},
        path: (req.protocol + '://' + req.headers.host + req.path)
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
          return cb(_.merge(self.settings.html, compile({name: self.settings.render.seo.toLowerCase(), options: self.settings.render[self.settings.render.seo.toLowerCase()].options}, pathSettings, data)))
        })
      } else {
        return cb(_.merge(self.settings.html, compile({name: self.settings.render.seo.toLowerCase(), options: self.settings.render[self.settings.render.seo.toLowerCase()].options}, pathSettings, obj)))
      }
      return false
    }
  })
  if (!matched) {
    return cb(self.settings.html)
  }
}
function compile (type, seo, data) {
  var compiled = {}
  _.forEach(seo, function (value, prop) {
    if (prop === 'hook') { return }
    if (type.name === 'lodash') {
      var propTemplate = _.template(value, type.options)
      try {
        compiled[prop] = propTemplate(data)
      } catch (err) {
        console.log(err.message, ' in seo compile lodash')
      }
    } else if (type.name === 'ejs') {
      try {
        compiled[prop] = ejs.render(value, data, type.options)
      } catch (err) {
        console.log(err.message, ' in seo compile ejs')
      }
    }
  })

  return compiled
}
