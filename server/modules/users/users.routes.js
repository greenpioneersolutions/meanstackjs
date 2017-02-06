var user = require('./users.controller.js')
var multer = require('multer')
var upload = multer({ dest: 'client/uploads/' })

module.exports = function (app, auth, mail, settings, models) {
  app.post('/api/user/photos/upload', upload.single('file'), user.postPhoto)
  app.post('/api/user/authenticate', user.checkLoginInformation, user.postAuthenticate)
  app.get('/api/user/authenticate', user.getAuthenticate)
  app.get('/api/user/logout', user.logout)
  app.post('/api/user/forgot', user.postForgot)
  app.get('/api/user/reset/:token', user.getReset)
  app.post('/api/user/reset/:token', user.postReset)
  app.post('/api/user/signup', user.postSignup)
  app.put('/api/user/profile', auth.isAuthenticated, user.putUpdateProfile)
  app.put('/api/user/password', auth.isAuthenticated, user.putUpdatePassword)
  app.delete('/api/user/delete', auth.isAuthenticated, user.deleteDeleteAccount)
  // ADD/GET ROLE
  // app.get('/api/user/role', user.postKey)
  // app.post('/api/user/role/:role', user.postKey)
  // API KEY
  app.get('/api/user/token', auth.isAuthenticated, user.getKey)
  app.post('/api/user/token', user.checkLoginInformation, user.postKey)
  app.get('/api/user/token/reset', auth.isAuthenticated, user.getKeyReset)
  // AZURE
  // app.get('/api/azure/user', auth.isAuthenticated, user.getUserAzure)
  // app.get('/api/auth/link/azure', auth.isAuthenticated, passport.authenticate('azuread-openidconnect', {failureRedirect: '/account'}))
  // app.post('/api/auth/link/azure/callback', auth.isAuthenticated, passport.authenticate('azuread-openidconnect', { failureRedirect: '/account', session: false }), user.postCallbackAzure)
  // app.get('/api/auth/unlink/azure', auth.isAuthenticated, user.getUnlinkAzure)
}
