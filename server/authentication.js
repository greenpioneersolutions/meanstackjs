module.exports = { authentication }

const auth = require('./passport.js')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

function authentication (self) {
  self.app.use(session({
    name: self.settings.sessionName,
    resave: true,
    saveUninitialized: true,
    secret: self.settings.sessionSecret || 'mean',
    store: new MongoStore({
      url: self.settings.mongodb.uri,
      autoReconnect: true
    })
  }))
  self.app.use(passport.initialize())
  self.app.use(passport.session())
  passport.serializeUser(auth.serializeUser)
  passport.deserializeUser(auth.deserializeUser)
  passport.use(auth.localStrategy)
}
