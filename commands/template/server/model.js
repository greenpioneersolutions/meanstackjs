var mongoose = require('mongoose')

var __name__Schema = mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    trim: true
  },
  content: {
    type: String,
    trim: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'user'
  }
})

module.exports = __name__Schema
