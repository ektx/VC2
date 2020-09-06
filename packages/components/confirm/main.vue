<template>
  <transition
    name="vc-fade-animate"
    @after-leave="handlerAfterLeave"
  >
    <div 
      v-show="visible.value" 
      class="vc-confirm" 
      @click="closeEvt('close', 'modal')"
    >
      <transition name="vc-fade-down-animate">
        <div v-show="visible.value" class="vc-confirm-box">
          <div class="vc-confirm-box__header">
            <div class="vc-confirm-box__title">{{title}}</div>
            <i 
              v-if="showClose"
              class="vc-confirm-box__close-btn vc-icon-close" 
              @click="closeEvt('close', 'icoBtn')"
            ></i>
          </div>
          <div class="vc-confirm-box__content">
            {{ message }}
          </div>
          <div class="vc-confirm-box__footer">
            <vc-button
              v-for="btn in _buttons"
              :key="btn.label"
              :color="btn.color"
              @click="btn.func"
            >{{ btn.label }}</vc-button>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import vcButton from '../button/index.vue'

export default {
  name: 'VcConfirm',
  components: { vcButton },
  props: {
    // 标题
    title: {
      type: String,
      default: '标题'
    },
    // 显示信息
    message: String,
    // 类型
    type: {
      type: String,
      default: 'alert'
    },
    // 自定义按钮功能
    buttons: {
      type: Array,
      default: () => ([])
    },
    // 是否显示右上角关闭按钮
    showClose: {
      type: Boolean,
      default: true
    },
    // 是否可以通过点击 modal 关闭
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    // === 功能字段
    visible: Object,
    close: Function,
    closed: Function,
    resolve: Function,
    reject: Function
  },
  computed: {
    _buttons () {
      if (this.buttons.length) {
        return this.buttons
      } else {
        let result = [
          {
            label: '确认',
            color: 'primary',
            func: this.confirmEvt
          }
        ]

        if (this.type !== 'alert') {
          result.unshift({
            label: '取消',
            func: () => this.closeEvt('cancel')
          })
        }

        return result
      }
    }
  },
  methods: {
    closeEvt (data = '', el) {
      // 点击的是背景，同时不允许点击背景关闭时
      if (el === 'modal' && !this.closeOnClickModal) return

      this.reject(data)
    },
    handlerAfterLeave() {
      this.$emit('closed')
      this.closed()
    },
    confirmEvt() {
      console.log('点击了确认')
      this.close('confirm')
    }
  }
}
</script>
