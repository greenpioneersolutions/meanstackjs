var user = require('./users.controller.js')
var multer = require('multer')
var passport = require('passport')
var upload = multer({ dest: 'client/uploads/' })

module.exports = function (app, auth, mail, settings, models) {
  app.post('/api/photos/upload', upload.single('file'), user.postPhoto)
  app.post('/api/authenticate', user.postAuthenticate)
  app.get('/api/authenticate', user.getAuthenticate)
  app.post('/api/login', user.postLogin)
  app.get('/api/logout', user.logout)
  app.post('/api/forgot', user.postForgot)
  app.get('/api/reset/:token', user.getReset)
  app.post('/api/reset/:token', user.postReset)
  app.post('/api/signup', user.postSignup)
  app.put('/api/account/profile', auth.isAuthenticated, user.putUpdateProfile)
  app.put('/api/account/password', auth.isAuthenticated, user.putUpdatePassword)
  app.delete('/api/account/delete', auth.isAuthenticated, user.deleteDeleteAccount)

  // AZURE
  app.get('/api/azure/user', auth.isAuthenticated, user.getUserAzure)
  app.get('/api/auth/link/azure', auth.isAuthenticated, passport.authenticate('azuread-openidconnect', {failureRedirect: '/account'}))
  app.post('/api/auth/link/azure/callback', auth.isAuthenticated, passport.authenticate('azuread-openidconnect', { failureRedirect: '/account', session: false }), user.postCallbackAzure)
  app.get('/api/auth/unlink/azure', auth.isAuthenticated, user.getUnlinkAzure)
}
