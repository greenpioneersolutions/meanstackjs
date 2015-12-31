var mongoose = require('mongoose')
var exampleSchema = mongoose.Schema({
  tester: {
    type: String,
    default: ''
  }
})
var Example = mongoose.model('Example', exampleSchema)
module.exports = {
  Example: Example
}
