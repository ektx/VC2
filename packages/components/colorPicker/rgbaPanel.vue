<template>
  <ul class="color-picker__rgba-panel color-picker__text-table">
    <li>
      <input type="number" max="255" min="0" v-model="red" />
      <p>R</p>
    </li>
    <li>
      <input type="number" max="255" min="0" v-model="green" />
      <p>G</p>
    </li>
    <li>
      <input type="number" max="255" min="0" v-model="blue" />
      <p>B</p>
    </li>
    <Alpha />
  </ul>
</template>

<script>
import Alpha from './alpha.vue'

export default {
  components: { Alpha },
  inject: ['store'],
  data() {
    return {
      red: this.store.red,
      blue: this.store.blue,
      green: this.store.green
    }
  }
}
</script>
