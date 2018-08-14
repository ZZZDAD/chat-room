<template>
  <div class="headerBar">
    <span @click='logOut'>
      <i class="el-icon-back"></i>
      注销账号
    </span>
    聊天平台
    <span class="user"> 用户：{{ me.username }} </span>
  </div>
</template>

<script>
export default {
  computed: {
    me () {
      return this.$store.getters.me
    }
  },
  methods: {
    logOut () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
.headerBar {
  border-bottom: solid 1px #e6e6e6;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  font-size: 1.3em;
  text-align: left;
  line-height: 60px;
  padding-left: 20px;
  span {
    font-size: 0.7em;
    opacity: 0.7;
    margin-right: 100px;
    &:hover {
      opacity: 1;
    }
  }
  .user {
    margin-left: 100px;
  }
}
</style>
