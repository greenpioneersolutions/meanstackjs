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
var _ = require('lodash')
// var babel = require('babel-core')
var chalk = require('chalk')
var concat = require('serial-concat-files')
var debug = require('debug')('meanstackjs:register')
var fs = require('fs')
var less = require('less')
var mongoose = require('mongoose')
var uglify = require('uglify-js')
var uglifycss = require('uglifycss')
var sass = require('node-sass')
var path = require('path')

function Register (opts, done) {
  var self = this

  self.environment = opts.environment
  self.mail = opts.mail
  self.app = opts.app
  self.settings = opts.settings
  self.middleware = opts.middleware
  self.dir = __dirname
  // Start Build Process
  // getFolderContents > Used to dynamically get all of the contents of all module folders.
  self.getFolderContents()
  // setupFrontendDirectories > Used to set up all directories need & to remove the previously compiled files.
  self.setupFrontendDirectories()
  // compileFrontendStylesScripts > Used to compile all of the info needed for styles & scripts to render later.
  self.compileFrontendStylesScripts()
  // compileBackendScripts > Used to compile all of the info need for all of the backend modules.
  self.compileBackendScripts()
  // transformBabel > Used to transform files to es6 - commented out till the next release.
  // self.transformBabel()
  // setupServerModels > Used to set up the mongoose modules.
  self.setupServerModels()
  // setupServerRoutes > Used to set up the module routes.
  self.setupServerRoutes()
  // renderFrontendFiles > Used to render all of the frontend files based on all the information from above.
  self.renderFrontendFiles()
  // updateFrontendCdn > Used to update the files based of if your using a cdn. We Support MAXCDN.
  self.updateFrontendCdn()
  // frontendFiles > Returns the files to send to the frontend
  return self.frontendFiles
}

Register.prototype.getFolderContents = function () {
  debug('started Info')
  var self = this
  self.transformFiles = []
  self.transformFolders = []
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
      })
      returnConfigs.push(obj)
    })
    return returnConfigs
  }
  var backendPath = path.resolve(self.dir, './modules')
  if (!fs.existsSync(backendPath)) {
    throw new Error(chalk.red('Critical Folder Missing:' + chalk.red.underline.bold('Expected Server Modules Directory ./server/modules/')))
  }
  var backendConfigs = expandModules(_.filter(fs.readdirSync(backendPath), function (n) {
    return !_.startsWith(n, '.')
  }), backendPath)
  var frontendPath = path.resolve(self.dir, '../client/modules')
  if (!fs.existsSync(frontendPath)) {
    throw new Error(chalk.red('Critical Folder Missing:' + chalk.red.underline.bold('Expected Server Modules Directory ./client/modules/')))
  }
  var frontendConfigs = _.filter(fs.readdirSync(frontendPath), function (n) {
    return !_.startsWith(n, '.')
  })
  var mainFrontendFile = ''
  frontendConfigs = expandModules.bind(self)(_.filter(frontendConfigs, function (n) {
    if (path.extname(n) !== '')mainFrontendFile = n
    return path.extname(n) === ''
  }), frontendPath)

  self.backendFolders = backendConfigs
  self.frontendFolders = frontendConfigs
  self.mainFrontendFile = mainFrontendFile
  debug('end Info')
}

