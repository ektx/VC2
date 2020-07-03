<template>
  <transition 
    name="vc-message-fade" 
    @after-enter="handleAfterEnter"
    @before-leave="handleBeforeLeave"
    @afterLeave="handleAfterLeave"
  >
    <div v-show="visible.value" :class="['vc-message-inner', type]">
      <i :class="[`vc-icon-${type}`, type]"></i>
      <p>{{ message }}</p>

      <i v-if="showClose" class="vc-icon-close" @click="closeEvt"></i>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: ''
    },
    visible: Object,
    type: String,
    showClose: Boolean
  },
  methods: {
    handleAfterLeave () {
      document.body.querySelector('.vc-message-box').removeChild(this.$el.parentNode)
    },
    handleAfterEnter () {
      let H = this.$el.parentNode.scrollHeight
      this.$el.parentNode.style.height = H + 'px'
    },
    handleBeforeLeave () {
      this.$el.parentNode.style.height = '0px'
    },
    closeEvt () {
      this.visible.value = false
    }
  }
}
</script>
