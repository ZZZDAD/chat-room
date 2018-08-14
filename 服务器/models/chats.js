var mongoose = require('../lib/mongo')

var ChatSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  }
)
var ChatModel = mongoose.model('chat', ChatSchema)

module.exports = ChatModel