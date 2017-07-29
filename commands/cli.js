#!/usr/bin/env node

'use strict'
var inquirer = require('inquirer')
var chalksay = require('chalksay')
var _ = require('lodash')
var mongoose = require('mongoose')
var questions = require('./questions.js')
var settings = require('../configs/settings.js').get()
var fs = require('fs')
var path = require('path')
var shell = require('shelljs')
var multiline = require('multiline')
var ejs = require('ejs')
var pathExists = require('is-there')

if (settings.env === 'production') {
  chalksay.red('Warning you are in ')
  chalksay.red(settings.env)
  chalksay.red('We highly suggest against doing this')
}

mongoose.connect(settings.mongodb.uri, settings.mongodb.options)
mongoose.connection.on('error', function () {
  chalksay.red('\nMongoDB Connection Error.\nPlease make sure that MongoDB is running.\nUser Tasks will not work')
})
mongoose.Promise = Promise
var User = mongoose.model('users', require('../server/modules/users/users.model.js'))
var commandFiles = {}
commandFiles.template = _.union(
  [new inquirer.Separator('Client Creation:')],
  _.map(fs.readdirSync('./commands/template/client'), function (n) { return 'client/' + n }),
  [new inquirer.Separator('Server Creation:')],
  _.map(fs.readdirSync('./commands/template/server'), function (n) { return 'server/' + n })
  )

commandFiles.blank = _.union(
  [new inquirer.Separator('Client Creation:')],
  _.map(fs.readdirSync('./commands/blank/client'), function (n) { return 'client/' + n }),
  [new inquirer.Separator('Server Creation:')],
  _.map(fs.readdirSync('./commands/blank/server'), function (n) { return 'server/' + n })
  )

commandFiles.modules = _.union(
  [new inquirer.Separator('Client Deletion:')],
  _.map(_.remove(fs.readdirSync('./client/modules'), function (n) { return n !== 'client.module.js' }), function (n) { return 'client/modules/' + n }),
  [new inquirer.Separator('Server Deletion:')],
  _.map(fs.readdirSync('./server/modules'), function (n) { return 'server/modules/' + n })
  )
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
    fs.rmdirSync(url)
  }
}
function emptyDirectory (url, callback) {
  fs.readdir('./' + url, function (error, files) {
    if (error && error.code !== 'ENOENT') throw new Error(error, 'THIS error')
    callback(files === undefined)
  })
}
function readDirectory (url, callback) {
  fs.readdir('./' + url, function (error, files) {
    if (error && error.code !== 'ENOENT') throw new Error(error)
    callback(files)
  })
}
function ensureMade (url, callback) {
  emptyDirectory(url, function (empty) {
    if (empty) {
      mkdir(url, function () {
        return callback()
      })
    } else {
      callback()
    }
  })
}
function ensureEmpty (url, force, callback) {
  emptyDirectory(url, function (empty) {
    if (empty || force) {
      callback()
    } else {
      chalksay.red('Destination is not empty:', url)
      ask()
    }
  })
}
function write (url, str) {
  fs.writeFile(url, str)
  chalksay.cyan('   Created File:', url)
}
function renderTemplate (template, data) {
  if (settings.render.cli.toLowerCase() === 'lodash') {
    var compiled = _.template(template, settings.render.lodash.options)
    template = compiled(data)
  } else if (settings.render.cli.toLowerCase() === 'ejs') {
    template = ejs.render(template, data, settings.render.ejs.options)
  } else if (settings.render.cli.toLowerCase() === '__') {
    for (var index in data) {
      template = template.split('__' + index + '__').join(data[index])
    }
  } else {
    chalksay.red('No Render Options Selected')
    chalksay.red('please locate configs/settings.js render.cli')
    chalksay.red('__ / ejs / lodash    are the only three options currently')
  }
  return template
}
function readTemplate (url, data) {
  var template = fs.readFileSync(path.join(__dirname, '/', url), 'utf8')
  return renderTemplate(template, data)
}
function useTemplate (template, data) {
  return renderTemplate(template, data)
}
function readFile (url) {
  var template = fs.readFileSync(path.join(__dirname, '/', url), 'utf8')
  return template
}
function mkdir (url, fn) {
  shell.mkdir('-p', url)
  shell.chmod(755, url)
  chalksay.cyan('   Created Directory:', url)
  if (fn) fn()
}

