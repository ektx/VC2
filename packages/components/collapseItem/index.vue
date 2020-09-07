<template>
  <div :class="['vc-collapse-item', {'is-open': isOpen}]">
    <div class="vc-collapse-item__header" @click="toggleEvt">
      <div class="vc-collapse-item__title">{{ title }}</div>
      <i class="vc-collapse-item__icon vc-icon-arrow-right"></i>
    </div>

    <div class="vc-collapse-item__wrap" :style="_contentStyle">
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
    value: {
      type: [String, Number],
      default: ''
    },
    title: String,
    open: Boolean,
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
        this.$nextTick(() => {
          if (val) {
            let { scrollHeight: H } = this.$el.querySelector('.vc-collapse-item__content')
    
            this._contentStyle.height = H + 'px'
          } else {
            this._contentStyle.height = '0px'
          }
        })
      },
      immediate: true
    }
  },
  methods: {
    toggleEvt () {
      this.vcCollapse.itemClick(this)
    }
  }
}
</script>
