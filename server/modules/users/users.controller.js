var _ = require('lodash')
var auto = require('run-auto')
var crypto = require('crypto')
var passport = require('passport')
var mongoose = require('mongoose')
var User = mongoose.model('users')
var fs = require('fs')
var path = require('path')
var settings = require('../../../configs/settings.js').get()
var mail = require('../../mail.js')
var debug = require('debug')('meanstackjs:users')
var uuid = require('node-uuid')
var tokenApi = require('./../../token.js')

exports.postAuthenticate = function (req, res, next) {
  debug('start postAuthenticate')
  var redirect = req.body.redirect || false
  var token = tokenApi.createKey(req.user)
  res.cookie('token', token)
  debug('end postAuthenticate - Logged In')
  return res.status(200).send(exports.createResponseObject(req.user, token, redirect))
}

exports.getAuthenticate = function (req, res) {
  debug('start getAuthenticate')
  var redirect = req.body.redirect || false
  var token = req.headers.authorization || req.query.token || req.body.token || ''// || req.headers['x-access-token']
  if (req.isAuthenticated()) {
    return res.status(200).send(exports.createResponseObject(req.user, tokenApi.createKey(req.user), redirect))
  } else if (token) {
    tokenApi.checkKey(token, function (err, user) {
      if (err) return res.status(200).send(exports.createResponseObject(req.user, '', redirect))
      req.user = user
      return res.status(200).send(exports.createResponseObject(req.user, token, redirect))
    })
  } else {
    return res.status(200).send(exports.createResponseObject(req.user, '', redirect))
  }
  debug('end getAuthenticate')
}

exports.logout = function (req, res) {
  debug('start logout')
  req.logout()
  debug('end logout')
  return res.status(200).send()
}

exports.postSignup = function (req, res, next) {
  debug('start postSignup')

  req.assert('profile', 'Name must not be empty').notEmpty()
  req.assert('email', 'Email is not valid').isEmail()
  req.assert('password', 'Password must be at least 6 characters long').len(6)
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password)

  var errors = req.validationErrors()
  var redirect = req.body.redirect || false
  if (errors) {
    debug('end postSignup')
    return res.status(400).send({
      success: false,
      authenticated: false,
      msg: errors[0].msg,
      redirect: '/signup'
    })
  }
  var user = new User({
    email: req.body.email,
    password: req.body.password,
    profile: {
      name: req.body.profile.name
    }
  })

  User.findOne({ email: req.body.email }, function (err, existingUser) {
    if (err) {
      return res.status(400).send(err)
    }
    if (existingUser) {
      debug('end postSignup')
      return res.status(400).send({ msg: 'Account with that email address already exists.' })
    }
    user.save(function (err) {
      if (err && err.code === 11000) {
        debug('end postSignup')
        return res.status(400).send({ msg: 'Account with that email address already exists.' })
      } else if (err && err.name === 'ValidationError') {
        var keys = _.keys(err.errors)
        debug('end postSignup')
        return res.status(400).send({ msg: err.errors[keys[0]].message }) // err.message
      } else if (err) {
        next(err)
      } else {
        req.logIn(user, function (err) {
          if (err) {
            return next(err)
          } else {
            delete user['password']
            var token = tokenApi.createKey(user)
            res.cookie('token', token)
            debug('end postSignup')
            return res.status(200).send(exports.createResponseObject(user, token, redirect))
          }
        })
      }
    })
  })
}

exports.putUpdateProfile = function (req, res, next) {
  debug('start putUpdateProfile')
  User.findById(req.user.id, function (err, user) {
    if (err) {
      return next(err)
    }
    user = _.merge(user, req.body)
    // user.email = req.body.email || ''
    // user.profile.name = req.body.name || ''
    // user.profile.gender = req.body.gender || ''
    // user.profile.location = req.body.location || ''
    // user.profile.website = req.body.website || ''
    user.save(function (err) {
      if (err) {
        return next(err)
      }
      req.user = user
      debug('end putUpdateProfile')
      return res.status(200).send()
    })
  })
}

