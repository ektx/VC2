<template>
  <transition 
    name="vc-message-fade" 
    @after-enter="handleAfterEnter"
    @before-leave="handleBeforeLeave"
    @afterLeave="handleAfterLeave"
  >
    <div 
      v-show="visible.value" 
      :class="['vc-message-inner', type, classes]"
    >
      <i :class="[`vc-icon-${type}`, type]"></i>
      
      <div v-if="useHtml" v-html="message"></div>
      <p v-else>{{ message }}</p>

      <i v-if="showClose" class="vc-icon-close" @click="closeEvt"></i>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    // 显示内容
    message: {
      type: [String, Number],
      default: ''
    },
    /**
     * @NoDoc
     * 控制显示
     */
    visible: Object,
    // 提醒样式
    // @arguments info / success / warning / error
    type: String,
    // 显示关闭按钮
    showClose: Boolean,
    // 使用 HTML 渲染
    useHtml: Boolean,
    // 自定义样式
    classes: {
      type: String,
      default: ''
    },
    // 显示时间, 毫秒。设为 0 则不会自动关闭
    duration: {
      type: Number,
      default: 3000
    }
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
