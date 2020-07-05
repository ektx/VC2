<template>
  <transition 
    :name="`vc-notify-fade-${position}`"
    @after-leave="handleAfterLeave"
  >
    <div 
      v-show="visible.value" 
      :class="['vc-notify-inner', position]"
      @click="closeEvt"
    >
      Notify
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    id: Number,
    visible: Object,
    top: Object,
    bottom: Object,
    close: Function,
    position: String,
  },
  watch: {
    top: {
      handler (val) {
        this.$el.parentNode.style.top = val.value + 'px'
      },
      deep: true
    },
    bottom: {
      handler (val) {
        this.$el.parentNode.style.bottom = val.value + 'px'
      },
      deep: true
    },
  },
  methods: {
    closeEvt () {
      this.close(this.id)
    },
    handleAfterLeave () {
      document.body.removeChild(this.$el.parentNode)
    }
  }
}
</script>

<style lang="less">
.vc-notification {
  position: fixed;
  z-index: 3000;
  transition: top .4s, bottom .4s;
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
.vc-notify-fade-top-right-enter-from,
.vc-notify-fade-top-right-leave-to {
  opacity: 0;
  transform: translate(100%, -100%);
}
.vc-notify-fade-top-left-enter-from,
.vc-notify-fade-top-left-leave-to {
  opacity: 0;
  transform: translate(-100%, -100%);
}
.vc-notify-fade-bottom-right-enter-from,
.vc-notify-fade-bottom-right-leave-to {
  opacity: 0;
  transform: translate(100%, 100%);
}
.vc-notify-fade-bottom-left-enter-from,
.vc-notify-fade-bottom-left-leave-to {
  opacity: 0;
  transform: translate(-100%, 100%);
}
</style>