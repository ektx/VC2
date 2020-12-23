<template>
  <div :class="['vc-collapse-item', {'is-open': isOpen, 'is-disabled': disabled}]">
    <div class="vc-collapse-item__header" @click="toggleEvt">
      <div class="vc-collapse-item__title">
        <slot name="title">{{ title }}</slot>
      </div>
      <i :class="['vc-collapse-item__icon vc-icon-arrow-right', {'is-open': isOpen}]"></i>
    </div>

    <div class="vc-collapse-item__wrap" :style="_contentStyle" @transitionend="transitionend">
      <div class="vc-collapse-item__content">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VcCollapseItem',
  props: {
    // 唯一标志符
    value: {
      type: [String, Number],
      default: ''
    },
    // 面板标题
    title: String,
    // 是否禁用
    disabled: Boolean
  },
  inject: ['vcCollapse'],
  data() {
    return {
      _contentStyle: {
        height: 0
      },
    }
  },
  computed: {
    isOpen () {
      return this.vcCollapse.value.includes(this.value)
    }
  },
  watch: {
    isOpen: {
      handler (val) {
        setTimeout(() =>{
          let { scrollHeight: H } = this.$el.querySelector('.vc-collapse-item__wrap')
    
          this._contentStyle.height = H + 'px'

          if (!val) {
            requestAnimationFrame(() => {
              this._contentStyle.height = '0px'
            })
          }
        })
      },
      immediate: true
    }
  },
  methods: {
    toggleEvt () {
      if (this.disabled) return
      this.vcCollapse.itemClick(this)
    },
    transitionend() {
      if (this.isOpen)
        this._contentStyle.height = 'auto'
    }
  }
}
</script>
