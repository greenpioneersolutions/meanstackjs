const crypto = require('crypto')
const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    required: 'We need an email address to create your account.'
  },
  username: {
    type: String,
    lowercase: true,
    required: 'We need an username to create your account.'
  },
  password: {
    type: String,
    required: true
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
      required: 'We need a name to create your account.'
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
  lastLoggedIn: {
    type: Date,
    default: Date.now
  },
  salt: {
    type: String
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  },
  apikey: {
    type: String,
    default: crypto.randomBytes(16).toString('base64')
  },
  type: {
    type: String,
    default: 'user'
  }
})
userSchema.pre('save', function (next) {
  const user = this
  user.wasNew = user.isNew
  if (!user.isModified('password')) {
    return next()
  } else {
    user.salt = Buffer.from(crypto.randomBytes(16).toString('base64'), 'base64').toString('base64')
    user.password = crypto.pbkdf2Sync(user.password, user.salt, 10000, 64, 'sha512').toString('base64')
    return next()
  }
})

userSchema.methods.comparePassword = function (userPassword, cb) {
  const user = this
  const tempPassword = crypto.pbkdf2Sync(userPassword, user.salt, 10000, 64, 'sha512').toString('base64')
  if (tempPassword === user.password) {
    user.lastLoggedIn = Date.now()
    user.save()
    cb(null, true)
  } else {
    cb(null, false)
  }
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
  const md5 = crypto.createHash('md5').update(this.email).digest('hex')
  return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
})
userSchema.virtual('firstName').get(function () {
  return this.profile.name.split(' ')[0]
})
userSchema.virtual('lastName').get(function () {
  return this.profile.name.split(' ').slice(1).join(' ')
})
userSchema.pre('validate', function (next) {
  const self = this
  if (typeof self.email === 'string') {
    self.email = self.email.trim()
  }
  if (typeof self.profile.name === 'string') self.profile.name = self.profile.name.trim()
  next()
})

module.exports = userSchema
