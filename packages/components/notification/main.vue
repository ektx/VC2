<template>
  <transition 
    :name="`vc-notify-fade-${position}`"
    @after-leave="handleAfterLeave"
    @after-enter="handleAfterEnter"
  >
    <div 
      v-show="visible.value" 
      :class="['vc-notify-inner', position]"
      @mouseenter="mouseEnterEvt"
      @mouseleave="mouseLeaveEvt"
      @click="clickEvt"
    >
      <div class="vc-notify__icon">
        <i v-if="iconClasses" :class="[iconClasses, type]"/>
        <img v-else v-show="img" :src="img" />
      </div>
      <div class="vc-notify__group">
        <h3 v-show="title" class="vc-notify__title">
          <span>{{ title }}</span>
          <i class="vc-icon-close"  @click="closeEvt"/>
        </h3>
        <div class="vc-notify__content">
          <p>{{ message }}</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    id: Number,
    // 关闭功能
    close: Function,
    visible: Object,
    top: Object,
    bottom: Object,
    
    // === 以下为用户可控参考 ===
    // 定位
    position: String,
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 信息
    message: {
      type: String,
      default: ''
    },
    // 定义倾向性效果
    type: {
      type: String,
      default: ''
    },
    // 持续时间
    duration: {
      type: Number,
      default: 3000
    },
    icon: String,
    img: String,

    onClick: Function,
    onClose: Function
  },
  data () {
    return {
      timer: null
    }
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
  computed: {
    iconClasses () {
      let ico = ''

      if (this.type) {
        ico = `vc-icon-${this.type}`
      } else if (this.icon) {
        ico = this.icon
      }
      
      return ico
    }
  },
  methods: {
    closeEvt () {
      if (this.onClose) this.onClose()
      this.close(this.id)
    },
    mouseEnterEvt () {
      if (this.timer) clearTimeout(this.timer)
    },
    mouseLeaveEvt () {
      this.handleAfterEnter()
    },
    handleAfterLeave () {
      document.body.removeChild(this.$el.parentNode)
    },
    handleAfterEnter () {
      if (this.duration) {
        this.timer = setTimeout(this.closeEvt, this.duration)
      }
    },
    clickEvt () {
      if (this.onClick) this.onClick(this)
    }
  }
}
</script>
