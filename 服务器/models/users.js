var mongoose = require('../lib/mongo')

var UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  }
)
var UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel