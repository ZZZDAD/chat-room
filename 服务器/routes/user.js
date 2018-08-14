var express = require('express')
var userApi = require('../api/user')
var md5 = require('js-md5')

var router = express.Router()

// 登录
router.post('/login', (req, res, next) => {
  userApi.findOne({
    username: req.body.username,
    password: md5(req.body.password)
  }).then(result => {
    if (result) {
      res.json({
        code: 200,
        message: 'success',
        data: result
      })
    } else {
      res.json({
        code: 100,
        message: 'error'
      })
    }
  })
})

// 注册
router.post('/register', (req, res, next) => {
  userApi.save({
    username: req.body.username,
    password: md5(req.body.password)
  }).then(result => {
    if (result) {
      res.json({
        code: 200,
        message: 'success'
      })
    } else {
      res.json({
        code: 100,
        message: 'error'
      })
    }
  })
})

// 所有用户列表
router.get('/all_user', (req, res, next) => {
  userApi.find({
    username: new RegExp('')
  }).then(result => {
    if (result) {
      res.json({
        code: 200,
        message: 'success',
        data: result
      })
    } else {
      res.json({
        code: 100,
        message: 'error',
        data: {}
      })
    }
  })
})

module.exports = router;