Register.prototype.setupFrontendDirectories = function () {
  debug('started directories')

  var self = this
  function rmdirAsync (url) {
    if (fs.existsSync(url)) {
      fs.readdirSync(url).forEach(function (file, index) {
        var curPath = path.resolve(url + '/' + file)
        if (fs.lstatSync(curPath).isDirectory()) {
          //
        } else { // delete file
          fs.unlinkSync(curPath)
        }
      })
    // fs.rmdirSync(url)
    }
  }
  if (self.settings.babel.active) {
    debug('checking babel directories')
    console.log(chalk.red('Babel Currently Removed \n\n Will be Integrated later in 1.x'))
  // if (!fs.existsSync(self.dir + '/../client/' + self.settings.babel.folder + '/')) {
  //   fs.mkdirSync(self.dir + '/../client/' + self.settings.babel.folder + '/')
  // }
  // rmdirAsync(self.dir + '/../client/' + self.settings.babel.folder + '/')
  // if (!fs.existsSync(self.dir + '/' + self.settings.babel.folder + '/')) {
  //   fs.mkdirSync(self.dir + '/' + self.settings.babel.folder + '/')
  // } else {
  //   rmdirAsync(self.dir + '/' + self.settings.babel.folder + '/')
  // }
  // _.forEach(_.uniq(self.transformFolders), function (n) {
  //   if (!fs.existsSync(self.dir + '/' + self.settings.babel.folder + '/' + n + '/')) {
  //     fs.mkdirSync(self.dir + '/' + self.settings.babel.folder + '/' + n + '/')
  //   } else {
  //     rmdirAsync(self.dir + '/' + self.settings.babel.folder + '/' + n + '/')
  //   }
  // })
  }
  if (!fs.existsSync(self.dir + '/../client/scripts/')) {
    fs.mkdirSync(self.dir + '/../client/scripts/')
  }
  if (!fs.existsSync(self.dir + '/../client/styles/compiled/')) {
    fs.mkdirSync(self.dir + '/../client/styles/compiled/')
  }
  if (!fs.existsSync(self.dir + '/../client/scripts/compiled/')) {
    fs.mkdirSync(self.dir + '/../client/scripts/compiled/')
  }
  if (!fs.existsSync(self.dir + '/../client/uploads/')) {
    fs.mkdirSync(self.dir + '/../client/uploads/')
  }
  // DELETE ALL PREVIOUSLY COMPILED
  rmdirAsync(self.dir + '/../client/styles/compiled/')
  rmdirAsync(self.dir + '/../client/scripts/compiled/')
  debug('end directories')
}

