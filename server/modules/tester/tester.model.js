var mongoose = require('mongoose')

var testerSchema = mongoose.Schema({
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

var Tester = mongoose.model('Tester', testerSchema)
module.exports = {
  Tester: Tester
}
