var bcrypt = require('bcrypt-nodejs')
var crypto = require('crypto')
var mongoose = require('mongoose')
var settings = require('../../../configs/settings.js').get()
var mail = require('../../mail.js')
var validate = require('mongoose-validator')

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
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  }
})

/**
 * Password hash middleware.
 */
userSchema.pre('save', function (next) {
  var user = this
  user.wasNew = user.isNew // for post-save
  if (!user.isModified('password')) {
    return next()
  }
  if (user.isModified('password')) {
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
  } else {
    next()
  }
})
userSchema.post('save', function (user) {
  if (user.wasNew) {
    var message = {}
    message.to = user.email
    message.subject = settings.email.welcome.subject
    message.text = settings.email.welcome.text(user.profile.name.split(' ')[0])
    console.log('message', message)
    mail.send(message, function (err) {
      console.log(err, 'email sent ?')
      if (err) throw err
    })
  }
})
/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return cb(err)
    }
    cb(null, isMatch)
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
// Trim whitespace
userSchema.pre('validate', function (next) {
  var self = this
  if (typeof self.email === 'string') {
    self.email = self.email.trim()
  }
  if (typeof self.profile.name === 'string') self.profile.name = self.profile.name.trim()
  next()
})
userSchema.virtual('firstName').get(function () {
  return this.profile.name.split(' ')[0]
})

userSchema.virtual('lastName').get(function () {
  return this.profile.name.split(' ').slice(1).join(' ')
})

userSchema.virtual('mlaName').get(function () {
  var split = this.profile.name.split(' ')
  if (split.length >= 2) {
    return split[1] + ', ' + split[0]
  } else {
    return split[0]
  }
})

module.exports = userSchema
