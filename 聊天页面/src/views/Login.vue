<template>
  <div class="login">
    <img src="../../static/images/logo.png" class="logo">
    <h1 class="title"> 聊天平台 </h1>
    <el-form>
      <el-form-item
        label="用户名"
        label-width="60px">
        <el-input
          v-model="username"
          auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        label-width="60px">
        <el-input
          type='password'
          v-model="password"
          auto-complete="off"></el-input>
      </el-form-item>
    </el-form>

    <el-button
      class="loginBtn"
      @click='toLogin'
      type="primary"> 登录 </el-button>

    <el-button
      class="registerBtn"
      @click='toRegister'> 注册 </el-button>
  </div>
</template>

<script>
import { login, register } from '@/api/article.js'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    toLogin () {
      if (this.username && this.password) {
        login({
          username: this.username,
          password: this.password
        }).then(response => {
          const data = response.data
          if (data.code == 200) {
            console.log(data.data)
            this.$store.dispatch('GetMe', {
              id: data.data._id,
              username: data.data.username
            })
            this.$router.push('/chat')
            this.$message({
              showClose: true,
              message: '登录成功',
              type: 'success'
            })
          } else {
            this.$message({
              showClose: true,
              message: '账号密码出错',
              type: 'error'
            })
          }
        })
      } else {
        this.$message({
          showClose: true,
          message: '请输入账号密码',
          type: 'warning'
        })
      }
    },
    toRegister () {
      if (this.username && this.password) {
        register({
          username: this.username,
          password: this.password
        }).then(response => {
          const data = response.data
          if (data.code == 200) {
            this.$message({
              showClose: true,
              message: '注册成功',
              type: 'success'
            })
          }
        })
      } else {
        this.$message({
          showClose: true,
          message: '请输入账号密码',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style lang="scss">
.login {
  .logo {
    width: 200px;
    display: block;
    margin: 0 auto;
    margin-top: 50px;
    margin-bottom: 10px;
  }
  .el-form {
    display: block;
    margin: 0 auto;
    width: 30%;
    .el-input {
      max-width: 250px;
    }
  }
  .loginBtn,
  .registerBtn {
    padding: 8px 30px;
    border-radius: 8px;
    display: inline-block;
    margin: 20px auto;
    position: relative;
    left: 10px;
  }
}
</style>
