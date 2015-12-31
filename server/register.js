// NEED TO REFACTOR AND REFINE
// want to add async down the road
// var async = require('async')

/**
 * Init
 * Frontend & Backend : Look up  modules locations and gather all the files in them
 * Frontend & Backend : Filter out all file starting with .   ex .DS_store .Git Ignore
 * Frontend & Backend : Create obj with all relative information on each file
 * Function ALL
 * Backend : For each file register all models and routes. not controllers because routes call controllers
 * Frontend : init variable to keep track of files and info
 * Frontend : CHECK AND MAKE DIRECTORY - Check and make directory
 * Frontend : Delete all previously compiled
 * Frontend : Render the global style
 * Frontend : Push all frontend files
 * Frontend : Set Files to be rendered based on the env
 * return frontendFiles
 */

var path = require('path')
var _ = require('lodash')
var fs = require('fs')
var chalk = require('chalk')
var sass = require('node-sass')
var less = require('less')
var uglify = require('uglify-js')
var concat = require('concat')
var uglifycss = require('uglifycss')
/**
 * BACKEND
 */
var lookDir = path.resolve(__dirname, './modules')
var configs = []
if (!fs.existsSync(lookDir)) {
  throw new Error(chalk.red('Critical Folder Missing:' + chalk.red.underline.bold('Expected Server Modules Directory ./server/modules/')))
}
var data = {}
var modules = fs.readdirSync(lookDir)

// IF YOU NEED TO FILTER ANY FILES OUT
modules = _.filter(modules, function (n) {
  return !_.startsWith(n, '.')
})

data.modules = modules
_.forEach(data.modules, function (value, key) {
  var obj = {
    'name': value,
    'lookup': lookDir + '/' + value
  }
  var files = fs.readdirSync(lookDir + '/' + value)

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
  configs.push(obj)
})

/**
 * FRONTEND
 */
var frontEndDir = path.resolve(__dirname, '../client/modules')
var frontEndConfigs = []
if (!fs.existsSync(frontEndDir)) {
  throw new Error(chalk.red('Critical Folder Missing:' + chalk.red.underline.bold('Expected Client Modules Directory ./client/modules/')))
}
var frontEnddata = {}
var frontEndmodules = fs.readdirSync(frontEndDir)

// IF YOU NEED TO FILTER ANY FILES OUT
frontEndmodules = _.filter(frontEndmodules, function (n) {
  return !_.startsWith(n, '.')
})
var mainFrontendFile = ''
frontEndmodules = _.filter(frontEndmodules, function (n) {
  if (path.extname(n) !== '')mainFrontendFile = n
  return path.extname(n) === ''
})

