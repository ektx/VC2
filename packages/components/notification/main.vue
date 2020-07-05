<template>
  <transition name="vc-notify-fade">
    <div 
      v-show="visible.value" 
      class="vc-notify-inner"
    >
      Notify
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    visible: Object,
  }
}
</script>

<style lang="less">
.vc-notification-box {
  position: fixed;
  top: 0;
  z-index: 3000;
}
.vc-notify-inner {
  margin: 5px;
  width: 300px;
  border-radius: 3px;
  backdrop-filter: saturate(180%) blur(20px);
  background-color: rgba(255,255,255,0.72);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, .3);
  transition: opacity .3s, transform .4s;
}
.vc-notify-fade-enter-from,
.vc-notify-fade-leave-to {
  opacity: 0;
  transform: translate(0%, -100%);
}
</style>