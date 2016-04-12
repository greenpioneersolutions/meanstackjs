module.exports = build

function build (options) {
  if (options === undefined) {
    throw new TypeError(console.log('Expected object for argument options but got ' + options))
  }
  if (typeof options === 'object' && options !== null) {
    return new Register(options)
  }
  throw new TypeError(console.log('Expected object for argument options but got ' + options))
}
var path = require('path')
var _ = require('lodash')
var fs = require('fs')
var chalk = require('chalk')
var sass = require('node-sass')
var less = require('less')
var uglify = require('uglify-js')
var concat = require('concat')
var uglifycss = require('uglifycss')
var mongoose = require('mongoose')
var debug = require('debug')('meanstackjs:register')

function Register (opts, done) {
  var self = this
  self.mail = require('./mail.js')
  self.app = opts.app
  self.settings = opts.settings
  self.middleware = opts.middleware
  self.info()
  self.config()
  self.directories()
  self.createBackendModels()
  self.createBackendRoutes()
  self.createGlobalStyle()
  self.createFrontend()
  self.env()
  return self.frontendFiles
}

Register.prototype.info = function () {
  debug('started Info')
  var self = this
  function expandModules (arr, dir) {
    var returnConfigs = []
    _.forEach(arr, function (value, key) {
      var obj = {
        'name': value,
        'lookup': dir + '/' + value
      }
      var files = fs.readdirSync(dir + '/' + value)
      files = _.filter(files, function (n) {
        return !_.startsWith(n, '.')
      })
      obj.files = []
      _.forEach(files, function (f) {
        var fileData = _.words(f, /[^. ]+/g)
        obj.files.push({
          'type': fileData[1],
          'ext': fileData[2],
          'name': fileData[0],
          'orginal': f
        })
      // configs[value].push(f)
      })
      returnConfigs.push(obj)
    })
    return returnConfigs
  }

  /**
   * BACKEND
   */
  var backendPath = path.resolve(__dirname, './modules')
  if (!fs.existsSync(backendPath)) {
    throw new Error(chalk.red('Critical Folder Missing:' + chalk.red.underline.bold('Expected Server Modules Directory ./server/modules/')))
  }

  var backendConfigs = expandModules(_.filter(fs.readdirSync(backendPath), function (n) {
    return !_.startsWith(n, '.')
  }), backendPath)

  /**
   * FRONTEND
   */
  var frontendPath = path.resolve(__dirname, '../client/modules')
  if (!fs.existsSync(frontendPath)) {
    throw new Error(chalk.red('Critical Folder Missing:' + chalk.red.underline.bold('Expected Server Modules Directory ./client/modules/')))
  }

  var frontendConfigs = _.filter(fs.readdirSync(frontendPath), function (n) {
    return !_.startsWith(n, '.')
  })
  var mainFrontendFile = ''
  frontendConfigs = expandModules(_.filter(frontendConfigs, function (n) {
    if (path.extname(n) !== '')mainFrontendFile = n
    return path.extname(n) === ''
  }), frontendPath)

  self.backendFiles = {
    'model': [],
    'controllers': [],
    'routes': []
  }
  _.forEach(backendConfigs, function (r) {
    _.forEach(r.files, function (j) {
      if (j.type === 'controller') {
        self.backendFiles.controllers.push({name: r.name, url: './modules/' + r.name + '/' + j.orginal})
      } else if (j.type === 'model') {
        self.backendFiles.model.push({name: r.name, url: './modules/' + r.name + '/' + j.orginal})
      } else if (j.type === 'routes') {
        self.backendFiles.routes.push({name: r.name, url: './modules/' + r.name + '/' + j.orginal})
      } else {
        // console.log(j.type)
      }
    })
  })

  self.backendFolders = backendConfigs
  self.frontendFolders = frontendConfigs
  self.mainFrontendFile = mainFrontendFile
  debug('end Info')
}

