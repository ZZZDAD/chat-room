var userModel = require('../models/users')

module.exports = {
  save (data) {
    return new Promise((resolve, reject) => {
      userModel.create(data, (err, res) => {
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
      userModel.find(data, fields, options, (err, res) => {
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
      userModel.findOne(data, (err, res) => {
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
      userModel.findById(id, (err, res) => {
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
      userModel.update(conditions, update, (err, res) => {
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
      userModel.remove(conditions, (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    })
  }
}