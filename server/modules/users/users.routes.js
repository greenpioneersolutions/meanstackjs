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
  app.get('/auth/azureOAuth',

    passport.authenticate('azuread-openidconnect', {
      failureRedirect: '/login'
    }),
    function (req, res) {
      console.log('made it here')
      // The request will be redirected to SharePoint for authentication, so
      // this function will not be called.
    })

  app.get('/auth/redirect-uri',

    passport.authenticate('azuread-openidconnect', {
      failureRedirect: '/login'
      // refreshToken: azureOAuth_RefreshToken
    }),
    function (req, res) {
      console.log('made it hereeeee')
      // Successful authentication, redirect home.
      res.redirect('/')
    })

  app.post('/auth/openid/return',
  passport.authenticate('azuread-openidconnect', { failureRedirect: '/', session: false }),
  function (req, res) {
    // res.redirect('/')
    res.send('successful authentication redirect')
  })

  app.get('/auth/openid/logout', function (req, res) {
    req.logout()
  // res.redirect('/')

    res.send('logout redirect')
  })
}
