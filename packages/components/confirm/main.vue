<template>
  <transition
    name="vc-fade-animate"
    @after-leave="handlerAfterLeave"
  >
    <div v-show="visible.value" class="vc-confirm">
      <transition name="vc-fade-down-animate">
        <div v-show="visible.value" class="vc-confirm-box">
          <div class="vc-confirm-box__header">
            <div class="vc-confirm-box__title">{{title}}</div>
            <i 
              class="vc-confirm-box__close-btn vc-icon-close" 
              @click="closeEvt"
            ></i>
          </div>
          <div class="vc-confirm-box__content">
            {{ message }}
          </div>
          <div class="vc-confirm-box__footer">

          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'VcConfirm',
  props: {
    visible: Object,
    title: {
      type: String,
      default: '标题'
    },
    message: String,
    type: {
      type: String,
      default: 'alert'
    },

    // === 功能字段
    close: Function,
    closed: Function,
  },
  methods: {
    closeEvt () {
      this.close()
    },
    handlerAfterLeave() {
      this.$emit('closed')
      this.closed()
    }
  }
}
</script>
