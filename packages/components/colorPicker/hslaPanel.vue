<template>
  <ul class="color-picker__hsla-panel color-picker__text-table">
    <li>
      <input type="number" v-model="Hue" />
      <p>H</p>
    </li>
    <li>
      <input type="text" v-model="hsl.s" @blur="changeEvt" />
      <p>S</p>
    </li>
    <li>
      <input type="text" v-model="hsl.l" @blur="changeEvt" />
      <p>L</p>
    </li>
    <Alpha />
  </ul>
</template>

<script>
import { getCurrentInstance, computed } from 'vue'
import { formatString, hsv2hsl, hsl2hsv } from './color'
import Alpha from './alpha.vue'

export default {
  name: 'VcColorPickerHSLAPanel',
  inject: ['vcColorPicker', 'store'],
  components: { Alpha },
  data() {
    return {
      Hue: this.store.Hue
    }
  },
  setup() {
    const { ctx } = getCurrentInstance()

    const hsl = computed(() => {
      let { h, s, v } = ctx.vcColorPicker.hsv
      let hsl = hsv2hsl(h, s, v)

      return { ...hsl }
    })

    function changeEvt() {
      let { h, s, l } = hsl.value
      let { hsv } = formatString(`hsl(${h}, ${s}, ${l})`)

      ctx.vcColorPicker.hsv = hsv
    }

    return {
      hsl,
      changeEvt
    }
  }
}
</script>
