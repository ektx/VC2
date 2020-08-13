<template>
  <div :class="['vc-switch__inset', `vc-switch__inset-${type}`]">
    <i v-if="icon" :class="icon"></i>
    <span v-if="text" class="vc-switch__inset-text" >{{text}}</span>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    icon: String,
    text: {
      type: [String, Number],
      default: ''
    }
  },
  mounted() {
    this.update()
  },
  updated() {
    this.update()
  },
  methods: {
    update() {
      let { scrollWidth } = this.$el
      let { width } = this.$parent.coreStyleObj

      if (!width || width < scrollWidth) {
        this.$parent.coreStyleObj.width = scrollWidth
      }
    }
  }
}
</script>
