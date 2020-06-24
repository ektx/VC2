<template>
  <Home msg="Hello Vue 3.0 + Vite" />
</template>

<script>
import Home from './views/home.vue'
import { compile, h } from 'vue'

export default {
  name: 'App',
  components: { Home }
}
</script>
