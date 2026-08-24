<template>
  <div ref="el" :class="['vc-switch__inset', `vc-switch__inset-${type}`]">
    <i v-if="icon" :class="icon"></i>
    <span v-if="text" class="vc-switch__inset-text">{{ text }}</span>
  </div>
</template>

<script setup>
import { onMounted, useTemplateRef } from 'vue'

const props = defineProps({
  type: String,
  icon: String,
  text: {
    type: [String, Number],
    default: ''
  }
})
const $el = useTemplateRef('el')
//   mounted() {
//     this.update()
//   },
//   updated() {
//     this.update()
//   },
//   methods: {
//   }
// }
const update = () => {
  let { scrollWidth } = $el.value
  // let { width } = this.$parent.coreStyleObj

  // if (!width || width < scrollWidth) {
  //   this.$parent.coreStyleObj.width = scrollWidth
  // }
}

onMounted(() => {
  update()
})
</script>
