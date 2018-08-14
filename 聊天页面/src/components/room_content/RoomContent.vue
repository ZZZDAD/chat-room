<template>
  <div class="room_content">
    <div
      class="content_item"
      :class="{'own':(item.from==me.id)}"
      v-for="item in chatContent"
      :key="item">
      <img class="avatar" src="../../../static/images/avatar.png" alt="avatar">
      <span class="message"> {{ item.message }} </span>
    </div>
  </div>
</template>

<script>
import { message_from_one } from '@/api/article.js'

export default {
  data () {
    return {
      chatContent: []
    }
  },
  computed: {
    me () {
      return this.$store.getters.me
    },
    target () {
      return this.$store.getters.target
    }
  },
  watch: {
    target: {
      handler (val) {
        this.chatContent = []

        // 获取本地缓存的聊天记录
        if (JSON.parse(localStorage.getItem('from:' + this.me.id + ' to:' + val.id))) {
          var histroy = JSON.parse(localStorage.getItem('from:' + this.me.id + ' to:' + val.id))
          this.chatContent = histroy
        }

        // 获取未读消息
        this.getMessage()
        this.deleteMessage()
      },
      immediate: true
    },
    chatContent (val) {
      // 本地缓存聊天记录
      if (JSON.stringify(val) != '[]') {
        // console.log(JSON.stringify(val))
        localStorage.setItem('from:' + this.me.id + ' to:' + this.target.id, JSON.stringify(val))
      }
    }
  },
  sockets: {
    sendMessage (item) {
      if (item.to == this.target.id) {
        this.chatContent.push({
          from: item.from,
          message: item.message
        })
      }
    },
    receiveMessage (item) {
      if (item.from == this.target.id) {
        this.chatContent.push({
          from: item.from,
          message: item.message
        })
        this.deleteMessage()
      }
    }
  },
  methods: {
    getMessage () {
      message_from_one({
        from: this.target.id,
        to: this.me.id
      }).then(response => {
        const data = response.data
        if (data.code == 200) {
          for (var i in data.data) {
            this.chatContent.push(data.data[i])
          }
        }
      })
    },
    deleteMessage () {
      this.$socket.emit('receiveMessage', {
        from: this.target.id,
        to: this.me.id
      })
    }
  }
}
</script>

<style lang="scss">
.room_content {
  padding: 20px;
  text-align: left;
  position: absolute;
  left: 0;
  right: 0;
  top: 30px;
  bottom: 60px;
  overflow: scroll;
  .content_item {
    overflow: hidden;
    margin-bottom: 10px;
    &.own {
      .avatar {
        vertical-align: center;
        width: 30px;
        height: 30px;
        float: right;
      }
      .message {
        float: right;
      }
    }
    .avatar {
      vertical-align: top;
      width: 30px;
      height: 30px;
    }
    .message {
      margin: 0 10px;
      position: relative;
      top: 5px;
    }
  }
}
</style>
