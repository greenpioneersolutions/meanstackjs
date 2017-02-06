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
//         return done({status: 400, msg: 'No oid found'}, null)
//       }
//       if (req.user) {
//         User.findOne({ 'azure.oid': profile.oid }, (err, existingUser) => {
//           if (err) return done(err)
//           if (existingUser) {
//             existingUser.azure.token = accessToken
//             existingUser.azure.refreshToken = refreshToken
//             existingUser.save((err) => {
//               if (err) return done(err)
//               done(err, existingUser)
//             })
//           } else {
//             User.findById(req.user._id, (err, user) => {
//               if (err) { return done(err) }
//               user.azure = {
//                 token: accessToken,
//                 refreshToken: refreshToken,
//                 oid: profile.oid
//               }
//               user.save((err) => {
//                 if (err) return done(err)
//                 done(err, user)
//               })
//             })
//           }
//         })
//       } else {
//         done({status: 400, msg: 'There is no account to link your azure account too.' })
//       }
//     }
//   )
