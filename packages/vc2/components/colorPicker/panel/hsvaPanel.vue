<template>
  <ul class="color-picker__hsla-panel color-picker__text-table">
    <li>
      <input type="number" v-model="h" max="360" min="0" />
      <p>H</p>
    </li>
    <li>
      <input type="number" v-model="s" max="100" min="0" />
      <p>S</p>
    </li>
    <li>
      <input type="number" v-model="v" max="100" min="0" />
      <p>V</p>
    </li>
    <Alpha />
  </ul>
</template>

<script>
import Alpha from '../alpha.vue'

export default {
  name: 'VcColorPickerHSLAPanel',
  inject: ['vcColorPicker'],
  components: { Alpha },
  computed: {
    h: {
      get() {
        return this.vcColorPicker.H
      },
      set(value) {
        this.vcColorPicker.updateVal({
          type: 'hsv',
          hsv: { h: value, s: this.s, v: this.v },
          value: this.getFormat({ h: value })
        })
      }
    },
    s: {
      get() {
        return this.vcColorPicker.S
      },
      set(value) {
        this.vcColorPicker.updateVal({
          type: 'hsv',
          hsv: { h: this.h, s: value, v: this.v },
          value: this.getFormat({ s: value })
        })
      }
    },
    v: {
      get() {
        return this.vcColorPicker.V
      },
      set(value) {
        this.vcColorPicker.updateVal({
          type: 'hsv',
          hsv: { h: this.h, s: this.s, v: value },
          value: this.getFormat({ v: value })
        })
      }
    }
  },
  methods: {
    getFormat(obj) {
      let { A } = this.vcColorPicker
      let start = +A === 1 ? 'hsv' : 'hsva'
      let end = +A === 1 ? ')' : `, ${A})`
      let { h, s, v } = Object.assign(
        {},
        {
          h: this.h,
          s: this.s,
          v: this.v
        },
        obj
      )

      return `${start}(${h},${s},${v}${end}`
    }
  }
}
</script>
