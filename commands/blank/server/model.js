var mongoose = require('mongoose')

var <%= name %>Schema = mongoose.Schema({
  <%= name %>: {
    type: String
  }
})

module.exports = <%= name %>Schema