Register.prototype.compileFrontendStylesScripts = function () {
  debug('started config')
  var self = this
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

  fs.writeFileSync(path.join(self.dir, '/../client/styles/global-configs.styles.scss'), '$ENV: "' + self.environment + '" !default;\n' + '$CDN: "' + self.settings.cdn + '" !default;\n')
  _.forEach(self.frontendFolders, function (r) {
    _.forEach(r.files, function (j) {
      // Use for Babel when the front end is implemented
      // var baseDirectory = './modules/'
      // if (j.ext === 'js' && self.settings.babel.active && j.type !== 'spec') {
      //   self.transformFiles.push('/' + r.name + '/' + j.orginal)
      //   self.transformFolders.push(r.name)
      //   baseDirectory = './' + self.settings.babel.folder + '/'
      // }
      switch (j.type) {
        case 'module':
          self.frontendFiles.module.push('/modules/' + r.name + '/' + j.orginal)
          self.frontendFilesFinal.js.unshift('/modules/' + r.name + '/' + j.orginal)
          self.frontendFilesAggregate.js.unshift(path.join(self.dir, '../client/modules/' + r.name + '/' + j.orginal))
          break
        case 'controller':
        case 'routes':
        case 'config':
        case 'service':
        case 'provider':
        case 'directive':
          self.frontendFiles.controller.push('/modules/' + r.name + '/' + j.orginal)
          self.frontendFilesFinal.js.push('/modules/' + r.name + '/' + j.orginal)
          self.frontendFilesAggregate.js.push(path.join(self.dir, '../client/modules/' + r.name + '/' + j.orginal))
          break
        case 'style':
          if (j.ext === 'css') {
            self.frontendFiles.style.css.push('/modules/' + r.name + '/' + j.orginal)
            self.frontendFilesFinal.css.push('/modules/' + r.name + '/' + j.orginal)
            self.frontendFilesAggregate.css.push(path.join(self.dir, '../client/modules/' + r.name + '/' + j.orginal))
          } else if (j.ext === 'scss' || j.ext === 'sass') {
            var scssContents = fs.readFileSync(path.join(self.dir, '/../client/modules/' + r.name + '/' + j.orginal), 'utf8')
            // PLACED includePaths: so that @import 'global-variables.styles.scss'; work properly
            var result = sass.renderSync({
              includePaths: [path.join(self.dir, '../client/modules'), path.join(self.dir, '../client/styles'), path.join(self.dir, '../client/bower_components/bootstrap-sass/assets/stylesheets'), path.join(self.dir, '../client/bower_components/Materialize/sass'), path.join(self.dir, '../client/bower_components/foundation/scss'), path.join(self.dir, '../client/bower_components/font-awesome/scss')],
              data: scssContents
            })
            fs.writeFileSync(path.join(self.dir, '/../client/styles/compiled/' + j.name + '.' + j.type + '.' + j.ext + '.css'), result.css)
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
            self.frontendFilesAggregate.css.push(path.join(self.dir, '../client/styles/compiled/' + j.name + '.' + j.type + '.' + j.ext + '.css'))
          } else if (j.ext === 'less') {
            var lessContents = fs.readFileSync(path.join(self.dir, '/../client/modules/' + r.name + '/' + j.orginal), 'utf8')
            less.render(lessContents, function (err, result) {
              if (err) {
                debug(chalk.red(err))
              }
              fs.writeFileSync(path.join(self.dir, '/../client/styles/compiled/' + j.name + '.' + j.type + '.' + j.ext + '.css'), result.css)
              self.frontendFiles.style.less.push({
                orginal: '/client/modules/' + r.name + '/' + j.orginal,
                compiled: '/client/styles/compiled/' + j.name + '.' + j.type + '.' + j.ext + '.css'
              })
              self.frontendFilesFinal.css.push('/styles/compiled/' + j.name + '.' + j.type + '.' + j.ext + '.css')
              self.frontendFilesAggregate.css.push(path.join(self.dir, '../client/styles/compiled/' + j.name + '.' + j.type + '.' + j.ext + '.css'))
            })
          } else {
            debug('Unknown Style', j)
          }
          break
        case 'json':
        case 'view':
        case 'spec':
          // debug(j.type)
          break
        default:
          if (j.ext === 'js') {
            self.frontendFiles.else.push('/modules/' + r.name + '/' + j.orginal)
            self.frontendFilesFinal.js.push('/modules/' + r.name + '/' + j.orginal)
            self.frontendFilesAggregate.js.push(path.join(self.dir, '../client/modules/' + r.name + '/' + j.orginal))
          } else if (j.ext === 'css') {
            debug('Did you name css wrong?', j)
          } else {
            debug('Unknown', j)
          }
          break
      }
    })
  })
  debug('end config')
}
Register.prototype.compileBackendScripts = function () {
  debug('started compileBackendScripts')

  var self = this
  self.backendFiles = {
    'model': [],
    'controllers': [],
    'routes': []
  }
  _.forEach(self.backendFolders, function (r) {
    _.forEach(r.files, function (j) {
      var baseDirectory = './modules/'
      // if (j.ext === 'js' && self.settings.babel.active && j.type !== 'spec') {
      //   self.transformFiles.push('/' + r.name + '/' + j.orginal)
      //   self.transformFolders.push(r.name)
      //   baseDirectory = './' + self.settings.babel.folder + '/'
      // }
      if (j.type === 'controller') {
        self.backendFiles.controllers.push({name: r.name, url: baseDirectory + r.name + '/' + j.orginal})
      } else if (j.type === 'model') {
        self.backendFiles.model.push({name: j.name, url: baseDirectory + r.name + '/' + j.orginal})
      } else if (j.type === 'routes') {
        self.backendFiles.routes.push({name: r.name, url: baseDirectory + r.name + '/' + j.orginal})
      } else {
        // debug(j.type)
      }
    })
  })
  debug('end compileBackendScripts')
}
Register.prototype.setupServerModels = function () {
  debug('started createBackendModels')
  var self = this
  _.forEach(self.backendFiles.model, function (n) {
    debug('Model: %s - %s', n.name, n.url)
    var model = mongoose.model(n.name, require(n.url))
    model.on('index', function (err) {
      if (err) throw err
    })
  })
  debug('end createBackendModels')
}
Register.prototype.setupServerRoutes = function () {
  debug('started createBackendRoutes')
  var self = this

  _.forEach(self.backendFiles.routes, function (n) {
    debug('Route : %s', n.url)
    require(n.url)(self.app, self.middleware, self.mail, self.settings)
  })
  debug('end createBackendRoutes')
}
Register.prototype.transformBabel = function () {
  debug('babel:' + self.settings.babel.active)
  var self = this

// if (self.settings.babel.active) {
//   debug('started transform')
//   _.forEach(self.transformFiles, function (n) {
//     fs.writeFileSync(self.dir + '/' + self.settings.babel.folder + n, babel.transformFileSync(self.dir + '/modules/' + n, self.settings.babel.options).code)
//   })
//   debug('end transform')
// }
}
Register.prototype.renderFrontendFiles = function () {
  debug('started createGlobalStyle')
  var self = this

  var globalContents = fs.readFileSync(self.dir + '/../client/styles/global.style.scss', 'utf8')
  var result = sass.renderSync({
    includePaths: [path.join(self.dir, '../client/modules'), path.join(self.dir, '../client/styles'), path.join(self.dir, '../client/bower_components/bootstrap-sass/assets/stylesheets'), path.join(self.dir, '../client/bower_components/Materialize/sass'), path.join(self.dir, '../client/bower_components/foundation/scss'), path.join(self.dir, '../client/bower_components/font-awesome/scss')],
    data: globalContents
  })
  fs.writeFileSync(self.dir + '/../client/styles/compiled/global.style.css', result.css)
  debug('end createGlobalStyle')

  debug('started createFrontend')
  self.frontendFilesFinal.js.unshift(/modules/ + self.mainFrontendFile)
  self.frontendFilesAggregate.js.unshift(path.join(self.dir, '../client/modules/' + self.mainFrontendFile))
  _.forEach(self.settings.assets.css, function (ms) {
    self.frontendFilesFinal.css.unshift(ms)
    self.frontendFilesAggregate.css.unshift(path.join(self.dir, '../client/' + ms))
  })
  _.forEach(self.settings.assets.js, function (ms) {
    self.frontendFilesFinal.js.unshift(ms)
    self.frontendFilesAggregate.js.unshift(path.join(self.dir, '../client/' + ms))
  })
  debug('end createFrontend')

  debug('started env')
  if (self.environment === 'test') {
    concat(self.frontendFilesAggregate.css, path.join(self.dir, '../client/styles/compiled/concat.css'), function (error) {
      if (error)debug(error, 'concat')
    })
    concat(self.frontendFilesAggregate.js, path.join(self.dir, '../client/scripts/compiled/concat.js'), function (error) {
      if (error)debug(error, 'concat')
    })
    self.app.locals.frontendFilesFinal = {
      js: ['scripts/compiled/concat.js'],
      css: ['styles/compiled/concat.css']
    }
  } else if (self.environment === 'production') {
    var uglifiedcss = uglifycss.processFiles(
      self.frontendFilesAggregate.css, {
        maxLineLen: 500
      }
    )
    fs.writeFile(path.join(self.dir, '../client/styles/compiled/concat.min.css'), uglifiedcss, function (err) {
      if (err) {
        debug(err)
      } else {
        debug('Script generated and saved:', 'concat.min.css')
      }
    })

    var uglifiedjs = uglify.minify(self.frontendFilesAggregate.js, {
      mangle: false
    })
    fs.writeFile(path.join(self.dir, '../client/scripts/compiled/concat.min.js'), uglifiedjs.code, function (err) {
      if (err) {
        debug(err)
      } else {
        debug('Script generated and saved:', 'concat.min.js')
      }
    })
    self.app.locals.frontendFilesFinal = {
      js: ['scripts/compiled/concat.min.js'],
      css: ['styles/compiled/concat.min.css']
    }
  } else {
    self.app.locals.frontendFilesFinal = self.frontendFilesFinal
  }
  debug('end env')
}
Register.prototype.updateFrontendCdn = function () {
  debug('started cdn')
  var self = this

  if (self.settings.cdn) {
    var FilesFinal = {
      js: [],
      css: []
    }
    _.forEach(self.app.locals.frontendFilesFinal, function (type, typeKey) {
      _.forEach(type, function (n) {
        FilesFinal[typeKey].push(self.settings.cdn + n)
      })
    })

    self.app.locals.frontendFilesFinal = FilesFinal
  }
  debug('end cdn')
}
