<template>
  <div class="vc-collapse">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'VcCollapse',
  props: {
    // 当前激活的面板
    value: {
      type: Array,
      default: () => ([])
    },
    // 是否手风琴模式
    accordion: Boolean,
  },
  provide() {
    return {
      vcCollapse: this
    }
  },
  methods: {
    itemClick(item) {
      let result = this.value.slice()

      if (this.accordion) {
        result = item.isOpen ? [] : [item.value]
      } else {
        if (item.isOpen) {
          result.splice(this.value.findIndex(val => (val === item.value)), 1)
        } else {
          result.push(item.value)
        }
      }

      this.$emit('update:value', result)
      this.$emit('change', result)
    }
  }
}
</script>
