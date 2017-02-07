var mongoose = require('mongoose')
var settings = require('../configs/settings').get()
var jwt = require('jsonwebtoken')
var debug = require('debug')('meanstackjs:users')

exports.createKey = function (user, apikey) {
  return jwt.sign({
    _id: user._id
  }, apikey || user.apikey, settings.jwt.options)
}

exports.checkKey = function (token, cb) {
  var User = mongoose.model('users')
  var decoded = jwt.decode(token, {complete: true})
  if (!decoded) return cb({msg: 'Nothing to decode'})
  if (!decoded.payload) return cb({msg: 'No payload to decode'})
  if (!decoded.payload._id) return cb({msg: 'No user id was found in decode'})
  User.findOne({
    _id: decoded.payload._id
  }, function (err, user) {
    if (err) throw err
    if (!user) {
      cb({msg: 'Authentication failed. User not found.'})
    } else {
      debug('middleware verify user: ', user.email)
      jwt.verify(token, user.apikey, function (err, decoded) {
        if (err) {
          debug('middleware verify error: ', err)
          switch (err.name) {
            case 'TokenExpiredError':
              cb({msg: 'It appears your token has expired'}) // Date(err.expiredAt)
              break
            case 'JsonWebTokenError':
              cb({msg: 'It appears you have invalid signature Token Recieved:' + token})
              break
          }
        } else {
          cb(null, user)
        }
      })
    }
  })
}
