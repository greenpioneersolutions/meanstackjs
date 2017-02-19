var bcrypt = require('bcrypt-nodejs')
var crypto = require('crypto')
var mongoose = require('mongoose')
var settings = require('../../../configs/settings.js').get()
var environment = require('../../../configs/environment.js').get()
var mail = require('../../mail.js')
var validate = require('mongoose-validator')
var timestamps = require('mongoose-timestamp')
var debug = require('debug')('meanstackjs:users')
var uuid = require('node-uuid')
// var _ = require('lodash')

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: 'We need an email address to create your account.',
    validate: [
      validate({
        validator: 'isEmail',
        message: 'Your email address is invalid.'
      }),
      validate({
        validator: 'isLength',
        arguments: 3,
        message: 'We need an email address to create your account.'
      })
    ]
  },
  password: {
    type: String,
    required: true,
    validate: [
      validate({
        validator: 'isLength',
        arguments: [ 6, 255 ],
        message: 'Your password must be at least 6 characters.'
      })
    ]
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
      index: true,
      required: 'We need a name to create your account.',
      validate: [
        validate({
          validator: 'contains',
          arguments: ' ',
          message: 'Please use your full name.'
        }),
        validate({
          validator: 'isLength',
          arguments: 3,
          message: 'We need a name to create your account.'
        })
      ]
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
  // azure: {},
  // facebook: {},
  // twitter: {},
  // github: {},
  // google: {},
  // linkedin: {},
  // instagram: {},
  lastLoggedIn: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  },
  apikey: {
    type: String,
    default: uuid.v4()
  },
  type: {
    type: String,
    default: 'user' // Service Accounts later
  }
})
userSchema.pre('save', function (next) {
  // Password hash middleware.
  var user = this
  user.wasNew = user.isNew // for post-save
  if (!user.isModified('password')) {
    return next()
  }
  if (user.isModified('password')) {
    bcrypt.genSalt(10, function (error, salt) {
      if (error) {
        return next(error)
      }
      bcrypt.hash(user.password, salt, null, function (error, hash) {
        if (error) {
          return next(error)
        }
        user.password = hash
        next()
      })
    })
  } else {
    next()
  }
})
userSchema.post('save', function (user) {
  if (user.wasNew && environment === 'production') {
    debug('email a new user')
    var message = {}
    message.to = user.email
    message.subject = settings.email.templates.welcome.subject
    message.text = settings.email.templates.welcome.text(user.profile.name.split(' ')[0])
    mail.send(message, function (error) {
      if (error) throw error
    })
  }
})
userSchema.methods.comparePassword = function (candidatePassword, cb) {
  // Helper method for validating user's password.
  debug('start comparePassword')
  var user = this
  bcrypt.compare(candidatePassword, this.password, function (error, res) {
    if (res) {
      user.lastLoggedIn = Date.now()
      user.save(function (error) {
        if (error) self.logger.warn(error)
      })
    }
    debug('end comparePassword')
    cb(error, res)
  })
}
userSchema.set('toObject', {
  virtuals: true,
  getters: true
})
userSchema.set('toJSON', {
  virtuals: true
})
userSchema.virtual('gravatar').get(function () {
  if (!this.email) {
    return 'https://gravatar.com/avatar/?s=200&d=retro'
  }
  var md5 = crypto.createHash('md5').update(this.email).digest('hex')
  return 'https://gravatar.com/avatar/' + md5 + '?s=200&d=retro'
})
// userSchema.virtual('connected').get(function () {
//   return {
//     azure: !_.isEmpty(this.azure),
//     facebook: !_.isEmpty(this.facebook),
//     twitter: !_.isEmpty(this.twitter),
//     github: !_.isEmpty(this.github),
//     google: !_.isEmpty(this.google),
//     linkedin: !_.isEmpty(this.linkedin),
//     instagram: !_.isEmpty(this.instagram)
//   }
// })
userSchema.virtual('firstName').get(function () {
  return this.profile.name.split(' ')[0]
})
userSchema.virtual('lastName').get(function () {
  return this.profile.name.split(' ').slice(1).join(' ')
})
userSchema.pre('validate', function (next) {
  // Trim whitespace
  var self = this
  if (typeof self.email === 'string') {
    self.email = self.email.trim()
  }
  if (typeof self.profile.name === 'string') self.profile.name = self.profile.name.trim()
  next()
})
userSchema.plugin(timestamps)

module.exports = userSchema
