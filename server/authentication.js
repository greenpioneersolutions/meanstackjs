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
  // Local Strategy
  passport.use(auth.passportStrategy)
  // Azure Strategy
  // passport.use(auth.passportAzureStrategy)
  // Instagram Strategy
  // passport.use(auth.passportInstagramStrategy)
  // Facebook Strategy
  // passport.use(auth.passportFacebookStrategy)
  // Twitter Strategy
  // passport.use(auth.passportTwitterStrategy)
  // GitHub Strategy
  // passport.use(auth.passportGitHubStrategy)
  // Google Strategy
  // passport.use(auth.passportGoogleStrategy)
  // LinkedIn Strategy
  // passport.use(auth.passportLinkedInStrategy)
  // OpenID Strategy
  // passport.use(auth.passportOpenIDStrategy)
}