function buildFront (data, cb) {
  var change = {
    name: data.name,
    Name: _.capitalize(data.name)
  }
  var pathVar = './client'
  ensureEmpty(pathVar + '/modules/' + data.name + '/', false, function () {
    mkdir(pathVar + '/modules/' + data.name + '/', function () {
      readDirectory('./commands/' + data.location + '/client/', function (files) {
        // FILTER OUT DC STORES ...etc anythin with a .
        files = _.filter(files, function (n) {
          return !_.startsWith(n, '.')
        })
        var clientModuleJs = readFile('../client/modules/client.module.js')
        write('./client/modules/client.module.js', clientModuleJs.replace(/(\/\/ DONT REMOVE - APP GENERATOR)+/igm, ",\n 'app." + change.name + "' // DONT REMOVE - APP GENERATOR"))
        _.forEach(files, function (n) {
          if (path.extname(n) === '.html') {
            write(pathVar + '/modules/' + data.name + '/' + n, readTemplate('./' + data.location + '/client/' + n, change))
          } else {
            write(pathVar + '/modules/' + data.name + '/' + data.name + '.' + n, readTemplate('./' + data.location + '/client/' + n, change))
          }
        })
        cb()
      })
    })
  })
}
function buildBack (data, cb) {
  var change = {
    name: data.name,
    Name: _.capitalize(data.name)
  }
  var pathVar = './server'
  ensureEmpty(pathVar + '/modules/' + data.name + '/', false, function () {
    mkdir(pathVar + '/modules/' + data.name + '/', function () {
      readDirectory('./commands/' + data.location + '/server/', function (files) {
        // FILTER OUT DC STORES ...etc anythin with a .
        files = _.filter(files, function (n) {
          return !_.startsWith(n, '.')
        })
        _.forEach(files, function (n) {
          if (n === 'model.js' && data.schema.created) {
            write(pathVar + '/modules/' + data.name + '/' + data.name + '.' + n, useTemplate(data.schema.modelFile, change))
          } else {
            write(pathVar + '/modules/' + data.name + '/' + data.name + '.' + n, readTemplate('./' + data.location + '/server/' + n, change))
          }
        })
        cb()
      })
    })
  })
}

