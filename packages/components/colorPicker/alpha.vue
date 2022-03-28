<template>
  <li>
    <input type="number" max="1" min="0" step="0.01" v-model="a" />
    <p>A</p>
  </li>
</template>

<script>
export default {
  inject: ['vcColorPicker'],
  computed: {
    a: {
      get() {
        return this.vcColorPicker.A
      },
      set(val) {
        this.vcColorPicker.updateVal({
          type: 'alpha',
          hsv: { a: val },
          value: val
        })
      }
    }
  }
}
</script>