Register.prototype.config = function (opts) {
  debug('started config')

  var self = this
  /**
   * FRONTEND
   */
  self.frontendFiles = {
    'controller': [],
    'module': [],
    'routes': [],
    'style': {
      'css': [],
      'scss': [],
      'sass': [],
      'less': []
    },
    'view': [],
    'config': [],
    'factory': [],
    'service': [],
    'provider': [],
    'else': []
  }
  self.frontendFilesFinal = {
    css: [],
    js: []
  }
  self.frontendFilesAggregate = {
    css: [],
    js: []
  }
  debug('end config')
}
Register.prototype.directories = function () {
  debug('started directories')

  var self = this
  function rmdirAsync (url, callback) {
    if (fs.existsSync(url)) {
      fs.readdirSync(url).forEach(function (file, index) {
        var curPath = path.resolve(url + '/' + file)
        if (fs.lstatSync(curPath).isDirectory()) { // recurse
          //
        } else { // delete file
          fs.unlinkSync(curPath)
        }
      })
    // fs.rmdirSync(url)
    }
  }
  // CHECK AND MAKE DIRECTORY
  if (!fs.existsSync(__dirname + '/../client/scripts/')) {
    fs.mkdirSync(__dirname + '/../client/scripts/')
  }
  if (!fs.existsSync(__dirname + '/../client/styles/compiled/')) {
    fs.mkdirSync(__dirname + '/../client/styles/compiled/')
  }
  if (!fs.existsSync(__dirname + '/../client/scripts/compiled/')) {
    fs.mkdirSync(__dirname + '/../client/scripts/compiled/')
  }
  if (!fs.existsSync(__dirname + '/../client/uploads/')) {
    fs.mkdirSync(__dirname + '/../client/uploads/')
  }
  // DELETE ALL PREVIOUSLY COMPILED
  rmdirAsync(__dirname + '/../client/styles/compiled/', function () {
    // console.log(arguments)
  })
  rmdirAsync(__dirname + '/../client/scripts/compiled/', function () {
    // console.log(arguments)
  })
  debug('end directories')
}
Register.prototype.createBackendModels = function () {
  debug('started createBackendModels')

  var self = this
  var models

  _.forEach(self.backendFiles.model, function (n) {
    debug('Model: ' + n.name)
    var model = mongoose.model(n.name, require(n.url))
    model.on('index', function (err) {
      if (err) throw err
    })
  })
  debug('end createBackendModels')
}
Register.prototype.createBackendRoutes = function () {
  debug('started createBackendRoutes')

  var self = this
  _.forEach(self.backendFiles.routes, function (n) {
    debug('Route : %s', n.url)
    require(n.url)(self.app, self.middleware, self.mail, self.settings)
  })
  debug('end createBackendRoutes')
}
Register.prototype.createGlobalStyle = function () {
  debug('started createGlobalStyle')

  var globalContents = fs.readFileSync(__dirname + '/../client/styles/global.style.scss', 'utf8')
  var result = sass.renderSync({
    includePaths: [path.join(__dirname, '../client/modules'), path.join(__dirname, '../client/styles'), path.join(__dirname, '../client/bower_components/bootstrap-sass/assets/stylesheets'), path.join(__dirname, '../client/bower_components/Materialize/sass'), path.join(__dirname, '../client/bower_components/foundation/scss'), path.join(__dirname, '../client/bower_components/font-awesome/scss')],
    data: globalContents
  })
  fs.writeFileSync(__dirname + '/../client/styles/compiled/global.style.css', result.css)
  debug('end createGlobalStyle')
}
Register.prototype.createFrontend = function () {
  debug('started createFrontend')

  var self = this
  _.forEach(self.frontendFolders, function (r) {
    _.forEach(r.files, function (j) {
      switch (j.type) {
        case 'module':
          self.frontendFiles.module.push('/modules/' + r.name + '/' + j.orginal)
          self.frontendFilesFinal.js.unshift('/modules/' + r.name + '/' + j.orginal)
          self.frontendFilesAggregate.js.unshift(path.join(__dirname, '../client/modules/' + r.name + '/' + j.orginal))
          break
        case 'controller':
        case 'routes':
        case 'config':
        case 'service':
        case 'provider':
        case 'directive':
          self.frontendFiles.controller.push('/modules/' + r.name + '/' + j.orginal)
          self.frontendFilesFinal.js.push('/modules/' + r.name + '/' + j.orginal)
          self.frontendFilesAggregate.js.push(path.join(__dirname, '../client/modules/' + r.name + '/' + j.orginal))
          break
        case 'style':
          if (j.ext === 'css') {
            self.frontendFiles.style.css.push('/modules/' + r.name + '/' + j.orginal)
            self.frontendFilesFinal.css.push('/modules/' + r.name + '/' + j.orginal)
            self.frontendFilesAggregate.css.push(path.join(__dirname, '../client/modules/' + r.name + '/' + j.orginal))
          } else if (j.ext === 'scss' || j.ext === 'sass') {
            var scssContents = fs.readFileSync(__dirname + '/../client/modules/' + r.name + '/' + j.orginal, 'utf8')
            // PLACED includePaths: so that @import 'global-variables.styles.scss'; work properly
            var result = sass.renderSync({
              includePaths: [path.join(__dirname, '../client/modules'), path.join(__dirname, '../client/styles'), path.join(__dirname, '../client/bower_components/bootstrap-sass/assets/stylesheets'), path.join(__dirname, '../client/bower_components/Materialize/sass'), path.join(__dirname, '../client/bower_components/foundation/scss'), path.join(__dirname, '../client/bower_components/font-awesome/scss')],
              data: scssContents
            })
            fs.writeFileSync(__dirname + '/../client/styles/compiled/' + j.name + '.' + j.type + '.' + j.ext + '.css', result.css)
            if (j.ext === 'scss') {
              self.frontendFiles.style.scss.push({
                orginal: '/client/modules/' + r.name + '/' + j.orginal,
                compiled: '/client/styles/compiled/' + j.name + '.' + j.type + '.' + j.ext + '.css'
              })
            } else {
              self.frontendFiles.style.sass.push({
                orginal: '/client/modules/' + r.name + '/' + j.orginal,
                compiled: '/client/styles/compiled/' + j.name + '.' + j.type + '.' + j.ext + '.css'
              })
            }
            self.frontendFilesFinal.css.push('/styles/compiled/' + j.name + '.' + j.type + '.' + j.ext + '.css')
            self.frontendFilesAggregate.css.push(path.join(__dirname, '../client/styles/compiled/' + j.name + '.' + j.type + '.' + j.ext + '.css'))
          } else if (j.ext === 'less') {
            var lessContents = fs.readFileSync(__dirname + '/../client/modules/' + r.name + '/' + j.orginal, 'utf8')
            less.render(lessContents, function (err, result) {
              if (err) {
                console.log(chalk.red(err))
              }
              fs.writeFileSync(__dirname + '/../client/styles/compiled/' + j.name + '.' + j.type + '.' + j.ext + '.css', result.css)
              self.frontendFiles.style.less.push({
                orginal: '/client/modules/' + r.name + '/' + j.orginal,
                compiled: '/client/styles/compiled/' + j.name + '.' + j.type + '.' + j.ext + '.css'
              })
              self.frontendFilesFinal.css.push('/styles/compiled/' + j.name + '.' + j.type + '.' + j.ext + '.css')
              self.frontendFilesAggregate.css.push(path.join(__dirname, '../client/styles/compiled/' + j.name + '.' + j.type + '.' + j.ext + '.css'))
            })
          } else {
            console.log('Unknown Style', j)
          }
          break
        case 'json':
        case 'view':
        case 'spec':
          // console.log(j.type)
          break
        default:
          if (j.ext === 'js') {
            self.frontendFiles.else.push('/modules/' + r.name + '/' + j.orginal)
            self.frontendFilesFinal.js.push('/modules/' + r.name + '/' + j.orginal)
            self.frontendFilesAggregate.js.push(path.join(__dirname, '../client/modules/' + r.name + '/' + j.orginal))
          } else if (j.ext === 'css') {
            console.log('Did you name css wrong?', j)
          } else {
            console.log('Unknown', j)
          }
          break
      }
    })
  })
  self.frontendFilesFinal.js.unshift(/modules/ + self.mainFrontendFile)
  self.frontendFilesAggregate.js.unshift(path.join(__dirname, '../client/modules/' + self.mainFrontendFile))
  _.forEach(self.settings.assets.css, function (ms) {
    self.frontendFilesFinal.css.unshift(ms)
    self.frontendFilesAggregate.css.unshift(path.join(__dirname, '../client/' + ms))
  })
  _.forEach(self.settings.assets.js, function (ms) {
    self.frontendFilesFinal.js.unshift(ms)
    self.frontendFilesAggregate.js.unshift(path.join(__dirname, '../client/' + ms))
  })
  debug('end createFrontend')
}
Register.prototype.env = function () {
  debug('started env')

  var self = this
  if (process.env.NODE_ENV === 'test') {
    concat(self.frontendFilesAggregate.css, path.join(__dirname, '../client/styles/compiled/concat.css'), function (error) {
      if (error)console.log(error, 'concat')
    })
    concat(self.frontendFilesAggregate.js, path.join(__dirname, '../client/scripts/compiled/concat.js'), function (error) {
      if (error)console.log(error, 'concat')
    })
    self.settings.app.locals.frontendFilesFinal = {
      js: ['scripts/compiled/concat.js'],
      css: ['styles/compiled/concat.css']
    }
  } else if (process.env.NODE_ENV === 'production') {
    var uglifiedcss = uglifycss.processFiles(
      self.frontendFilesAggregate.css, {
        maxLineLen: 500
      }
    )
    fs.writeFile(path.join(__dirname, '../client/styles/compiled/concat.min.css'), uglifiedcss, function (err) {
      if (err) {
        console.log(err)
      } else {
        console.log('Script generated and saved:', 'concat.min.css')
      }
    })

    var uglifiedjs = uglify.minify(self.frontendFilesAggregate.js, {
      mangle: false
    })
    fs.writeFile(path.join(__dirname, '../client/scripts/compiled/concat.min.js'), uglifiedjs.code, function (err) {
      if (err) {
        console.log(err)
      } else {
        console.log('Script generated and saved:', 'concat.min.js')
      }
    })
    self.settings.app.locals.frontendFilesFinal = {
      js: ['scripts/compiled/concat.min.js'],
      css: ['styles/compiled/concat.min.css']
    }
  } else {
    self.app.locals.frontendFilesFinal = self.frontendFilesFinal
  }
  debug('end env')
}
