var LocalStrategy = require('passport-local').Strategy
var mongoose = require('mongoose')
var debug = require('debug')('meanstackjs:passport')
// Passport serialize user function.
exports.serializeUser = function (user, done) {
  process.nextTick(function () {
    done(null, user.id)
  })
}
// Passport deserialize user function.
exports.deserializeUser = function (id, done) {
  var User = mongoose.model('users')
  User.findOne({
    _id: id
  }, '-password', function (err, user) {
    done(err, user)
  })
}
// Sign in using Email and Password.
exports.passportStrategy = new LocalStrategy({ usernameField: 'email' }, function (email, password, done) {
  var User = mongoose.model('users')
  email = email.toLowerCase()
  User.findOne({
    email: email
  }, function (err, user) {
    if (err) {
      debug('passport: Error ' + err)
      return done(err)
    }
    if (!user) {
      debug('passport: Email ' + email + ' not found')
      return done(null, false, {
        message: 'Email ' + email + ' not found'
      })
    }
    user.comparePassword(password, function (err, isMatch) {
      if (err) {
        return done(err)
      }
      if (isMatch) {
        debug('passport: Login isMatch')
        return done(null, user)
      } else {
        debug('passport: Invalid Email or Password')
        return done(null, false, { message: 'Invalid email or password.' })
      }
    })
  })
})
