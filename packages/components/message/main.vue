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
    message: {
      type: String,
      default: ''
    },
    visible: Object,
    // 提醒样式
    type: String,
    // 显示关闭按钮
    showClose: Boolean,
    // 使用 HTML 渲染
    useHtml: Boolean,
    // 自定义样式
    classes: {
      type: String,
      default: ''
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
