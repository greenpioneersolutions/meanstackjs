exports.serializeUser = serializeUser
exports.deserializeUser = deserializeUser

var LocalStrategy = require('passport-local').Strategy
var mongoose = require('mongoose')
var debug = require('debug')('meanstackjs:passport')

function serializeUser (user, done) { // Passport serialize user function.
  process.nextTick(function () {
    done(null, user.id)
  })
}

function deserializeUser (id, done) { // Passport deserialize user function.
  var User = mongoose.model('users')
  User.findOne({
    _id: id
  }, '-password', function (error, user) {
    done(error, user)
  })
}

exports.passportStrategy = new LocalStrategy({ usernameField: 'email' }, function (email, password, done) { // Sign in using Email and Password.
  var User = mongoose.model('users')
  email = email.toLowerCase()
  User.findOne({
    email: email
  }, function (error, user) {
    if (error) {
      debug('passport: Error ' + error)
      return done(error)
    }
    if (!user) {
      debug('passport: Email ' + email + ' not found')
      return done(null, false, {
        message: 'Email ' + email + ' not found'
      })
    }
    user.comparePassword(password, function (error, isMatch) {
      if (error) {
        return done(error)
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

// var OIDCStrategy = require('passport-azure-ad').OIDCStrategy
// exports.OIDCStrategy = new OIDCStrategy(
//   {
//     identityMetadata: 'https://login.microsoftonline.com/common.onmicrosoft.com/v2.0/.well-known/openid-configuration',
//     clientID: process.env.AZURE_ID,
//     responseType: 'code id_token',
//     responseMode: 'form_post',
//     redirectUrl: 'http://localhost:3000/api/auth/link/azure/callback',
//     allowHttpForRedirectUrl: true,
//     clientSecret: process.env.AZURE_SECRET,
//     passReqToCallback: true,
//     scope: ['openid', 'offline_access', 'https://outlook.office.com/mail.read'],
//     loggingLevel: 'warn',
//     nonceLifetime: 3600,
//     clockSkew: 300
//   },
//     function (req, iss, sub, profile, accessToken, refreshToken, params, done) {
//       var User = mongoose.model('users')
//       if (!profile.oid) {
//         return done({status: 400, message: 'No oid found'}, null)
//       }
//       if (req.user) {
//         User.findOne({ 'azure.oid': profile.oid }, function (error, existingUser) {
//           if (error) return done(error)
//           if (existingUser) {
//             existingUser.azure.token = accessToken
//             existingUser.azure.refreshToken = refreshToken
//             existingUser.save(function (error) {
//               if (error) return done(error)
//               done(error, existingUser)
//             })
//           } else {
//             User.findById(req.user._id,function (error, user) {
//               if (error) { return done(error) }
//               user.azure = {
//                 token: accessToken,
//                 refreshToken: refreshToken,
//                 oid: profile.oid
//               }
//               user.save(function (error) {
//                 if (error) return done(error)
//                 done(error, user)
//               })
//             })
//           }
//         })
//       } else {
//         done({status: 400, message: 'There is no account to link your azure account too.' })
//       }
//     }
//   )
