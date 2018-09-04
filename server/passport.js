
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const User = mongoose.model('users')

function serializeUser (user, done) {
  process.nextTick(() => {
    done(null, user.id)
  })
}

function deserializeUser (id, done) {
  User.findOne({
    _id: id
  }, '-password -salt', (error, user) => {
    done(error, user)
  })
}

const localStrategy = new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  email = email.toLowerCase()
  User.findOne({
    email
  }, (error, user) => {
    if (error) {
      return done(error)
    }
    if (!user) {
      return done(null, false, {
        message: `Email ${email} not found`
      })
    }
    user.comparePassword(password, (error, isMatch) => {
      if (error) {
        return done(error)
      }
      if (isMatch) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Invalid email or password.' })
      }
    })
  })
})

module.exports = { localStrategy, serializeUser, deserializeUser }
