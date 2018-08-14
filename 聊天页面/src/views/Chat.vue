<template>
  <div class="manage">
    <HeaderBar></HeaderBar>
    <UserList></UserList>
    <div class="pos">
      <Room></Room>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/header_bar/HeaderBar'
import UserList from '@/components/user_list/UserList'
import Room from '@/components/room/Room'

export default {
  components: {
    HeaderBar,
    UserList,
    Room
  },
  computed: {
    me () {
      return this.$store.getters.me
    }
  },
  mounted () {
    this.$socket.emit('saveSocket', this.me.id)
  }
}
</script>

<style lang="scss">
.manage {
  .pos {
    position: fixed;
    top: 60px;
    right: 0;
    left: 200px;
    bottom: 0;
  }
}
</style>
