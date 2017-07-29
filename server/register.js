module.exports.info = build

var _ = require('lodash')
// var babel = require('babel-core')
var chalksay = require('chalksay')
var concat = require('serial-concat-files')
var debug = require('debug')('meanstackjs:register')
var fs = require('fs')
var less = require('less')
var uglify = require('uglify-js')
var uglifycss = require('uglifycss')
var sass = require('node-sass')
var path = require('path')
var pathExists = require('is-there')
var dir = __dirname
var validator = require('validator')
var request = require('request')

function Register (self, done) {
  // Start Build Process
  // getDownloadContents > Used to dynamically get all of the content in the assets that are not on this server.
  this.getDownloadContents(self)
  // getFolderContents > Used to dynamically get all of the contents of all module folders.
  this.getFolderContents(self)
  // setupFrontendDirectories > Used to set up all directories need & to remove the previously compiled files.
  this.setupFrontendDirectories(self)
  // compileFrontendStylesScripts > Used to compile all of the info needed for styles & scripts to render later.
  this.compileFrontendStylesScripts(self)
  // compileBackendScripts > Used to compile all of the info need for all of the backend modules.
  this.compileBackendScripts(self)
  // transformBabel > Used to transform files to es6 - commented out till the next release.
  // self.transformBabel()
  // renderFrontendFiles > Used to render all of the frontend files based on all the information from above.
  this.renderFrontendFiles(self)
  // updateFrontendCdn > Used to update the files based of if your using a cdn. We Support MAXCDN.
  this.updateFrontendCdn(self)
  // frontendFiles > Returns the files to send to the frontend
  return self.frontendFiles
}