function moreSchemaQuestioning (cb) {
  inquirer.prompt(questions.schema).then(function (answers) {
    questions.schemaOutput.push(answers)
    if (answers.askAgain) {
      moreSchemaQuestioning(cb)
    } else {
      var schema = {}
      var modelFile = multiline(function () { /*
var mongoose = require('mongoose')
var __name__Schema = mongoose.Schema({
  */
      })

      _.forEach(questions.schemaOutput, function (n, k) {
        n.default = n.default || '""'
        schema[_.camelCase(n.field)] = {
          field: _.camelCase(n.field),
          type: n.type,
          default: n.default,
          string: _.camelCase(n.field) + ':{type:' + n.type + ',default:' + n.default + '}'
        }
        if (questions.schemaOutput.length === k + 1) {
          modelFile += '\n' + _.camelCase(n.field) + ':{ \n type:' + n.type + ', \n default:' + n.default + '\n} \n'
        } else {
          modelFile += '\n' + _.camelCase(n.field) + ':{ \n type:' + n.type + ', \n default:' + n.default + '\n},'
        }
      })
      modelFile += multiline(function () { /*
})
module.exports = __name__Schema
  */
      })
      cb({
        modelFile: modelFile,
        schema: schema,
        created: true
      })
      questions.schemaOutput = []
    }
  })
}
function buildSchema (cb) {
  inquirer.prompt(questions.schemaPreQuestion).then(function (answers) {
    if (answers.askAgain) {
      inquirer.prompt(questions.schema).then(function (answers) {
        questions.schemaOutput.push(answers)
        if (answers.askAgain) {
          moreSchemaQuestioning(cb)
        } else {
          var schema = {}
          var modelFile = multiline(function () { /*
var mongoose = require('mongoose')
var __name__Schema = mongoose.Schema({
  */
          })

          _.forEach(questions.schemaOutput, function (n, k) {
            n.default = n.default || '""'
            schema[_.camelCase(n.field)] = {
              field: _.camelCase(n.field),
              type: n.type,
              default: n.default,
              string: _.camelCase(n.field) + ':{type:' + n.type + ',default:' + n.default + '}'
            }
            if (questions.schemaOutput.length === k + 1) {
              modelFile += '\n' + _.camelCase(n.field) + ':{ \n type:' + n.type + ', \n default:' + n.default + '\n} \n'
            } else {
              modelFile += '\n' + _.camelCase(n.field) + ':{ \n type:' + n.type + ', \n default:' + n.default + '\n},'
            }
          })
          modelFile += multiline(function () { /*
})
module.exports = __name__Schema
  */
          })
          cb({
            modelFile: modelFile,
            schema: schema,
            created: true
          })
          questions.schemaOutput = []
        }
      })
    } else {
      cb({
        modelFile: false,
        schema: false,
        created: false
      })
    }
  })
}

function findUser (cb) {
  inquirer.prompt(questions.user).then(function (answers) {
    User.findOne({ email: answers.email }, function (error, existingUser) {
      cb(error, existingUser)
    })
  })
}

function updateUser (answers, cb) {
  User.findOne({ _id: answers._id }, function (error, user) {
    if (error) {
      cb(error, null)
    }
    if (answers.user.profile)user.profile = answers.user.profile
    if (answers.user.email)user.email = answers.user.email
    if (answers.user.password)user.password = answers.user.password
    if (answers.user.roles)user.roles = answers.user.roles
    user.save(function (error, data) {
      if (error) {
        cb(error, null)
      }
      cb(null, data)
    })
  })
}
function updatePassword (user, cb) {
  inquirer.prompt(questions.updatePasswords).then(function (answers) {
    updateUser({
      _id: user._id,
      user: {
        password: answers.password
      }
    }, function (error, data) {
      if (error) {
        chalksay.red(error)
      }
      cb(error, data)
    })
  })
}

