<template>
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
</template>

<script>
import { compile, h } from 'vue'

export default {
  name: 'App',
  // components: {
  //   HelloWorld
  // },
  methods: {
    test () {
      let render = compile('<HelloWorld msg="Hello Vue 3.0 + Vite" />')
      // let render = compile('<h1>Hello</h1>')
      console.log(render)
      return render
    }
  },
  // render () {
  //   // return this.test()
  //   return h(this.test())
  //   // return h('div', { class: 'custom-renderer' })
  // }
}
</script>
