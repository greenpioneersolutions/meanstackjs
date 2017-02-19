module.exports.passport = authentication

var auth = require('./passport.js')
var passport = require('passport')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)

function authentication (self) {
  self.app.use(session({
    name: self.settings.sessionName,
    resave: true,
    saveUninitialized: true,
    secret: self.settings.sessionSecret,
    store: new MongoStore({
      url: self.settings.mongodb.uri,
      autoReconnect: true
    })
  }))
  self.app.use(passport.initialize())
  self.app.use(passport.session())
  passport.serializeUser(auth.serializeUser)
  passport.deserializeUser(auth.deserializeUser)
  passport.use(auth.passportStrategy)
  // passport.use(auth.OIDCStrategy)
}