function addRoles (user, cb) {
  inquirer.prompt(questions.updateRoles).then(function (answers) {
    user.roles.push(answers.role)
    user.roles = _.uniq(user.roles)
    updateUser({
      _id: user._id,
      user: {
        roles: user.roles
      }
    }, function (error, data) {
      if (error) {
        chalksay.red(error)
      }
      cb(error, data)
    })
  })
}
function removeRoles (user, cb) {
  inquirer.prompt(questions.updateRoles).then(function (answers) {
    _.forEach(user.roles, function (n, i) {
      if (n === answers.role) {
        user.roles.splice(i, 1)
      }
    })
    updateUser({
      _id: user._id,
      user: {
        roles: user.roles
      }
    }, function (error, data) {
      if (error) {
        chalksay.red(error)
      }
      cb(error, data)
    })
  })
}
function logShellJS (code, stdout, stderr) {
  if (stdout)chalksay.green(stdout)
  if (stderr)chalksay.red(stderr)
  ask()
}
function ask () {
  inquirer.prompt(questions.intro).then(function (answers) {
    switch (answers.intro) {
      case 'Start Selenium Server':
        shell.exec('node_modules/.bin/selenium-standalone start', {silent: false}, logShellJS)
        break
      case 'Install Selenium Server':
        shell.exec('node_modules/.bin/selenium-standalone install', {silent: false}, logShellJS)
        break
      case 'Start Mongod':
        shell.exec('bash scripts/start-mongod.sh', {silent: false}, logShellJS)
        break
      case 'Install MongoDB':
        shell.exec('bash scripts/mongodb-install.sh', {silent: false}, logShellJS)
        break
      case 'Install NodeJS':
        shell.exec('bash scripts/nodejs-install.sh', {silent: false}, logShellJS)
        break
      case 'Set Proxies':
        shell.exec('bash scripts/set-proxies.sh', {silent: false}, logShellJS)
        break
      case 'Delete Proxies':
        shell.exec('bash scripts/unset-proxies.sh', {silent: false}, logShellJS)
        break
      case 'Linux Processes':
        shell.exec("ps -ef | grep 'node index.js' | grep -v grep", {silent: false}, logShellJS)
        break
      case 'Linux Kill Processes':
        shell.exec("ps -ef | grep 'node index.js' | grep -v grep | awk '{print $2}' | xargs kill -9", {silent: false}, logShellJS)
        break
      case 'Lint Code':
        shell.exec('node_modules/.bin/standard --fix', {silent: false}, logShellJS)
        break
      case 'Lint & Fix Code':
        shell.exec('node_modules/.bin/standard --fix', {silent: false}, logShellJS)
        break
      case 'Install SSL Certs':
        shell.exec('bash scripts/generate-ssl-certs.sh', {silent: false}, logShellJS)
        break
      case 'Mean Stack JS Install Dependencies':
        shell.exec('npm install', {silent: false}, logShellJS)
        break
      case 'Mean Stack JS Post Install':
        shell.exec('npm run postinstall', {silent: false}, logShellJS)
        break
      case 'Install Tools Dependencies':
        shell.exec('node scripts/postinstall.js', {silent: false}, logShellJS)
        break
      case 'Install Bower Dependencies':
        shell.exec('node_modules/.bin/bower install', {silent: false}, logShellJS)
        break
      case 'Seed Database':
        require('../tests/seed.js')(function () {
          chalksay.green('Successfully seeded the database')
          ask()
        })
        break
      case 'Remove Module':
        inquirer.prompt({
          type: 'list',
          name: 'module',
          message: 'What Module do you want to delete?',
          choices: commandFiles.modules
        }).then(function (data) {
          fs.readdir('./' + data.module, function (error, files) {
            if (error && error.code !== 'ENOENT') throw new Error(error)
            chalksay.cyan(data.module + ' contains:')
            chalksay.green(files)
            inquirer.prompt({
              type: 'confirm',
              name: 'delete',
              message: 'Are you sure you want to delete this module?'
            }).then(function (confirm) {
              if (confirm.delete) {
                rmdirSync('./' + data.module)
                chalksay.green('Deleted: ' + data.module)
                ask()
              } else {
                chalksay.red('Canceled Deletion')
                ask()
              }
            })
          })
        })
        break
      case 'Create A File or Files':
        inquirer.prompt(questions.location).then(function (location) {
          inquirer.prompt(questions.module).then(function (modules) {
            inquirer.prompt({
              type: 'checkbox',
              name: 'files',
              message: 'What files do you want to create?',
              choices: commandFiles[location.location]
            }).then(function (files) {
              var change = {
                name: modules.module,
                Name: _.capitalize(modules.module)
              }
              _.forEach(files.files, function (n) {
                ensureMade(n.substring(0, 6) + '/modules/' + modules.module + '/', function () {
                  if (n.substring(0, 6) === 'client') {
                    if (path.extname(n) === '.html') {
                      write('./client' + '/modules/' + modules.module + '/' + n.substring(7), readTemplate('./' + location.location + '/client/' + n.substring(7), change))
                    } else {
                      write('./client' + '/modules/' + modules.module + '/' + modules.module + '.' + n.substring(7), readTemplate('./' + location.location + '/client/' + n.substring(7), change))
                    }
                  } else {
                    write('./server' + '/modules/' + modules.module + '/' + modules.module + '.' + n.substring(7), readTemplate('./' + location.location + '/server/' + n.substring(7), change))
                  }
                })
              })
              setTimeout(function () { ask() }, 500)
            })
          })
        })
        break
      // DONT FORGET STANDARD JS FIX
      case 'Create Frontend Module':
        inquirer.prompt(questions.location).then(function (location) {
          inquirer.prompt(questions.module).then(function (modules) {
            buildFront({
              location: location.location,
              name: modules.module
            }, function (error) {
              if (error)console.error(error)
              ask()
            })
          })
        })
        break
      case 'Create Backend Module':
        inquirer.prompt(questions.location).then(function (location) {
          inquirer.prompt(questions.module).then(function (modules) {
            buildSchema(function (data) {
              buildBack({
                location: location.location,
                name: modules.module,
                schema: data
              }, function (error) {
                if (error)console.error(error)
                ask()
              })
            })
          })
        })
        break
      case 'Create Frontend & Backend Module':
        inquirer.prompt(questions.location).then(function (location) {
          inquirer.prompt(questions.module).then(function (modules) {
            buildSchema(function (data) {
              buildFront({
                location: location.location,
                name: modules.module
              }, function (error) {
                if (error)console.error(error)
              })
              buildBack({
                location: location.location,
                name: modules.module,
                schema: data
              }, function (error) {
                if (error)console.error(error)
                ask()
              })
            })
          })
        })
        break
      case 'Create Schema':
        buildSchema(function (data) {
          if (data.created) {
            chalksay.blue(
              useTemplate(data.modelFile, {
                name: 'example',
                Name: 'Example'
              })
            )
          }
          ask()
        })
        break
      // case 'Create User':
      //   findUser(function (error, data) {
      //     if (error) {
      //       chalksay.red(error)
      //     } else {
      //       if (data === null) {
      //         chalksay.red('No User Found Under That Email')
      //       } else {
      //         chalksay.green(data)
      //       }
      //     }
      //   })
      //   break
      case 'Change Password':
        findUser(function (error, user) {
          if (error) {
            chalksay.red('Starting Over - Error:', error)
            ask()
          } else {
            if (user === null) {
              console.error(chalksay.red('No User Found Under That Email'))
              ask()
            } else {
              updatePassword(user, function (error, data) {
                if (error) {
                  chalksay.red('Starting Over - Error:', error)
                  ask()
                } else {
                  if (data === null) {
                    chalksay.red('No User Found Under That Email')
                    ask()
                  } else {
                    chalksay.green(data)
                    ask()
                  }
                }
              })
            }
          }
        })

        break
      case 'Change User Roles':
        findUser(function (error, user) {
          if (error) {
            chalksay.red('Starting Over - Error:', error)
            ask()
          } else {
            if (user === null) {
              chalksay.red('No User Found Under That Email')
              ask()
            } else {
              inquirer.prompt(questions.roles).then(function (answers) {
                if (answers.role === 'Add Role') {
                  addRoles(user, function (error, data) {
                    if (error) {
                      chalksay.red('Starting Over - Error:', error)
                      ask()
                    } else {
                      if (data === null) {
                        chalksay.red('No User Found Under That Email')
                        ask()
                      } else {
                        chalksay.green(data)
                        ask()
                      }
                    }
                  })
                } else {
                  removeRoles(user, function (error, data) {
                    if (error) {
                      chalksay.red('Starting Over - Error:', error)
                      ask()
                    } else {
                      if (data === null) {
                        chalksay.red('No User Found Under That Email')
                        ask()
                      } else {
                        chalksay.green(data)
                        ask()
                      }
                    }
                  })
                }
              })
            }
          }
        })

        break
      case 'View User':
        findUser(function (error, user) {
          if (error) {
            chalksay.red('Starting Over - Error:', error)
            ask()
          } else {
            if (user === null) {
              chalksay.red('No User Found Under That Email')
              ask()
            } else {
              chalksay.green(user)
              ask()
            }
          }
        })
        break
      case 'Exit':
        process.exit()
    }
  })
}

ask()