Register.prototype.getDownloadContents = function (self) {
  debug('started getDownloadContents')
  self.settings.assets.css.forEach(function (ms) {
    if (validator.isURL(ms)) {
      request({url: ms}, function (error, response, body) {
        if (error) self.logger.warn('Error Downloading Content', error)
        fs.writeFileSync(path.join(dir, '../client/styles/downloaded/' + path.basename(ms)), body)
      })
    }
  })
  self.settings.assets.js.forEach(function (ms) {
    if (validator.isURL(ms)) {
      request({url: ms}, function (error, response, body) {
        if (error) self.logger.warn('Error Downloading Content', error)
        fs.writeFileSync(path.join(dir, '../client/scripts/downloaded/' + path.basename(ms)), body)
      })
    }
  })
  debug('end getDownloadContents')
}
Register.prototype.getFolderContents = function (self) {
  debug('started Info')

  // var self = this
  self.transformFiles = []
  self.transformFolders = []

  function expandModules (arr, dir) {
    var returnConfigs = []
    arr.forEach(function (value, key) {
      var obj = {
        'name': value,
        'lookup': dir + '/' + value
      }
      var files = fs.readdirSync(dir + '/' + value)
      files = _.filter(files, function (n) {
        return !_.startsWith(n, '.')
      })
      obj.files = []
      files.forEach(function (f) {
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

  var backendPath = path.resolve(dir, './modules')

  if (!pathExists(backendPath)) {
    throw new Error('Critical Folder Missing:Expected Server Modules Directory ./server/modules/')
  }

  var backendConfigs = expandModules(_.filter(fs.readdirSync(backendPath), function (n) {
    return !_.startsWith(n, '.')
  }), backendPath)

  var frontendPath = path.resolve(dir, '../client/modules')
  if (!pathExists(frontendPath)) {
    throw new Error('Critical Folder Missing:Expected Server Modules Directory ./client/modules/')
  }

  var frontendConfigs = _.filter(fs.readdirSync(frontendPath), function (n) {
    return !_.startsWith(n, '.')
  })

  var mainFrontendFile = ''
  frontendConfigs = expandModules.bind(self)(_.filter(frontendConfigs, function (n) {
    if (path.extname(n) !== '') mainFrontendFile = n
    return path.extname(n) === ''
  }), frontendPath)

  self.backendFolders = backendConfigs
  self.frontendFolders = frontendConfigs
  self.mainFrontendFile = mainFrontendFile
  debug('end Info')
}

Register.prototype.setupFrontendDirectories = function (self) {
  debug('started directories')

  // var self = this
  function rmdirSync (url) {
    if (pathExists(url)) {
      fs.readdirSync(url).forEach(function (file, index) {
        var curPath = path.resolve(url + '/' + file)
        if (fs.lstatSync(curPath).isDirectory()) {
          // do nothing
        } else {
          // delete file
          fs.unlinkSync(curPath)
        }
      })
    // fs.rmdirSync(url)
    }
  }

  if (self.settings.babel.active) {
    debug('checking babel directories')
    chalksay.red('Babel Currently Removed \n\n Will be Integrated later in 1.x')
  // if (!pathExists(dir + '/../client/' + self.settings.babel.folder + '/')) {
  //   fs.mkdirSync(dir + '/../client/' + self.settings.babel.folder + '/')
  // }
  // rmdirSync(dir + '/../client/' + self.settings.babel.folder + '/')
  // if (!pathExists(dir + '/' + self.settings.babel.folder + '/')) {
  //   fs.mkdirSync(dir + '/' + self.settings.babel.folder + '/')
  // } else {
  //   rmdirSync(dir + '/' + self.settings.babel.folder + '/')
  // }
  // forEach(_.uniq(self.transformFolders), function (n) {
  //   if (!pathExists(dir + '/' + self.settings.babel.folder + '/' + n + '/')) {
  //     fs.mkdirSync(dir + '/' + self.settings.babel.folder + '/' + n + '/')
  //   } else {
  //     rmdirSync(dir + '/' + self.settings.babel.folder + '/' + n + '/')
  //   }
  // })
  }

  if (!pathExists(dir + '/../client/scripts/')) {
    fs.mkdirSync(dir + '/../client/scripts/')
  }
  if (!pathExists(dir + '/../client/styles/compiled/')) {
    fs.mkdirSync(dir + '/../client/styles/compiled/')
  }
  if (!pathExists(dir + '/../client/styles/downloaded/')) {
    fs.mkdirSync(dir + '/../client/styles/downloaded/')
  }
  if (!pathExists(dir + '/../client/scripts/compiled/')) {
    fs.mkdirSync(dir + '/../client/scripts/compiled/')
  }
  if (!pathExists(dir + '/../client/scripts/downloaded/')) {
    fs.mkdirSync(dir + '/../client/scripts/downloaded/')
  }
  if (!pathExists(dir + '/../client/uploads/')) {
    fs.mkdirSync(dir + '/../client/uploads/')
  }

  // DELETE ALL PREVIOUSLY COMPILED
  rmdirSync(dir + '/../client/styles/compiled/')
  rmdirSync(dir + '/../client/scripts/compiled/')
  debug('end directories')
}

Register.prototype.compileFrontendStylesScripts = function (self) {
  debug('started config')

  // var self = this

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

  fs.writeFileSync(
    path.join(dir, '/../client/styles/global-configs.styles.scss'),
    '$ENV: "' + self.environment + '" !default;\n' + '$CDN: "' + self.settings.cdn + '" !default;\n'
  )

  self.frontendFolders.forEach(function (r) {
    r.files.forEach(function (j) {
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
          self.frontendFilesAggregate.js.unshift(path.join(dir, '../client/modules/' + r.name + '/' + j.orginal))
          break
        case 'controller':
        case 'routes':
        case 'config':
        case 'service':
        case 'provider':
        case 'directive':
          self.frontendFiles.controller.push('/modules/' + r.name + '/' + j.orginal)
          self.frontendFilesFinal.js.push('/modules/' + r.name + '/' + j.orginal)
          self.frontendFilesAggregate.js.push(path.join(dir, '../client/modules/' + r.name + '/' + j.orginal))
          break
        case 'style':
          if (j.ext === 'css') {
            self.frontendFiles.style.css.push('/modules/' + r.name + '/' + j.orginal)
            self.frontendFilesFinal.css.push('/modules/' + r.name + '/' + j.orginal)
            self.frontendFilesAggregate.css.push(path.join(dir, '../client/modules/' + r.name + '/' + j.orginal))
          } else if (j.ext === 'scss' || j.ext === 'sass') {
            var scssContents = fs.readFileSync(path.join(dir, '/../client/modules/' + r.name + '/' + j.orginal), 'utf8')
            // PLACED includePaths: so that @import 'global-variables.styles.scss'; work properly
            var result = sass.renderSync({
              includePaths: [path.join(dir, '../client/modules'), path.join(dir, '../client/styles'), path.join(dir, '../client/bower_components/bootstrap-sass/assets/stylesheets'), path.join(dir, '../client/bower_components/Materialize/sass'), path.join(dir, '../client/bower_components/foundation/scss'), path.join(dir, '../client/bower_components/font-awesome/scss')],
              data: scssContents
            })
            fs.writeFileSync(path.join(dir, '/../client/styles/compiled/' + j.name + '.' + j.type + '.' + j.ext + '.css'), result.css)
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
            self.frontendFilesAggregate.css.push(path.join(dir, '../client/styles/compiled/' + j.name + '.' + j.type + '.' + j.ext + '.css'))
          } else if (j.ext === 'less') {
            var lessContents = fs.readFileSync(path.join(dir, '/../client/modules/' + r.name + '/' + j.orginal), 'utf8')
            less.render(lessContents, function (error, result) {
              if (error) {
                debug(error)
              }
              fs.writeFileSync(path.join(dir, '/../client/styles/compiled/' + j.name + '.' + j.type + '.' + j.ext + '.css'), result.css)
              self.frontendFiles.style.less.push({
                orginal: '/client/modules/' + r.name + '/' + j.orginal,
                compiled: '/client/styles/compiled/' + j.name + '.' + j.type + '.' + j.ext + '.css'
              })
              self.frontendFilesFinal.css.push('/styles/compiled/' + j.name + '.' + j.type + '.' + j.ext + '.css')
              self.frontendFilesAggregate.css.push(path.join(dir, '../client/styles/compiled/' + j.name + '.' + j.type + '.' + j.ext + '.css'))
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
            self.frontendFilesAggregate.js.push(path.join(dir, '../client/modules/' + r.name + '/' + j.orginal))
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

Register.prototype.compileBackendScripts = function (self) {
  debug('started compileBackendScripts')

  // var self = this
  self.backendFiles = {
    'model': [],
    'controllers': [],
    'routes': []
  }
  self.backendFolders.forEach(function (r) {
    r.files.forEach(function (j) {
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

Register.prototype.transformBabel = function (self) {
  debug('babel:' + self.settings.babel.active)
  // var self = this

// if (self.settings.babel.active) {
//   debug('started transform')
//   forEach(self.transformFiles, function (n) {
//     fs.writeFileSync(dir + '/' + self.settings.babel.folder + n, babel.transformFileSync(dir + '/modules/' + n, self.settings.babel.options).code)
//   })
//   debug('end transform')
// }
}

Register.prototype.renderFrontendFiles = function (self) {
  debug('started createGlobalStyle')
  // var self = this

  var globalContents = fs.readFileSync(dir + '/../client/styles/global.style.scss', 'utf8')
  var result = sass.renderSync({
    includePaths: [
      path.join(dir, '../client/modules'),
      path.join(dir, '../client/styles'),
      path.join(dir, '../client/bower_components/bootstrap-sass/assets/stylesheets'),
      path.join(dir, '../client/bower_components/Materialize/sass'),
      path.join(dir, '../client/bower_components/foundation/scss'),
      path.join(dir, '../client/bower_components/font-awesome/scss')
    ],
    data: globalContents
  })

  fs.writeFileSync(dir + '/../client/styles/compiled/global.style.css', result.css)
  debug('end createGlobalStyle')

  debug('started createFrontend')
  self.frontendFilesFinal.js.unshift(/modules/ + self.mainFrontendFile)
  self.frontendFilesAggregate.js.unshift(path.join(dir, '../client/modules/' + self.mainFrontendFile))

  self.settings.assets.css.forEach(function (ms) {
    self.frontendFilesFinal.css.unshift(ms)
    if (validator.isURL(ms)) {
      fs.access(path.join(dir, '../client/styles/downloaded/' + path.basename(ms)), fs.constants.R_OK | fs.constants.W_OK, function (error) {
        if (error) {
          chalksay.red('Please Restart your system')
          chalksay.red('The system is still downloading \n')
          chalksay.red('source:' + ms)
          chalksay.green('destination:' + path.join(dir, '../client/styles/downloaded/' + path.basename(ms)))
        }
      })
      self.frontendFilesAggregate.css.unshift(path.join(dir, '../client/styles/downloaded/' + path.basename(ms)))
    } else {
      self.frontendFilesAggregate.css.unshift(path.join(dir, '../client/' + ms))
    }
  })

  self.settings.assets.js.forEach(function (ms) {
    self.frontendFilesFinal.js.unshift(ms)
    if (validator.isURL(ms)) {
      fs.access(path.join(dir, '../client/scripts/downloaded/' + path.basename(ms)), fs.constants.R_OK | fs.constants.W_OK, function (error) {
        if (error) {
          chalksay.red('Please Restart your system')
          chalksay.red('The system is still downloading\n')
          chalksay.red('source:' + ms)
          chalksay.green('destination:' + path.join(dir, '../client/scripts/downloaded/' + path.basename(ms)))
        }
      })
      self.frontendFilesAggregate.js.unshift(path.join(dir, '../client/scripts/downloaded/' + path.basename(ms)))
    } else {
      self.frontendFilesAggregate.js.unshift(path.join(dir, '../client/' + ms))
    }
  })
  debug('end createFrontend')

  debug('started env')
  if (self.settings.minify === 'concat') {
    concat(self.frontendFilesAggregate.css, path.join(dir, '../client/styles/compiled/concat.css'), function (error) {
      if (error)debug(error, 'concat')
    })
    concat(self.frontendFilesAggregate.js, path.join(dir, '../client/scripts/compiled/concat.js'), function (error) {
      if (error)debug(error, 'concat')
    })
    self.app.locals.frontendFilesFinal = {
      js: ['scripts/compiled/concat.js'],
      css: ['styles/compiled/concat.css']
    }
  } else if (self.settings.minify === 'minify') {
    var uglifiedcss = uglifycss.processFiles(
      self.frontendFilesAggregate.css, {
        maxLineLen: 500
      }
    )
    fs.writeFile(path.join(dir, '../client/styles/compiled/concat.min.css'), uglifiedcss, function (error) {
      if (error) {
        debug(error)
      } else {
        debug('Script generated and saved:', 'concat.min.css')
      }
    })
    var uglifiedjs = uglify.minify(self.frontendFilesAggregate.js, {
      mangle: false
    })
    fs.writeFile(path.join(dir, '../client/scripts/compiled/concat.min.js'), uglifiedjs.code, function (error) {
      if (error) {
        debug(error)
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

Register.prototype.updateFrontendCdn = function (self) {
  debug('started cdn')

  if (self.settings.cdn) {
    var FilesFinal = {
      js: [],
      css: []
    }
    self.app.locals.frontendFilesFinal.forEach(function (type, typeKey) {
      type.forEach(function (n) {
        FilesFinal[typeKey].push(self.settings.cdn + n)
      })
    })

    self.app.locals.frontendFilesFinal = FilesFinal
  }
  debug('end cdn')
}

function build (options) {
  return new Register(options)
}
