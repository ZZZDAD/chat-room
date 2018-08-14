var userApi = require('../api/user')
var chatApi = require('../api/chat')

var user = []

module.exports = function (io) {
  io.on('connection', socket => {
    console.log('have connect')

    // 存入socket单播地址
    socket.on('saveSocket', _id => {
      user[_id] = socket
    })

    // 发送信息
    socket.on('sendMessage', item => {
      console.log(item)
      const from = item.from
      const to = item.to
      const message = item.message

      // 对方接收
      if (user[to]) {
        user[to].emit('receiveMessage', item)
      }


      chatApi.save(item)

      // 传回给自己
      user[from].emit('sendMessage', item)
    })

    // 收到信息
    socket.on('receiveMessage', item => {
      const from = item.from
      const to = item.to

      setTimeout(() => {
        chatApi.remove({
          from: from,
          to: to
        })
      }, 1000)
    })

  })
}