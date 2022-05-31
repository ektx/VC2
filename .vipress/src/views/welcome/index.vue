<template>
  <article>
    <h1 id="hello" class="vipress-heading">Hello ViPress!</h1>
    <p>欢迎使用！</p>
  </article>
</template>

<script>
import { TOCData } from '../../../src/store/index.js'

export default {
  name: 'home-view',
  data() {
    return {
      menu: []
    }
  },
  mounted() {
    this.setTOCData()
  },
  methods: {
    setTOCData() {
      let result = []
      let heades = this.$el.querySelectorAll(':scope > .vipress-heading')

      heades.forEach(h => result.push(h))
      TOCData.value = result
    }
  }
}
</script>
