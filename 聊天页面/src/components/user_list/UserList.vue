<template>
  <div class="user_list">
    <div
      class="item"
      :class="{'active':(target.id==item._id)}"
      v-for="item in userList"
      :key="item"
      @click='clickUser(item)'
      v-show="me.id!=item._id">
      <el-badge
        :value="item.new"
        :max="99">
        <div class="name"> {{ item.username }} </div>
      </el-badge>
    </div>
  </div>
</template>

<script>
import { all_user, find_message } from '@/api/article.js'

export default {
  data () {
    return {
      userList: []
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
  sockets: {
    receiveMessage (item) {
      if (item.from != this.target.id) {
        for (var i in this.userList) {
          if (item.from == this.userList[i]._id) {
            this.userList[i].new++
          }
        }
      }
    }
  },
  mounted () {
    this.initUserList()
    setTimeout(() => {
      this.getNewMessage()
    }, 500)


  },
  methods: {
    // 初始化用户列表
    initUserList () {
      all_user().then(response => {
        const data = response.data
        if (data.code == 200) {
          for (var i in data.data) {
            this.userList.push({
              _id: data.data[i]._id,
              username: data.data[i].username,
              new: 0
            })
          }
        }
      })
    },
    getNewMessage () {
      find_message({
        to: this.me.id
      }).then(response => {
        const data = response.data
        if (data.code == 200) {
          for (var i in data.data) {
            console.log(data.data[i])
            for (var j in this.userList) {
              if (this.userList[j]._id == data.data[i].from) {
                this.userList[j].new++
                console.log(this.userList[j]._id)
              }
            }
          }
        }
      })
    },
    // 点击用户聊天
    clickUser (item) {
      this.$store.dispatch('GetTarget', {
        id: item._id,
        username: item.username
      })
      // 新消息提醒清零
      var index = this.userList.indexOf(item)
      this.userList[index].new = 0
    }
  }
}
</script>

<style lang="scss">
.user_list {
  position: fixed;
  left: 0;
  top: 60px;
  bottom: 0;
  width: 200px;
  border-right: 1px solid #e6e6e6;
  .item {
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 5px;
    border-bottom: 1px solid #e6e6e6;
    cursor: hand;
    cursor: pointer;
    &:hover {
      background: rgba($color: #e6e6e6, $alpha: 0.4);
    }
    &:active {
      background: rgba($color: #e6e6e6, $alpha: 1);
    }
    &.active {
      background: rgba($color: #e6e6e6, $alpha: 1);
    }
    .el-badge {
      margin-top: 5px;
      .name {
        position: relative;
        top: -10px;
      }
    }
  }
}
</style>
