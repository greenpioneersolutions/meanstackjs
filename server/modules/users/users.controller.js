exports.postAuthenticate = postAuthenticate
exports.getAuthenticate = getAuthenticate
exports.logout = logout
exports.postSignup = postSignup
exports.putUpdateProfile = putUpdateProfile
exports.putUpdatePassword = putUpdatePassword
exports.deleteDeleteAccount = deleteDeleteAccount
exports.getReset = getReset
exports.postReset = postReset
exports.postForgot = postForgot
exports.getKey = getKey
exports.postKey = postKey
exports.getKeyReset = getKeyReset
exports.checkLoginInformation = checkLoginInformation
exports.createResponseObject = createResponseObject
exports.postPhoto = postPhoto

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

function postAuthenticate (req, res, next) {
  debug('start postAuthenticate')
  var redirect = req.body.redirect || false
  var token = tokenApi.createKey(req.user)
  res.cookie('token', token)
  debug('end postAuthenticate - Logged In')
  return res.status(200).send(exports.createResponseObject(req.user, token, redirect))
}

function getAuthenticate (req, res) {
  debug('start getAuthenticate')
  var redirect = req.body.redirect || false
  var token = req.headers.authorization || req.query.token || req.body.token || ''// || req.headers['x-access-token']
  if (req.isAuthenticated()) {
    return res.status(200).send(exports.createResponseObject(req.user, tokenApi.createKey(req.user), redirect))
  } else if (token) {
    tokenApi.checkKey(token, function (error, user) {
      if (error) return res.status(200).send(exports.createResponseObject(req.user, '', redirect))
      req.user = user
      return res.status(200).send(exports.createResponseObject(req.user, token, redirect))
    })
  } else {
    return res.status(200).send(exports.createResponseObject(req.user, '', redirect))
  }
  debug('end getAuthenticate')
}

function logout (req, res) {
  debug('start logout')
  req.logout()
  debug('end logout')
  return res.status(200).send()
}

