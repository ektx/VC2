<template>
  <div class="vc-collapse">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'VcCollapse',
  props: {
    value: {
      type: Array,
      default: () => ([])
    },
    // 手风琴效果
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
