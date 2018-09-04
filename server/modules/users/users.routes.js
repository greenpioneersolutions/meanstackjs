const user = require('./users.controller.js')
const { check } = require('express-validator/check')

const checkLoginInformationChecks = [
  check('email').isEmail().withMessage('Your Email is not valid'),
  check('password').exists().withMessage('Password cannot be blank')
]
const postForgotChecks = [
  check('email').isEmail().withMessage('Your Email is not valid')
]
const postResetChecks = [
  check('password').exists().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  check('confirmPassword').exists().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
]
const postSignupChecks = [
  check('email').isEmail().withMessage('Your Email is not valid'),
  // check('profile').exists().withMessage('profile cannot be blank'),
  check('password').exists().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  // check('confirmPassword').exists().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
]
const putUpdatePasswordChecks = [
  check('password').exists().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  check('confirmPassword').exists().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
]

module.exports = (app, auth, mail, settings, models, logger) => {
  app.post('/api/user/authenticate', checkLoginInformationChecks, user.checkLoginInformation, user.postAuthenticate)
  app.get('/api/user/authenticate', user.getAuthenticate)
  app.post('/api/user/logout', user.logout)
  app.post('/api/user/forgot', postForgotChecks, user.postForgot)
  app.get('/api/user/reset/:token', user.getReset)
  app.post('/api/user/reset/:token', postResetChecks, user.postReset)
  app.post('/api/user/signup', postSignupChecks, user.postSignup)
  app.put('/api/user/profile', auth.isAuthenticated, user.putUpdateProfile)
  app.put('/api/user/password', auth.isAuthenticated, putUpdatePasswordChecks, user.putUpdatePassword)
  app.delete('/api/user/delete', auth.isAuthenticated, user.deleteDeleteAccount)
  app.get('/api/user/token', auth.isAuthenticated, user.getKey)
  app.post('/api/user/token', checkLoginInformationChecks, user.checkLoginInformation, user.postKey)
  app.get('/api/user/token/reset', auth.isAuthenticated, user.getKeyReset)
}
