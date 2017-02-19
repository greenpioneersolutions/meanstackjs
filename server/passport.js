exports.serializeUser = serializeUser
exports.deserializeUser = deserializeUser

var LocalStrategy = require('passport-local').Strategy
var mongoose = require('mongoose')
var debug = require('debug')('meanstackjs:passport')
var User = mongoose.model('users')

function serializeUser (user, done) {
  // Passport serialize user function.
  process.nextTick(function () {
    done(null, user.id)
  })
}

function deserializeUser (id, done) {
  // Passport deserialize user function.
  User.findOne({
    _id: id
  }, '-password', function (error, user) {
    done(error, user)
  })
}

exports.passportStrategy = new LocalStrategy({ usernameField: 'email' }, function (email, password, done) {
  // Sign in using Email and Password.
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

// Link Azure
// var OIDCStrategy = require('passport-azure-ad').OIDCStrategy
// exports.passportAzureStrategy = new OIDCStrategy({
//   identityMetadata: 'https://login.microsoftonline.com/common.onmicrosoft.com/v2.0/.well-known/openid-configuration',
//   clientID: process.env.AZURE_ID,
//   responseType: 'code id_token',
//   responseMode: 'form_post',
//   redirectUrl: 'http://localhost:3000/api/auth/link/azure/callback',
//   allowHttpForRedirectUrl: true,
//   clientSecret: process.env.AZURE_SECRET,
//   passReqToCallback: true,
//   scope: ['openid', 'offline_access', 'https://outlook.office.com/mail.read'],
//   loggingLevel: 'warn',
//   nonceLifetime: 3600,
//   clockSkew: 300
// }, function (req, iss, sub, profile, accessToken, refreshToken, params, done) {
//   if (!profile.oid) {
//     return done({status: 400, message: 'No oid found'}, null)
//   }
//   if (req.user) {
//     User.findOne({ 'azure.oid': profile.oid }, function (error, existingUser) {
//       if (error) return done(error)
//       if (existingUser) {
//         existingUser.azure.token = accessToken
//         existingUser.azure.refreshToken = refreshToken
//         existingUser.save(function (error) {
//           if (error) return done(error)
//           done(error, existingUser)
//         })
//       } else {
//         User.findById(req.user._id, function (error, user) {
//           if (error) { return done(error) }
//           user.azure = {
//             token: accessToken,
//             refreshToken: refreshToken,
//             oid: profile.oid
//           }
//           user.save(function (error) {
//             if (error) return done(error)
//             done(error, user)
//           })
//         })
//       }
//     })
//   } else {
//     done({
//       status: 400,
//       message: 'There is no account to link your azure account too.'
//     })
//   }
// }
// )

// Link Facebook
// var FacebookStrategy = require('passport-facebook').Strategy
// exports.passportFacebookStrategy = new FacebookStrategy({
//   clientID: process.env.FACEBOOK_ID,
//   clientSecret: process.env.FACEBOOK_SECRET,
//   callbackURL: '/api/auth/link/facebook/callback',
//   profileFields: ['name', 'email', 'link', 'locale', 'timezone'],
//   passReqToCallback: true
// }, function (req, accessToken, refreshToken, profile, done) {
//   if (req.user) {
//     User.findOne({ 'facebook.oid': profile.oid }, function (error, existingUser) {
//       if (error) return done(error)
//       if (existingUser) {
//         existingUser.facebook.token = accessToken
//         existingUser.facebook.refreshToken = refreshToken
//         existingUser.save(function (error) {
//           if (error) return done(error)
//           done(error, existingUser)
//         })
//       } else {
//         User.findById(req.user._id, function (error, user) {
//           if (error) { return done(error) }
//           user.facebook = {
//             token: accessToken,
//             refreshToken: refreshToken,
//             id: profile.id
//           }
//           user.save(function (error) {
//             if (error) return done(error)
//             done(error, user)
//           })
//         })
//       }
//     })
//   } else {
//     done({
//       status: 400,
//       message: 'There is no account to link your facebook account too.'
//     })
//   }
// })

// Link Twitter
// var TwitterStrategy = require('passport-twitter').Strategy
// exports.passportTwitterStrategy = new TwitterStrategy({
//   consumerKey: process.env.TWITTER_KEY,
//   consumerSecret: process.env.TWITTER_SECRET,
//   callbackURL: '/api/auth/link/twitter/callback',
//   passReqToCallback: true
// }, function (req, accessToken, tokenSecret, profile, done) {
//   if (req.user) {
//     User.findOne({ 'twitter.oid': profile.oid }, function (error, existingUser) {
//       if (error) return done(error)
//       if (existingUser) {
//         existingUser.twitter.token = accessToken
//         existingUser.twitter.tokenSecret = tokenSecret
//         existingUser.save(function (error) {
//           if (error) return done(error)
//           done(error, existingUser)
//         })
//       } else {
//         User.findById(req.user._id, function (error, user) {
//           if (error) { return done(error) }
//           user.twitter = {
//             token: accessToken,
//             tokenSecret: tokenSecret,
//             id: profile.id
//           }
//           user.save(function (error) {
//             if (error) return done(error)
//             done(error, user)
//           })
//         })
//       }
//     })
//   } else {
//     done({
//       status: 400,
//       message: 'There is no account to link your twitter account too.'
//     })
//   }
// })

// Link GitHub
// var GitHubStrategy = require('passport-github').Strategy
// exports.passportGitHubStrategy = new GitHubStrategy({
//   clientID: process.env.GITHUB_ID,
//   clientSecret: process.env.GITHUB_SECRET,
//   callbackURL: '/api/auth/link/github/callback',
//   passReqToCallback: true
// }, function (req, accessToken, refreshToken, profile, done) {
//   if (req.user) {
//     User.findOne({ 'github.oid': profile.oid }, function (error, existingUser) {
//       if (error) return done(error)
//       if (existingUser) {
//         existingUser.github.token = accessToken
//         existingUser.github.refreshToken = refreshToken
//         existingUser.save(function (error) {
//           if (error) return done(error)
//           done(error, existingUser)
//         })
//       } else {
//         User.findById(req.user._id, function (error, user) {
//           if (error) { return done(error) }
//           user.github = {
//             token: accessToken,
//             refreshToken: refreshToken,
//             id: profile.id
//           }
//           user.save(function (error) {
//             if (error) return done(error)
//             done(error, user)
//           })
//         })
//       }
//     })
//   } else {
//     done({
//       status: 400,
//       message: 'There is no account to link your github account too.'
//     })
//   }
// })

// Link Google
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
// exports.passportGoogleStrategy = new GoogleStrategy({
//   clientID: process.env.GOOGLE_ID,
//   clientSecret: process.env.GOOGLE_SECRET,
//   callbackURL: '/api/auth/link/google/callback',
//   passReqToCallback: true
// }, function (req, accessToken, refreshToken, profile, done) {
//   if (req.user) {
//     User.findOne({ 'google.oid': profile.oid }, function (error, existingUser) {
//       if (error) return done(error)
//       if (existingUser) {
//         existingUser.google.token = accessToken
//         existingUser.google.refreshToken = refreshToken
//         existingUser.save(function (error) {
//           if (error) return done(error)
//           done(error, existingUser)
//         })
//       } else {
//         User.findById(req.user._id, function (error, user) {
//           if (error) { return done(error) }
//           user.google = {
//             token: accessToken,
//             refreshToken: refreshToken,
//             id: profile.id
//           }
//           user.save(function (error) {
//             if (error) return done(error)
//             done(error, user)
//           })
//         })
//       }
//     })
//   } else {
//     done({
//       status: 400,
//       message: 'There is no account to link your google account too.'
//     })
//   }
// })

// Link LinkedIn
// var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy
// exports.passportLinkedInStrategy = new LinkedInStrategy({
//   clientID: process.env.LINKEDIN_ID,
//   clientSecret: process.env.LINKEDIN_SECRET,
//   callbackURL: '/api/auth/link/linkedin/callback',
//   scope: ['r_basicprofile', 'r_emailaddress'],
//   passReqToCallback: true
// }, function (req, accessToken, refreshToken, profile, done) {
//   if (req.user) {
//     User.findOne({ 'linkedin.oid': profile.oid }, function (error, existingUser) {
//       if (error) return done(error)
//       if (existingUser) {
//         existingUser.linkedin.token = accessToken
//         existingUser.linkedin.refreshToken = refreshToken
//         existingUser.save(function (error) {
//           if (error) return done(error)
//           done(error, existingUser)
//         })
//       } else {
//         User.findById(req.user._id, function (error, user) {
//           if (error) { return done(error) }
//           user.linkedin = {
//             token: accessToken,
//             refreshToken: refreshToken,
//             id: profile.id
//           }
//           user.save(function (error) {
//             if (error) return done(error)
//             done(error, user)
//           })
//         })
//       }
//     })
//   } else {
//     done({
//       status: 400,
//       message: 'There is no account to link your linkedin account too.'
//     })
//   }
// })

// Link Instagram
// var InstagramStrategy = require('passport-instagram').Strategy
// exports.passportInstagramStrategy = new InstagramStrategy({
//   clientID: process.env.INSTAGRAM_ID,
//   clientSecret: process.env.INSTAGRAM_SECRET,
//   callbackURL: '/api/auth/link/instagram/callback',
//   passReqToCallback: true
// }, function (req, accessToken, refreshToken, profile, done) {
//   if (req.user) {
//     User.findOne({ 'instagram.oid': profile.oid }, function (error, existingUser) {
//       if (error) return done(error)
//       if (existingUser) {
//         existingUser.instagram.token = accessToken
//         existingUser.instagram.refreshToken = refreshToken
//         existingUser.save(function (error) {
//           if (error) return done(error)
//           done(error, existingUser)
//         })
//       } else {
//         User.findById(req.user._id, function (error, user) {
//           if (error) { return done(error) }
//           user.instagram = {
//             token: accessToken,
//             refreshToken: refreshToken,
//             id: profile.id
//           }
//           user.save(function (error) {
//             if (error) return done(error)
//             done(error, user)
//           })
//         })
//       }
//     })
//   } else {
//     done({
//       status: 400,
//       message: 'There is no account to link your instagram account too.'
//     })
//   }
// })

// For your company possibly
// var OpenIDStrategy = require('passport-openid').Strategy