exports.putUpdatePassword = function (req, res, next) {
  debug('start putUpdatePassword')

  req.assert('password', 'Password must be at least 4 characters long').len(4)
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password)

  var errors = req.validationErrors()

  if (errors) {
    return res.status(200).send(errors)
  }

  User.findById(req.user.id, function (err, user) {
    if (err) {
      return next(err)
    }
    user.password = req.body.password
    user.save(function (err) {
      if (err) {
        return next(err)
      }

      debug('end putUpdatePassword')
      res.status(200).send()
    })
  })
}

exports.deleteDeleteAccount = function (req, res, next) {
  debug('start deleteDeleteAccount')

  User.remove({ _id: req.user.id }, function (err) {
    if (err) {
      return next(err)
    }
    req.logout()
    debug('end deleteDeleteAccount')
    return res.status(200).send()
  })
}

exports.getReset = function (req, res) {
  debug('start getReset')

  if (req.isAuthenticated()) {
    debug('end getReset')
    return res.status(400).send({
      msg: 'Already authenticated',
      valid: false
    })
  } else {
    User
      .findOne({ resetPasswordToken: req.params.token })
      .where('resetPasswordExpires').gt(Date.now())
      .exec(function (err, user) {
        if (err) {
          return res.status(400).send(err)
        }
        if (!user) {
          debug('end getReset')
          return res.status(400).send({
            msg: 'Password reset token is invalid or has expired.',
            valid: false
          })
        }
        debug('end getReset')
        res.status(200).send({
          msg: 'token is valid',
          valid: true
        })
      })
  }
}

exports.postReset = function (req, res, next) {
  debug('start postReset')

  req.assert('password', 'Password must be at least 4 characters long.').len(4)
  req.assert('confirmPassword', 'Passwords must match.').equals(req.body.password)
  var errors = req.validationErrors()

  if (errors) {
    debug('end postReset')
    return res.status(400).send({msg: errors})
  } else {
    auto({
      user: function (callback) {
        User
          .findOne({ resetPasswordToken: req.params.token })
          .where('resetPasswordExpires').gt(Date.now())
          .exec(function (err, user) {
            if (err) {
              return next(err)
            }
            if (!user) {
              return res.status(400).send({msg: 'no user found to reset password for. please hit reset password to get another token'})
            }
            user.password = req.body.password
            user.resetPasswordToken = undefined
            user.resetPasswordExpires = undefined
            user.save(function (err) {
              if (err) {
                return next(err)
              }
              req.logIn(user, function (err) {
                callback(err, user)
              })
            })
          })
      },
      sendEmail: ['user', function (results, callback) {
        mail.send({
          to: results.user.email,
          subject: settings.email.templates.reset.subject,
          text: settings.email.templates.reset.text(results.user.email)
        }, function (err) {
          callback(err, true)
        })
      }]
    }, function (err, user) {
      if (err) {
        return next(err)
      }
      delete user.password
      var redirect = req.body.redirect || '/'
      debug('end postReset')
      return res.status(200).send(exports.createResponseObject(user, '', redirect))
    })
  }
}

exports.postForgot = function (req, res, next) {
  debug('start postForgot')

  req.assert('email', 'Please enter a valid email address.').isEmail()

  var errors = req.validationErrors()

  if (errors) {
    return res.status(400).send(errors)
  }

  auto({
    token: function (done) {
      crypto.randomBytes(16, function (err, buf) {
        var token = buf.toString('hex')
        done(err, token)
      })
    },
    user: ['token', function (results, callback) {
      User.findOne({ email: req.body.email.toLowerCase() }, function (err, user) {
        if (err) {
          debug('end postForgot')
          return res.status(400).send(err)
        }
        if (!user) {
          debug('end postForgot')
          return res.status(200).send('/forgot')
        }
        user.resetPasswordToken = results.token
        user.resetPasswordExpires = Date.now() + 3600000 // 1 hour
        user.save(function (err) {
          callback(err, user)
        })
      })
    }],
    sendEmail: ['user', function (results, callback) {
      mail.send({
        to: results.user.email,
        subject: settings.email.templates.forgot.subject,
        text: settings.email.templates.forgot.text(req.headers.host, results.token)
      }, function (err) {
        callback(err, true)
      })
    }]
  }, function (err) {
    if (err) {
      return next(err)
    }
    debug('end postForgot')
    return res.status(200).send({ msg: 'Email has been sent' })
  })
}