function postSignup (req, res, next) {
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
      message: errors[0].message,
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

  User.findOne({ email: req.body.email }, function (error, existingUser) {
    if (error) {
      return res.status(400).send(error)
    }
    if (existingUser) {
      debug('end postSignup')
      return res.status(400).send({ message: 'Account with that email address already exists.' })
    }
    user.save(function (error) {
      if (error && error.code === 11000) {
        debug('end postSignup')
        return res.status(400).send({ message: 'Account with that email address already exists.' })
      } else if (error && error.name === 'ValidationError') {
        var keys = _.keys(error.errors)
        debug('end postSignup')
        return res.status(400).send({ message: error.errors[keys[0]].message }) // error.message
      } else if (error) {
        next(error)
      } else {
        req.logIn(user, function (error) {
          if (error) {
            return next(error)
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

function putUpdateProfile (req, res, next) {
  debug('start putUpdateProfile')
  User.findById(req.user.id, function (error, user) {
    if (error) {
      return next(error)
    }
    user = _.merge(user, req.body)
    // user.email = req.body.email || ''
    // user.profile.name = req.body.name || ''
    // user.profile.gender = req.body.gender || ''
    // user.profile.location = req.body.location || ''
    // user.profile.website = req.body.website || ''
    user.save(function (error) {
      if (error) {
        return next(error)
      }
      req.user = user
      debug('end putUpdateProfile')
      return res.status(200).send()
    })
  })
}

function putUpdatePassword (req, res, next) {
  debug('start putUpdatePassword')

  req.assert('password', 'Password must be at least 4 characters long').len(4)
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password)

  var errors = req.validationErrors()

  if (errors) {
    return res.status(200).send(errors)
  }

  User.findById(req.user.id, function (error, user) {
    if (error) {
      return next(error)
    }
    user.password = req.body.password
    user.save(function (error) {
      if (error) {
        return next(error)
      }

      debug('end putUpdatePassword')
      res.status(200).send()
    })
  })
}

function deleteDeleteAccount (req, res, next) {
  debug('start deleteDeleteAccount')

  User.remove({ _id: req.user.id }, function (error) {
    if (error) {
      return next(error)
    }
    req.logout()
    debug('end deleteDeleteAccount')
    return res.status(200).send()
  })
}

function getReset (req, res) {
  debug('start getReset')

  if (req.isAuthenticated()) {
    debug('end getReset')
    return res.status(400).send({
      message: 'Already authenticated',
      valid: false
    })
  } else {
    User
      .findOne({ resetPasswordToken: req.params.token })
      .where('resetPasswordExpires').gt(Date.now())
      .exec(function (error, user) {
        if (error) {
          return res.status(400).send(error)
        }
        if (!user) {
          debug('end getReset')
          return res.status(400).send({
            message: 'Password reset token is invalid or has expired.',
            valid: false
          })
        }
        debug('end getReset')
        res.status(200).send({
          message: 'token is valid',
          valid: true
        })
      })
  }
}

function postReset (req, res, next) {
  debug('start postReset')

  req.assert('password', 'Password must be at least 4 characters long.').len(4)
  req.assert('confirmPassword', 'Passwords must match.').equals(req.body.password)
  var errors = req.validationErrors()

  if (errors) {
    debug('end postReset')
    return res.status(400).send({message: errors})
  } else {
    auto({
      user: function (callback) {
        User
          .findOne({ resetPasswordToken: req.params.token })
          .where('resetPasswordExpires').gt(Date.now())
          .exec(function (error, user) {
            if (error) {
              return next(error)
            }
            if (!user) {
              return res.status(400).send({message: 'no user found to reset password for. please hit reset password to get another token'})
            }
            user.password = req.body.password
            user.resetPasswordToken = undefined
            user.resetPasswordExpires = undefined
            user.save(function (error) {
              if (error) {
                return next(error)
              }
              req.logIn(user, function (error) {
                callback(error, user)
              })
            })
          })
      },
      sendEmail: ['user', function (results, callback) {
        mail.send({
          to: results.user.email,
          subject: settings.email.templates.reset.subject,
          text: settings.email.templates.reset.text(results.user.email)
        }, function (error) {
          callback(error, true)
        })
      }]
    }, function (error, user) {
      if (error) {
        return next(error)
      }
      delete user.password
      var redirect = req.body.redirect || '/'
      debug('end postReset')
      return res.status(200).send(exports.createResponseObject(user, '', redirect))
    })
  }
}

function postForgot (req, res, next) {
  debug('start postForgot')

  req.assert('email', 'Please enter a valid email address.').isEmail()

  var errors = req.validationErrors()

  if (errors) {
    return res.status(400).send(errors)
  }

  auto({
    token: function (done) {
      crypto.randomBytes(16, function (error, buf) {
        var token = buf.toString('hex')
        done(error, token)
      })
    },
    user: ['token', function (results, callback) {
      User.findOne({ email: req.body.email.toLowerCase() }, function (error, user) {
        if (error) {
          debug('end postForgot')
          return res.status(400).send(error)
        }
        if (!user) {
          debug('end postForgot')
          return res.status(200).send('/forgot')
        }
        user.resetPasswordToken = results.token
        user.resetPasswordExpires = Date.now() + 3600000 // 1 hour
        user.save(function (error) {
          callback(error, user)
        })
      })
    }],
    sendEmail: ['user', function (results, callback) {
      mail.send({
        to: results.user.email,
        subject: settings.email.templates.forgot.subject,
        text: settings.email.templates.forgot.text(req.headers.host, results.token)
      }, function (error) {
        callback(error, true)
      })
    }]
  }, function (error) {
    if (error) {
      return next(error)
    }
    debug('end postForgot')
    return res.status(200).send({ message: 'Email has been sent' })
  })
}

function getKey (req, res, next) {
  debug('start getKey')
  return res.json({token: tokenApi.createKey(req.user)})
}

function postKey (req, res, next) {
  debug('start postKey')
  var token = tokenApi.createKey(req.user)
  res.cookie('token', token)
  debug('start postKey')
  return res.json({token: token})
}

function getKeyReset (req, res, next) {
  debug('start getKeyReset')
  req.user.apikey = uuid.v4()
  req.user.save(function (error) {
    debug('start getKeyReset')
    if (error) return res.status(500).send(error)
    return res.json({token: tokenApi.createKey(req.user)})
  })
}

function checkLoginInformation (req, res, next) {
  debug('start checkLoginInformation')
  var redirect = req.body.redirect || false
  req.assert('email', 'Email is not valid').isEmail()
  req.assert('password', 'Password cannot be blank').notEmpty()
  req.sanitize('email').normalizeEmail({ remove_dots: false })

  var errors = req.validationErrors()
  if (errors) {
    debug('end checkLoginInformation - Authentication failed. ' + errors[0].message)
    return res.status(401).send({
      success: false,
      authenticated: false,
      message: errors[0].message,
      redirect: '/signin'
    })
  } else {
    passport.authenticate('local', function (error, user, info) {
      if (error) return next(error)
      if (!user) {
        debug('end checkLoginInformation')
        return res.status(400).send({
          success: false,
          authenticated: false,
          message: info.message,
          redirect: redirect
        })
      }
      req.logIn(user, function (error) {
        if (error) return next(error)
        debug('end checkLoginInformation')
        next()
      })
    })(req, res, next)
  }
}

function createResponseObject (user, token, redirect) {
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

function postPhoto (req, res, next) {
  debug('start postPhoto')

  if (req.file) {
    var filePath = path.resolve(__dirname, '../../../client/uploads/')
    fs.readFile(req.file.path, function (error, data) {
      if (error) {
        debug('end postPhoto')
        return res.status(400).send(error)
      }
      var createDir = filePath + '/' + req.file.originalname
      fs.writeFile(createDir, data, function (error) {
        if (error) {
          debug('end postPhoto')
          return res.status(400).send(error)
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

// Azure
// exports.getUserAzure = getUserAzure
// exports.postCallbackAzure = postCallbackAzure
// exports.getUnlinkAzure = getUnlinkAzure

// function getUserAzure (req, res, next) {
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

// function postCallbackAzure (req, res, next) {
//   res.redirect('/account')
// }

// function getUnlinkAzure (req, res, next) {
//   User.findById(req.user._id, function (error, user) {
//     if (error) { return next(error) }
//     user.azure = {}
//     user.save(function (error) {
//       if (error) { return next(error) }
//       res.redirect('/account')
//     })
//   })
// }

// Instagram
// exports.postCallbackInstagram = postCallbackInstagram
// exports.getUnlinkInstagram = getUnlinkInstagram

// function postCallbackInstagram (req, res, next) {
//   res.redirect('/account')
// }
// function getUnlinkInstagram (req, res, next) {
//   User.findById(req.user._id, function (error, user) {
//     if (error) { return next(error) }
//     user.instagram = {}
//     user.save(function (error) {
//       if (error) { return next(error) }
//       res.redirect('/account')
//     })
//   })
// }

// Facebook
// exports.postCallbackFacebook = postCallbackFacebook
// exports.getUnlinkFacebook = getUnlinkFacebook

// function postCallbackFacebook (req, res, next) {
//   res.redirect('/account')
// }
// function getUnlinkFacebook (req, res, next) {
//   User.findById(req.user._id, function (error, user) {
//     if (error) { return next(error) }
//     user.facebook = {}
//     user.save(function (error) {
//       if (error) { return next(error) }
//       res.redirect('/account')
//     })
//   })
// }

// Twitter
// exports.postCallbackTwitter = postCallbackTwitter
// exports.getUnlinkTwitter = getUnlinkTwitter

// function postCallbackTwitter (req, res, next) {
//   res.redirect('/account')
// }
// function getUnlinkTwitter (req, res, next) {
//   User.findById(req.user._id, function (error, user) {
//     if (error) { return next(error) }
//     user.twitter = {}
//     user.save(function (error) {
//       if (error) { return next(error) }
//       res.redirect('/account')
//     })
//   })
// }

// GitHub
// exports.postCallbackGitHub = postCallbackGitHub
// exports.getUnlinkGitHub = getUnlinkGitHub

// function postCallbackGitHub (req, res, next) {
//   res.redirect('/account')
// }
// function getUnlinkGitHub (req, res, next) {
//   User.findById(req.user._id, function (error, user) {
//     if (error) { return next(error) }
//     user.gitHub = {}
//     user.save(function (error) {
//       if (error) { return next(error) }
//       res.redirect('/account')
//     })
//   })
// }

// Google
// exports.postCallbackGoogle = postCallbackGoogle
// exports.getUnlinkGoogle = getUnlinkGoogle

// function postCallbackGoogle (req, res, next) {
//   res.redirect('/account')
// }
// function getUnlinkGoogle (req, res, next) {
//   User.findById(req.user._id, function (error, user) {
//     if (error) { return next(error) }
//     user.google = {}
//     user.save(function (error) {
//       if (error) { return next(error) }
//       res.redirect('/account')
//     })
//   })
// }

// LinkedIn
// exports.postCallbackLinkedIn = postCallbackLinkedIn
// exports.getUnlinkLinkedIn = getUnlinkLinkedIn

// function postCallbackLinkedIn (req, res, next) {
//   res.redirect('/account')
// }
// function getUnlinkLinkedIn (req, res, next) {
//   User.findById(req.user._id, function (error, user) {
//     if (error) { return next(error) }
//     user.linkedIn = {}
//     user.save(function (error) {
//       if (error) { return next(error) }
//       res.redirect('/account')
//     })
//   })
// }
// LOOK AT CREATING SERVICE ACCOUNTS IN LATER VERSIONS
