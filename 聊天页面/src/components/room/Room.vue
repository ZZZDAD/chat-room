<template>
  <div class="room">
    <RoomHeader></RoomHeader>
    <RoomContent></RoomContent>
    <RoomInput></RoomInput>
  </div>
</template>

<script>
import RoomHeader from '@/components/room_header/RoomHeader.vue'
import RoomContent from '@/components/room_content/RoomContent.vue'
import RoomInput from '@/components/room_input/RoomInput.vue'

export default {
  components: {
    RoomHeader,
    RoomContent,
    RoomInput
  }

}
</script>

<style lang="scss">
.room {
  position: relative;
  height: 100%;
}
</style>

