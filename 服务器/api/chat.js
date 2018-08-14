var chatModel = require('../models/chats')

module.exports = {
  save (data) {
    return new Promise((resolve, reject) => {
      chatModel.create(data, (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    })
  },
  find (data, fields, options = {}) {
    return new Promise((resolve, reject) => {
      chatModel.find(data, fields, options, (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    })
  },
  findOne (data) {
    return new Promise((resolve, reject) => {
      chatModel.findOne(data, (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    })
  },
  findById (id) {
    return new Promise((resolve, reject) => {
      chatModel.findById(id, (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    })
  },
  update (conditions, update) {
    return new Promise((resolve, reject) => {
      chatModel.update(conditions, update, (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    })
  },
  remove (conditions) {
    return new Promise((resolve, reject) => {
      chatModel.remove(conditions, (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    })
  }
}