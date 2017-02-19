exports.createKey = createKey
exports.checkKey = checkKey

var mongoose = require('mongoose')
var User = mongoose.model('users')
var settings = require('../configs/settings').get()
var jwt = require('jsonwebtoken')
var debug = require('debug')('meanstackjs:users')

function createKey (user, apikey) {
  return jwt.sign({
    _id: user._id
  }, apikey || user.apikey, settings.jwt.options)
}

function checkKey (token, cb) {
  var decoded = jwt.decode(token, {complete: true})
  if (!decoded) return cb({message: 'Nothing to decode'})
  if (!decoded.payload) return cb({message: 'No payload to decode'})
  if (!decoded.payload._id) return cb({message: 'No user id was found in decode'})
  User.findOne({
    _id: decoded.payload._id
  }, function (error, user) {
    if (error) throw error
    if (!user) {
      cb({message: 'Authentication failed. User not found.'})
    } else {
      debug('middleware verify user: ', user.email)
      jwt.verify(token, user.apikey, function (error, decoded) {
        if (error) {
          debug('middleware verify error: ', error)
          switch (error.name) {
            case 'TokenExpiredError':
              cb({message: 'It appears your token has expired'}) // Date(error.expiredAt)
              break
            case 'JsonWebTokenError':
              cb({message: 'It appears you have invalid signature Token Recieved:' + token})
              break
          }
        } else {
          cb(null, user)
        }
      })
    }
  })
}
