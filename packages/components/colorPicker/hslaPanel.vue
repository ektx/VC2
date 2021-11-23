<template>
  <ul class="color-picker__hsla-panel color-picker__text-table">
    <li>
      <input type="text" v-model="H" />
      <p>H</p>
    </li>
    <li>
      <input type="text" v-model="S" />
      <p>S</p>
    </li>
    <li>
      <input type="text" v-model="L" />
      <p>L</p>
    </li>
    <Alpha />
  </ul>
</template>

<script>
import Alpha from './alpha.vue'

export default {
  name: 'VcColorPickerHSLAPanel',
  inject: ['vcColorPicker', 'store'],
  components: { Alpha },
  data() {
    return {
      H: this.store.HSL_Hue,
      S: this.store.HSL_S,
      L: this.store.Lightness
    }
  }
  // setup() {
  //   const { ctx } = getCurrentInstance()

  //   const hsl = computed(() => {
  //     let { h, s, v } = ctx.vcColorPicker.hsv
  //     let hsl = hsv2hsl(h, s, v)

  //     return { ...hsl }
  //   })

  //   function changeEvt() {
  //     let { h, s, l } = hsl.value
  //     let { hsv } = formatString(`hsl(${h}, ${s}, ${l})`)

  //     ctx.vcColorPicker.hsv = hsv
  //   }

  //   return {
  //     hsl,
  //     changeEvt
  //   }
  // }
}
</script>
