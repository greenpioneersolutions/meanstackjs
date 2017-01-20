var LocalStrategy = require('passport-local').Strategy
var OIDCStrategy = require('passport-azure-ad').OIDCStrategy
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

exports.OIDCStrategy = new OIDCStrategy(
  {
    identityMetadata: 'https://login.microsoftonline.com/common.onmicrosoft.com/v2.0/.well-known/openid-configuration',
    clientID: '',
    responseType: 'code id_token',
    responseMode: 'form_post',
    redirectUrl: 'http://localhost:3000/auth/openid/return',
    allowHttpForRedirectUrl: true,
    clientSecret: '',
      // validateIssuer: config.creds.validateIssuer,
      // isB2C: config.creds.isB2C,
      // issuer: config.creds.issuer,
    passReqToCallback: false,
    scope: ['openid', 'https://outlook.office.com/mail.read'],
    loggingLevel: 'warn',
    nonceLifetime: 3600,
    clockSkew: 300
  },
    function (iss, sub, profile, accessToken, refreshToken, params, done) {
      console.log(iss, 'iss')
      console.log(sub, 'sub')
      console.log(profile, 'profile')
      console.log(accessToken, 'accessToken')
      console.log(refreshToken, 'refreshToken')
      console.log(params, 'params')

      var outlook = require('node-outlook')
    // Set the API endpoint to use the v2.0 endpoint
      outlook.base.setApiEndpoint('https://outlook.office.com/api/v2.0')

    // This is the oAuth token
    // refreshToken

    // Set up oData parameters
      var queryParams = {
        '$select': 'Subject,ReceivedDateTime,From',
        '$orderby': 'ReceivedDateTime desc',
        '$top': 20
      }

    // Pass the user's email address
      var userInfo = {
        email: 'webdev@test.onmicrosoft.com'
      }

      outlook.mail.getMessages({token: accessToken, folderId: 'Inbox', odataParams: queryParams, user: userInfo},
      function (error, result) {
        console.log(error, result, 'res')
        if (error) {
          console.log('getMessages returned an error: ', error)
        } else if (result) {
          console.log('getMessages returned ' + result.value.length + ' messages.')
          result.value.forEach(function (message) {
            console.log('  Subject:', message.Subject)
            console.log('  Received:', message.ReceivedDateTime.toString())
            console.log('  From:', message.From ? message.From.EmailAddress.Name : 'EMPTY')
          })
        }
      })

      if (!profile.oid) {
        return done(new Error('No oid found'), null)
      }
      // asynchronous verification, for effect...
      process.nextTick(function () {
        done(null, profile)
        // findByOid(profile.oid, function(err, user) {
        //   if (err) {
        //     return done(err)
        //   }
        //   if (!user) {
        //     // "Auto-registration"
        //     users.push(profile)
        //     return done(null, profile)
        //   }
        //   return done(null, user)
        // })
      })
    }
  )
