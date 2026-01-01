<template>
  <ul class="color-picker__hsla-panel color-picker__text-table">
    <li>
      <input type="number" v-model="h" />
      <p>H</p>
    </li>
    <li>
      <input type="number" v-model="s" max="100" min="0" />
      <p>S</p>
    </li>
    <li>
      <input type="number" v-model="l" max="100" min="0" />
      <p>L</p>
    </li>
    <Alpha />
  </ul>
</template>

<script>
import Alpha from './alpha.vue'
import { hsl2hsv, hsv2hsl } from './color'

export default {
  inject: ['vcColorPicker'],
  components: { Alpha },
  computed: {
    hsl() {
      let { H, S, V } = this.vcColorPicker

      return hsv2hsl(H, S, V)
    },
    h: {
      get() {
        return this.hsl.h
      },
      set(value) {
        let hsv = hsl2hsv(value, this.s, this.l)

        this.vcColorPicker.updateVal({
          type: 'hsl',
          hsv,
          value: this.getFormat({ h: value })
        })
      }
    },
    s: {
      get() {
        return this.hsl.s
      },
      set(value) {
        let hsv = hsl2hsv(this.h, value, this.l)
        this.vcColorPicker.updateVal({
          type: 'hsl',
          hsv,
          value: this.getFormat({ s: value })
        })
      }
    },
    l: {
      get() {
        return this.hsl.l
      },
      set(value) {
        let hsv = hsl2hsv(this.h, this.s, value)
        this.vcColorPicker.updateVal({
          type: 'hsl',
          hsv,
          value: this.getFormat({ l: value })
        })
      }
    }
  },
  methods: {
    getFormat(value) {
      let { A } = this.vcColorPicker
      let { h, s, l } = Object.assign(
        {},
        { h: this.h, s: this.s, l: this.l },
        value
      )
      let start = +A === 1 ? 'hsl' : 'hsla'
      let end = +A === 1 ? ')' : `, ${A})`

      return `${start}(${h}, ${s}%, ${l}%${end}`
    }
  }
}
</script>
