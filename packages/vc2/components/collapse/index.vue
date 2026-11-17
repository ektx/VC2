<template>
  <div :class="['vc-collapse', hasClass('noBorder')]">
    <slot></slot>
  </div>
</template>

<script>
import { hasClass } from '../../utils'

export default {
  name: 'VcCollapse',
  props: {
    // 当前激活的面板
    modelValue: {
      type: Array,
      default: []
    },
    // 是否手风琴模式
    accordion: Boolean,
    /** 移除边框 */
    noBorder: Boolean
  },
  data() {
    return {
      name: ''
    }
  },
  provide() {
    return {
      Collapse: this
    }
  },
  beforeMount() {
    this.name = Date.now()
  },
  methods: {
    hasClass,

    itemClick(item) {
      // 复制旧值
      let result = this.modelValue.slice()

      if (this.accordion) {
        result = item.$el.open ? [] : [item.value]
      } else {
        if (item.$el.open) {
          result.splice(
            this.modelValue.findIndex(val => val === item.value),
            1
          )
        } else {
          result.push(item.value)
        }
      }

      this.$emit('update:modelValue', ...new Set([result]))
      this.$emit('change', ...new Set([result]))
    }
  }
}
</script>
