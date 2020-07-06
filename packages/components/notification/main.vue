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
    >
      <div class="vc-notify__icon">
        <i v-show="iconClasses" :class="iconClasses"/>
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
    }
  },
  data () {
    return {
      timer: null,
      // iconClasses: ''
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
      return this.type ? `vc-icon-${this.type}` : ''
    }
  },
  methods: {
    closeEvt () {
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
  display: flex;
  margin: 5px;
  padding: 5px;
  width: 300px;
  border-radius: 3px;
  backdrop-filter: saturate(180%) blur(20px);
  background-color: rgba(255,255,255,0.72);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, .3);
  transition: opacity .3s, transform .4s;
}
.vc-notify__group {
  flex: 1;
  margin-left: 5px;
}
.vc-notify__title {
  display: flex;
  // margin-bottom: 5px;
  font-size: 16px;
  color: #333;

  span {
    flex: 1;
  }

  .vc-icon-close {
    opacity: 0;
    cursor: pointer;
    transition: opacity .3s;

    .vc-notification:hover & {
      opacity: .5;

      &:hover {
        opacity: 1;
      }
    }
  }
}
.vc-notify__content {
  color: #666;
  font-size: 14px;
}
.vc-notify__icon {
  display: flex;
  // margin-left: 5px;
  justify-content: center;
  align-items: center;

  i {
    width: 40px;
    font-size: 24px;
    text-align: center;

    &.vc-icon-info {
      color: #09f;
    }
    &.vc-icon-success {
      color: #4CAF50;
    }
    &.vc-icon-warning {
      color: #FF9800;
    }
    &.vc-icon-error {
      color: #ff4d4f;
    }
  }
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