frontEnddata.modules = frontEndmodules
_.forEach(frontEnddata.modules, function (value, key) {
  var obj = {
    'name': value,
    'lookup': frontEndDir + '/' + value
  }
  var files = fs.readdirSync(frontEndDir + '/' + value)
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
  frontEndConfigs.push(obj)
})
function all (setup) {
  var settings = setup()
  /**
   * BACKEND
   */
  _.forEach(settings.configs, function (r) {
    var files = {
      'models': [],
      'controllers': []
    }
    _.forEach(r.files, function (j) {
      if (j.type === 'controller') {
        // files.controllers.push(require('./modules/' + r.name + '/' + j.orginal))
      } else if (j.type === 'model') {
        files.models.push(require('./modules/' + r.name + '/' + j.orginal))
      } else if (j.type === 'routes') {
        settings.app.use('/api/', require('./modules/' + r.name + '/' + j.orginal))
      } else {
        // console.log(j.type)
      }
    })
  })

  /**
   * FRONTEND
   */
  var frontendFiles = {
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
  var frontendFilesFinal = {
    css: [],
    js: []
  }
  var frontendFilesAggregate = {
    css: [],
    js: []
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
  // RENDER THE GLOBAL STYLE
  var globalContents = fs.readFileSync(__dirname + '/../client/styles/global.style.scss', 'utf8')
  var result = sass.renderSync({
    includePaths: [path.join(__dirname, '../client/modules'), path.join(__dirname, '../client/styles'), path.join(__dirname, '../client/bower_components/bootstrap-sass/assets/stylesheets'), path.join(__dirname, '../client/bower_components/Materialize/sass'), path.join(__dirname, '../client/bower_components/foundation/scss')],
    data: globalContents
  })
  fs.writeFileSync(__dirname + '/../client/styles/compiled/global.style.css', result.css)

  // PUSH ALL FRONTEND FILES
  _.forEach(settings.frontEndConfigs, function (r) {
    _.forEach(r.files, function (j) {
      switch (j.type) {
        case 'module':
          frontendFiles.module.push('/modules/' + r.name + '/' + j.orginal)
          frontendFilesFinal.js.unshift('/modules/' + r.name + '/' + j.orginal)
          frontendFilesAggregate.js.unshift(path.join(__dirname, '../client/modules/' + r.name + '/' + j.orginal))
          break
        case 'controller':
        case 'routes':
        case 'config':
        case 'service':
        case 'provider':
        case 'directive':
          frontendFiles.controller.push('/modules/' + r.name + '/' + j.orginal)
          frontendFilesFinal.js.push('/modules/' + r.name + '/' + j.orginal)
          frontendFilesAggregate.js.push(path.join(__dirname, '../client/modules/' + r.name + '/' + j.orginal))
          break
        case 'style':
          if (j.ext === 'css') {
            frontendFiles.style.css.push('/modules/' + r.name + '/' + j.orginal)
            frontendFilesFinal.css.push('/modules/' + r.name + '/' + j.orginal)
            frontendFilesAggregate.css.push(path.join(__dirname, '../client/modules/' + r.name + '/' + j.orginal))
          } else if (j.ext === 'scss' || j.ext === 'sass') {
            var scssContents = fs.readFileSync(__dirname + '/../client/modules/' + r.name + '/' + j.orginal, 'utf8')
            // PLACED includePaths: so that @import 'global-variables.styles.scss'; work properly
            var result = sass.renderSync({
              includePaths: [path.join(__dirname, '../client/modules'), path.join(__dirname, '../client/styles'), path.join(__dirname, '../client/bower_components/bootstrap-sass/assets/stylesheets'), path.join(__dirname, '../client/bower_components/Materialize/sass'), path.join(__dirname, '../client/bower_components/foundation/scss')],
              data: scssContents
            })
            fs.writeFileSync(__dirname + '/../client/styles/compiled/' + j.name + '.' + j.type + '.' + j.ext + '.css', result.css)
            if (j.ext === 'scss') {
              frontendFiles.style.scss.push({
                orginal: '/client/modules/' + r.name + '/' + j.orginal,
                compiled: '/client/styles/compiled/' + j.name + '.' + j.type + '.' + j.ext + '.css'
              })
            } else {
              frontendFiles.style.sass.push({
                orginal: '/client/modules/' + r.name + '/' + j.orginal,
                compiled: '/client/styles/compiled/' + j.name + '.' + j.type + '.' + j.ext + '.css'
              })
            }
            frontendFilesFinal.css.push('/styles/compiled/' + j.name + '.' + j.type + '.' + j.ext + '.css')
            frontendFilesAggregate.css.push(path.join(__dirname, '../client/styles/compiled/' + j.name + '.' + j.type + '.' + j.ext + '.css'))
          } else if (j.ext === 'less') {
            var lessContents = fs.readFileSync(__dirname + '/../client/modules/' + r.name + '/' + j.orginal, 'utf8')
            less.render(lessContents, function (err, result) {
              if (err) {
                console.log(chalk.red(err))
              }
              fs.writeFileSync(__dirname + '/../client/styles/compiled/' + j.name + '.' + j.type + '.' + j.ext + '.css', result.css)
              frontendFiles.style.less.push({
                orginal: '/client/modules/' + r.name + '/' + j.orginal,
                compiled: '/client/styles/compiled/' + j.name + '.' + j.type + '.' + j.ext + '.css'
              })
              frontendFilesFinal.css.push('/styles/compiled/' + j.name + '.' + j.type + '.' + j.ext + '.css')
              frontendFilesAggregate.css.push(path.join(__dirname, '../client/styles/compiled/' + j.name + '.' + j.type + '.' + j.ext + '.css'))
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
            frontendFiles.else.push('/modules/' + r.name + '/' + j.orginal)
            frontendFilesFinal.js.push('/modules/' + r.name + '/' + j.orginal)
            frontendFilesAggregate.js.push(path.join(__dirname, '../client/modules/' + r.name + '/' + j.orginal))
          } else if (j.ext === 'css') {
            console.log('Did you name css wrong?', j)
          } else {
            console.log('Unknown', j)
          }
          break
      }
    })
  })
  frontendFilesFinal.js.unshift(/modules/ + mainFrontendFile)
  frontendFilesAggregate.js.unshift(path.join(__dirname, '../client/modules/' + mainFrontendFile))
  _.forEach(settings.meanSettings.assets.css, function (ms) {
    frontendFilesFinal.css.unshift(ms)
    frontendFilesAggregate.css.unshift(path.join(__dirname, '../client/' + ms))
  })
  _.forEach(settings.meanSettings.assets.js, function (ms) {
    frontendFilesFinal.js.unshift(ms)
    frontendFilesAggregate.js.unshift(path.join(__dirname, '../client/' + ms))
  })

  // SET FILES TO BE RENDERED BASED OF THE ENV
  if (process.env.NODE_ENV === 'test') {
    concat(frontendFilesAggregate.css, path.join(__dirname, '../client/styles/compiled/concat.css'), function (error) {
      if (error)console.log(error, 'concat')
    })
    concat(frontendFilesAggregate.js, path.join(__dirname, '../client/scripts/compiled/concat.js'), function (error) {
      if (error)console.log(error, 'concat')
    })
    settings.app.locals.frontendFilesFinal = {
      js: ['scripts/compiled/concat.js'],
      css: ['styles/compiled/concat.css']
    }
  } else if (process.env.NODE_ENV === 'production') {
    var uglifiedcss = uglifycss.processFiles(
      frontendFilesAggregate.css,
      { maxLineLen: 500 }
    )
    fs.writeFile(path.join(__dirname, '../client/styles/compiled/concat.min.css'), uglifiedcss.code, function (err) {
      if (err) {
        console.log(err)
      } else {
        console.log('Script generated and saved:', 'concat.min.css')
      }
    })

    var uglifiedjs = uglify.minify(frontendFilesAggregate.js)
    fs.writeFile(path.join(__dirname, '../client/scripts/compiled/concat.min.js'), uglifiedjs.code, function (err) {
      if (err) {
        console.log(err)
      } else {
        console.log('Script generated and saved:', 'concat.min.js')
      }
    })
    settings.app.locals.frontendFilesFinal = {
      js: ['scripts/compiled/concat.min.js'],
      css: ['styles/compiled/concat.min.css']
    }
  } else {
    settings.app.locals.frontendFilesFinal = frontendFilesFinal
  }
  return frontendFiles
}
function Register (app) {
  this.configs = configs
  this.frontEndConfigs = frontEndConfigs
  this.app = app
}
Register.prototype.all = function (meanSettings) {
  function setup () {
    return {
      configs: this.configs,
      frontEndConfigs: this.frontEndConfigs,
      app: this.app,
      meanSettings: meanSettings
    }
  }
  return all(setup.bind(this))
}

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
function register (options) {
  if (options === undefined) {
    return new Register()
  } else {
    return new Register(options)
  }
}
module.exports = register
