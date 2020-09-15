<template>
  <transition
    name="vc-fade-animate"
    @after-leave="handlerAfterLeave"
  >
    <div 
      v-show="visible.value" 
      class="vc-confirm" 
      @click.self="closeEvt('close', 'modal')"
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
            <p>{{ message }}</p>
            <div v-if="type === 'prompt'" class="vc-confirm-box__prompt">
              <input 
                :class="['vc-confirm-box__prompt-input', {'is-error': errorMsg.length}]" 
                type="text"
                v-model="promptVal"
              />
              <p class="vc-confirm-box__prompt-error">{{ errorMsg }}</p>
            </div>
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
    // prompt 时，输入时调用方法
    update: Function,
    // === 功能字段
    visible: Object,
    close: Function,
    closed: Function,
    resolve: Function,
    reject: Function
  },
  data() {
    return {
      promptVal: '',
      errorMsg: ''
    }
  },
  watch: {
    promptVal(val) {
      if (this.type === 'prompt' && this.update) {
        this.errorMsg = this.update(val) || ''
      }
    }
  },
  computed: {
    _buttons () {
      if (this.buttons.length) {
        return this.buttons.map(btn => ({
          ...btn,
          func: () => {
            let result = btn.func(this.visible.value)
            !result && this.close()
          }
        }))
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
      if (this.type === 'prompt') {
        if (!this.errorMsg.length) this.close(this.promptVal)
      } else {
        this.close('confirm')
      }
    }
  }
}
</script>
