<template>
  <div class="room_header">
    <span v-show="target.username">
      正在与
      <span class="name"> {{ target.username }} </span>
      聊天
    </span>
    <span v-show="!target.username">
      未选择聊天对象
    </span>

  </div>
</template>

<script>
export default {
  computed: {
    target () {
      return this.$store.getters.target
    }
  }
}
</script>

<style lang="scss">
.room_header {
  text-align: left;
  border-bottom: 1px solid #e6e6e6;
  padding: 5px 20px;
  .name {
    font-weight: 600;
    font-size: 1.1em;
  }
}
</style>
