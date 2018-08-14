var mongoose = require('mongoose')

const DB_URL = 'mongodb://localhost:27017/chat'
const options = {
  autoIndex: false
}

mongoose.connect(DB_URL, options, error => {
  return new Promise((resolve, reject) => {
    if (!error) {
      resolve()
    } else {
      reject(error)
    }
  })
})

module.exports = mongoose