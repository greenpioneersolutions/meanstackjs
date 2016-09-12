#!/usr/bin/env node

'use strict'
var inquirer = require('inquirer')
var chalk = require('chalk')
var _ = require('lodash')
var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')
var questions = require('./questions.js')
var settings = require('../configs/settings.js').get()
var fs = require('fs')
var path = require('path')
var shell = require('shelljs')
var multiline = require('multiline')
mongoose.connect(settings.mongodb.uri, settings.mongodb.options)
mongoose.connection.on('error', function () {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.')
  process.exit(1)
})
mongoose.Promise = Promise
var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: {
    type: String
  },
  tokens: {
    type: Array
  },
  roles: {
    type: Array,
    default: []
  },
  profile: {
    name: {
      type: String,
      default: ''
    },
    gender: {
      type: String,
      default: ''
    },
    location: {
      type: String,
      default: ''
    },
    website: {
      type: String,
      default: ''
    },
    picture: {
      type: String,
      default: ''
    }
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  }
})
// Password hash middleware.
userSchema.pre('save', function (next) {
  var user = this
  if (!user.isModified('password')) {
    return next()
  }
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err)
    }
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) {
        return next(err)
      }
      user.password = hash
      next()
    })
  })
})
var User = mongoose.model('User', userSchema)

function emptyDirectory (url, callback) {
  fs.readdir('./' + url, function (err, files) {
    if (err && err.code !== 'ENOENT') throw new Error(err)
    callback(!files || !files.length)
  })
}
function readDirectory (url, callback) {
  fs.readdir('./' + url, function (err, files) {
    if (err && err.code !== 'ENOENT') throw new Error(err)
    callback(files)
  })
}
function ensureEmpty (url, force, callback) {
  emptyDirectory(url, function (empty) {
    if (empty || force) {
      callback()
    } else {
      console.log(chalk.red('Destination is not empty:'), url)
      ask()
    }
  })
}
function write (url, str) {
  fs.writeFile(url, str)
  console.log(chalk.cyan('   Created File:'), url)
}
function readTemplate (url, data) {
  var template = fs.readFileSync(path.join(__dirname, '/', url), 'utf8')

  for (var index in data) {
    template = template.split('__' + index + '__').join(data[index])
  }

  return template
}
function useTemplate (template, data) {
  for (var index in data) {
    template = template.split('__' + index + '__').join(data[index])
  }

  return template
}
function readFile (url) {
  var template = fs.readFileSync(path.join(__dirname, '/', url), 'utf8')
  return template
}
function mkdir (url, fn) {
  shell.mkdir('-p', url)
  shell.chmod(755, url)
  console.log(chalk.cyan('   Created Directory:'), url)
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
      readDirectory('./commands/template/client/', function (files) {
        // FILTER OUT DC STORES ...etc anythin with a .
        files = _.filter(files, function (n) {
          return !_.startsWith(n, '.')
        })
        var clientModuleJs = readFile('../client/modules/client.module.js')
        write('./client/modules/client.module.js', clientModuleJs.replace(/(\/\/ DONT REMOVE - APP GENERATOR)+/igm, ",\n 'app." + change.name + "' // DONT REMOVE - APP GENERATOR"))
        _.forEach(files, function (n) {
          if (path.extname(n) === '.html') {
            write(pathVar + '/modules/' + data.name + '/' + n, readTemplate('./template/client/' + n, change))
          } else {
            write(pathVar + '/modules/' + data.name + '/' + data.name + '.' + n, readTemplate('./template/client/' + n, change))
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
      readDirectory('./commands/template/server/', function (files) {
        // FILTER OUT DC STORES ...etc anythin with a .
        files = _.filter(files, function (n) {
          return !_.startsWith(n, '.')
        })
        _.forEach(files, function (n) {
          if (n === 'model.js' && data.schema.created) {
            write(pathVar + '/modules/' + data.name + '/' + data.name + '.' + n, useTemplate(data.schema.modelFile, change))
          } else {
            write(pathVar + '/modules/' + data.name + '/' + data.name + '.' + n, readTemplate('./template/server/' + n, change))
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
var __Name__ = mongoose.model('__Name__', __name__Schema)
module.exports = {
  __Name__: __Name__
}
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
var __Name__ = mongoose.model('__Name__', __name__Schema)
module.exports = {
  __Name__: __Name__
}
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
    User.findOne({ email: answers.email }, function (err, existingUser) {
      cb(err, existingUser)
    })
  })
}

function updateUser (answers, cb) {
  User.findOne({ _id: answers._id }, function (err, user) {
    if (err) {
      cb(err, null)
    }
    if (answers.user.profile)user.profile = answers.user.profile
    if (answers.user.email)user.email = answers.user.email
    if (answers.user.password)user.password = answers.user.password
    if (answers.user.roles)user.roles = answers.user.roles
    user.save(function (err, data) {
      if (err) {
        cb(err, null)
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
    }, function (err, data) {
      if (err) {
        console.log(chalk.red(err))
      }
      cb(err, data)
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
    }, function (err, data) {
      if (err) {
        console.log(chalk.red(err))
      }
      cb(err, data)
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
    }, function (err, data) {
      if (err) {
        console.log(chalk.red(err))
      }
      cb(err, data)
    })
  })
}
function ask () {
  inquirer.prompt(questions.intro).then(function (answers) {
    switch (answers.intro) {
      case 'Create Frontend Module':
        inquirer.prompt(questions.module).then(function (modules) {
          buildFront({
            name: modules.module
          }, function (err) {
            if (err)console.log(err)
            ask()
          })
        })
        break
      case 'Create Backend Module':
        inquirer.prompt(questions.module).then(function (modules) {
          buildSchema(function (data) {
            buildBack({
              name: modules.module,
              schema: data
            }, function (err) {
              if (err)console.log(err)
              ask()
            })
          })
        })

        break
      case 'Create Frontend & Backend Module':
        inquirer.prompt(questions.module).then(function (modules) {
          buildSchema(function (data) {
            buildFront({
              name: modules.module
            }, function (err) {
              if (err)console.log(err)
            })
            buildBack({
              name: modules.module,
              schema: data
            }, function (err) {
              if (err)console.log(err)
              ask()
            })
          })
        })
        break
      case 'Create Schema':
        buildSchema(function (data) {
          if (data.created) {
            console.log(chalk.blue(
              useTemplate(data.modelFile, {
                name: 'example',
                Name: 'Example'
              })
            ))
          }
          ask()
        })
        break
      // case 'Create User':
      //   findUser(function (err, data) {
      //     if (err) {
      //       console.log(chalk.red(err))
      //     } else {
      //       if (data === null) {
      //         console.log(chalk.red('No User Found Under That Email'))
      //       } else {
      //         console.log(chalk.green(data))
      //       }
      //     }
      //   })
      //   break
      case 'Change Password':
        findUser(function (err, user) {
          if (err) {
            console.log('Starting Over - Error:', chalk.red(err))
            ask()
          } else {
            if (user === null) {
              console.log(chalk.red('No User Found Under That Email'))
              ask()
            } else {
              updatePassword(user, function (err, data) {
                if (err) {
                  console.log('Starting Over - Error:', chalk.red(err))
                  ask()
                } else {
                  if (data === null) {
                    console.log(chalk.red('No User Found Under That Email'))
                    ask()
                  } else {
                    console.log(chalk.green(data))
                    ask()
                  }
                }
              })
            }
          }
        })

        break
      case 'Change User Roles':
        findUser(function (err, user) {
          if (err) {
            console.log('Starting Over - Error:', chalk.red(err))
            ask()
          } else {
            if (user === null) {
              console.log(chalk.red('No User Found Under That Email'))
              ask()
            } else {
              inquirer.prompt(questions.roles).then(function (answers) {
                if (answers.role === 'Add Role') {
                  addRoles(user, function (err, data) {
                    if (err) {
                      console.log('Starting Over - Error:', chalk.red(err))
                      ask()
                    } else {
                      if (data === null) {
                        console.log(chalk.red('No User Found Under That Email'))
                        ask()
                      } else {
                        console.log(chalk.green(data))
                        ask()
                      }
                    }
                  })
                } else {
                  removeRoles(user, function (err, data) {
                    if (err) {
                      console.log('Starting Over - Error:', chalk.red(err))
                      ask()
                    } else {
                      if (data === null) {
                        console.log(chalk.red('No User Found Under That Email'))
                        ask()
                      } else {
                        console.log(chalk.green(data))
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
        findUser(function (err, user) {
          if (err) {
            console.log('Starting Over - Error:', chalk.red(err))
            ask()
          } else {
            if (user === null) {
              console.log(chalk.red('No User Found Under That Email'))
              ask()
            } else {
              console.log(chalk.green(user))
              ask()
            }
          }
        })
        break
      case 'Exit':
        process.exit()
        break
    }
  })
}

ask()
