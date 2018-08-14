var express = require('express')
var chatApi = require('../api/chat')

var router = express.Router()

// 查找收信
router.post('/find_message', (req, res, next) => {
  chatApi.find({
    to: req.body.to
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

// 获取某人的信息
router.post('/message_from_one', (req, res, next) => {
  chatApi.find({
    from: req.body.from,
    to: req.body.to
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

// 移除信息
// router.get('/delete_message', (req, res, next) => {
//   chatApi.remove({
//     from: req.body.from,
//     to: req.body.to
//   }).then(result => {
//     if (result) {
//       res.json({
//         code: 200,
//         message: 'success'
//       })
//     } else {
//       res.json({
//         code: 100,
//         message: 'error'
//       })
//     }
//   })
// })

module.exports = router