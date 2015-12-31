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

var __Name__ = mongoose.model('__Name__', __name__Schema)
module.exports = {
  __Name__: __Name__
}