exports.getKey = function (req, res, next) {
  debug('start getKey')
  return res.json({token: tokenApi.createKey(req.user)})
}
exports.postKey = function (req, res, next) {
  debug('start postKey')
  var token = tokenApi.createKey(req.user)
  res.cookie('token', token)
  debug('start postKey')
  return res.json({token: token})
}

exports.getKeyReset = function (req, res, next) {
  debug('start getKeyReset')
  req.user.apikey = uuid.v4()
  req.user.save(function (err) {
    debug('start getKeyReset')
    if (err) return res.status(500).send(err)
    return res.json({token: tokenApi.createKey(req.user)})
  })
}

exports.checkLoginInformation = function (req, res, next) {
  debug('start checkLoginInformation')
  var redirect = req.body.redirect || false
  req.assert('email', 'Email is not valid').isEmail()
  req.assert('password', 'Password cannot be blank').notEmpty()
  req.sanitize('email').normalizeEmail({ remove_dots: false })

  var errors = req.validationErrors()
  if (errors) {
    debug('end checkLoginInformation - Authentication failed. ' + errors[0].msg)
    return res.status(401).send({
      success: false,
      authenticated: false,
      msg: errors[0].msg,
      redirect: '/signin'
    })
  } else {
    passport.authenticate('local', function (err, user, info) {
      if (err) return next(err)
      if (!user) {
        debug('end checkLoginInformation')
        return res.status(400).send({
          success: false,
          authenticated: false,
          msg: info.message,
          redirect: redirect
        })
      }
      req.logIn(user, function (err) {
        if (err) return next(err)
        debug('end checkLoginInformation')
        next()
      })
    })(req, res, next)
  }
}

exports.createResponseObject = function (user, token, redirect) {
  debug('start createResponseObject')
  return {
    success: !!user,
    authenticated: !!user,
    user: user ? {
      profile: user.profile,
      connected: user.connected || {},
      roles: user.roles,
      gravatar: user.gravatar,
      email: user.email,
      _id: user._id
    } : {},
    token: token,
    redirect: redirect || false
  }
}

exports.postPhoto = function (req, res, next) {
  debug('start postPhoto')

  if (req.file) {
    var filePath = path.resolve(__dirname, '../../../client/uploads/')
    fs.readFile(req.file.path, function (err, data) {
      if (err) {
        debug('end postPhoto')
        return res.status(400).send(err)
      }
      var createDir = filePath + '/' + req.file.originalname
      fs.writeFile(createDir, data, function (err) {
        if (err) {
          debug('end postPhoto')
          return res.status(400).send(err)
        } else {
          debug('end postPhoto')
          return res.status(201).send()
        }
      })
    })
  } else {
    debug('end postPhoto')
    return res.status(400).send()
  }
}

// AZURE
// exports.getUserAzure = function (req, res, next) {
//   var outlook = require('node-outlook')
//   var token = req.user.azure ? req.user.azure.token : ''
//   outlook.base.setApiEndpoint('https://outlook.office.com/api/v2.0')
//   var queryParams = {
//     '$select': 'DisplayName, EmailAddress'
//   }
//   outlook.base.getUser({token: token, odataParams: queryParams}, function (error, result) {
//     if (error) {
//       res.send(error)
//     } else if (result) {
//       res.send(result)
//     }
//   })
// }
// exports.postCallbackAzure = function (req, res, next) {
//   res.redirect('/account')
// }
// exports.getUnlinkAzure = function (req, res, next) {
//   var mongoose = require('mongoose')
//   var User = mongoose.model('users')
//   User.findById(req.user._id, function (err, user) {
//     if (err) { return next(err) }
//     user.azure = {}
//     user.save(function (err) {
//       if (err) { return next(err) }
//       res.redirect('/account')
//     })
//   })
// }
// LOOK AT CREATING SERVICE ACCOUNTS
