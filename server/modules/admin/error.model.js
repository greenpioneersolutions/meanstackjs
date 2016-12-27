var mongoose = require('mongoose')

var errorSchema = mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  code: {
    type: String,
    default: 'No Code'
  },
  message: {
    type: String,
    default: 'No message'
  },
  name: {
    type: String,
    default: 'No name'
  },
  stack: {
    type: String,
    default: 'No stack'
  },
  type: {
    type: String,
    default: 'exception'
  },
  count: {
    type: Number,
    default: 1
  },
  history: [{
    type: Date,
    default: Date.now
  }]
})

module.exports = errorSchema

