<template>
  <ul class="color-picker__hsla-panel color-picker__text-table">
    <li>
      <input type="number" v-model="hsl.h" @change="changeEvt">
      <p>H</p>
    </li>
    <li>
      <input type="text" v-model="hsl.s" @change="changeEvt">
      <p>S</p>
    </li>
    <li>
      <input type="text" v-model="hsl.l" @change="changeEvt">
      <p>L</p>
    </li>
    <Alpha />
  </ul>
</template>

<script>
import { getCurrentInstance, ref, computed } from 'vue'
import { formatString, hsv2hsl } from './color'
import Alpha from './alpha.vue'

export default {
  name: 'VcColorPickerHSLAPanel',
  inject: ['vcColorPicker'],
  components: { Alpha },
  setup() {
    const { ctx } = getCurrentInstance()

    const hsl = computed({
      get: () => {
        let {hsv} = ctx.vcColorPicker
        let {h, s, v} = hsv
        let hsl = hsv2hsl(h, s, v)

        return { ...hsl }
      }
    })

    function changeEvt() {
      let { h, s, l } = hsl
      let { hsv } = formatString(`hsv(${h}, ${s}, ${l})`)

      ctx.vcColorPicker.hsv.value = hsv
    }

    return {
      hsl,
      changeEvt,
    }
  }
}
</script>

<style>

</style>