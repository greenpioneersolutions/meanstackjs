var mongoose = require('mongoose')

var errorSchema = mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  level: {
    type: String,
    default: 'error'
  },
  message: {
    type: String,
    default: 'No message'
  },
  meta: {}
})

module.exports = errorSchema
