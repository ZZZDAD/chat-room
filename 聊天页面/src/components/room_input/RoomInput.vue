<template>
  <div class="room_input">
    <el-input
      v-model="input"
      placeholder="请输入内容"
      type='textarea'
      resize='none'
      class="input"></el-input>
    <el-button
      type="primary"
      plain
      @click='send'
      class="send_btn"> 发送 </el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input: ''
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
  methods: {
    send () {
      if (this.input.length > 0) {
        this.$socket.emit('sendMessage', {
          from: this.me.id,
          to: this.target.id,
          message: this.input
        })
        this.input = ''
      } else {
        this.$message({
          showClose: true,
          message: '发送内容不能为空',
          type: 'error'
        })
      }
    }
  }
}
</script>

<style lang="scss">
.room_input {
  width: 100%;
  position: absolute;
  bottom: 0;
  .input {
    width: 80%;
    vertical-align: top;
    height: 60px;
    padding: 0;
  }
  .send_btn {
    width: 19%;
    height: 60px;
  }
}
</style>
