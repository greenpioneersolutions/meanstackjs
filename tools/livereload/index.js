module.exports = setupToolLivereload

var less = require('less')
var chalksay = require('chalksay')
var chokidar = require('chokidar')
var sass = require('node-sass')
var debug = require('debug')('meanstackjs:tools')
var path = require('path')
var fs = require('fs')
var _ = require('lodash')

function setupToolLivereload (self) {
  debug('started setupToolLivereload')

  if (self.environment === 'development') {
    var Livereload = require('./server.livereload.js')
    self.run(Livereload)
    var scssLessWatcher = chokidar.watch('file, dir, glob, or array', {
      ignored: /[\/\\]\./,
      persistent: true
    })
    var scssLessGlobalWatcher = chokidar.watch('file, dir, glob, or array', {
      ignored: /[\/\\]\./,
      persistent: true
    })
    scssLessWatcher.on('add', function (url) {
      debug('Styles are watching:' + url)
    })
    scssLessWatcher.on('change', function (url) {
      var fileData = _.words(url, /[^./ \\]+/g)
      if (fileData[fileData.length - 1] === 'less') {
        var lessContents = fs.readFileSync(path.resolve(url), 'utf8')
        less.render(lessContents, function (err, result) {
          if (err) {
            chalksay.red(err)
          }
          fs.writeFileSync(path.resolve('./client/styles/compiled/' + fileData[fileData.length - 3] + '.' + fileData[fileData.length - 2] + '.' + fileData[fileData.length - 1] + '.css'), result.css)
        })
        chalksay.green('Recompiled LESS')
      } else {
        console.log(url)
        var scssContents = fs.readFileSync(path.resolve(url), 'utf8')
        var result = sass.renderSync({
          includePaths: [path.join(self.dir, './client/modules'), path.join(self.dir, './client/styles'), path.join(self.dir, './client/bower_components/bootstrap-sass/assets/stylesheets'), path.join(self.dir, './client/bower_components/Materialize/sass'), path.join(self.dir, './client/bower_components/foundation/scss'), path.join(self.dir, './client/bower_components/font-awesome/scss')],
          data: scssContents
        })
        fs.writeFileSync(path.resolve('./client/styles/compiled/' + fileData[fileData.length - 3] + '.' + fileData[fileData.length - 2] + '.' + fileData[fileData.length - 1] + '.css'), result.css)
        chalksay.green('Recompiled SCSS')
      }
    })
    scssLessGlobalWatcher.on('change', function (url) {
      var fileData = _.words(url, /[^./ \\]+/g)
      if (fileData[fileData.length - 1] === 'less') {
        var lessContents = fs.readFileSync(path.resolve(url), 'utf8')
        less.render(lessContents, function (err, result) {
          if (err) {
            chalksay.red(err)
          }
          fs.writeFileSync(path.resolve('./client/styles/compiled/' + fileData[fileData.length - 3] + '.' + fileData[fileData.length - 2] + '.' + fileData[fileData.length - 1] + '.css'), result.css)
        })
        _.forEach(self.fileStructure.style.less, function (l, k) {
          var lessContents = fs.readFileSync(path.join(self.dir, l.orginal), 'utf8')
          less.render(lessContents, function (err, result) {
            if (err) {
              chalksay.red(err)
            }
            fs.writeFileSync(path.join(self.dir, l.compiled), result.css)
          })
        })
        chalksay.green('Recompiled LESS')
      } else {
        // RENDER THE GLOBAL STYLE
        var globalContents = fs.readFileSync(path.join(self.dir, '/client/styles/global.style.scss'), 'utf8')
        var result = sass.renderSync({
          includePaths: [path.join(self.dir, './client/modules'), path.join(self.dir, './client/styles'), path.join(self.dir, './client/bower_components/bootstrap-sass/assets/stylesheets'), path.join(self.dir, './client/bower_components/Materialize/sass'), path.join(self.dir, './client/bower_components/foundation/scss'), path.join(self.dir, './client/bower_components/font-awesome/scss')],
          data: globalContents
        })
        fs.writeFileSync(path.join(self.dir, '/client/styles/compiled/global.style.css'), result.css)
        _.forEach(self.fileStructure.style.scss, function (s, k) {
          var scssContents = fs.readFileSync(path.join(self.dir, s.orginal), 'utf8')
          // PLACED includePaths: so that @import 'global-variables.styles.scss'; work properly
          var result = sass.renderSync({
            includePaths: [
              path.join(self.dir, './client/modules'),
              path.join(self.dir, './client/styles'),
              path.join(self.dir, './client/bower_components/bootstrap-sass/assets/stylesheets'),
              path.join(self.dir, './client/bower_components/Materialize/sass'),
              path.join(self.dir, './client/bower_components/foundation/scss'),
              path.join(self.dir, './client/bower_components/font-awesome/scss')
            ],
            data: scssContents
          })
          fs.writeFileSync(path.join(self.dir, s.compiled), result.css)
        })
        chalksay.green('Recompiled Global SCSS')
      }
    })
    scssLessWatcher.add('./client/modules/*/*.less')
    scssLessWatcher.add('./client/modules/*/*.scss')
    scssLessGlobalWatcher.add('./client/*/*.less')
    scssLessGlobalWatcher.add('./client/*/*.scss')
  }

  debug('end setupToolLivereload')
}
