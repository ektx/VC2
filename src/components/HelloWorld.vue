<template>
  <h1>{{ msg }}</h1>
  <button @click="count++">count is: {{ count }}</button>
  <button @click="get">Get</button>
  <!-- <demo>
    <template #default>default Slot</template>
    <template #test>Test Slot</template>
  </demo> -->
  <demo>abcd</demo>
  <VCMdDemo :value="htmlStr"/>
</template>

<script>
import { ref } from 'vue'
let htmlStr = ''

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      count: 0
    }
  },
  setup () {

    htmlStr = ref('<h1>Hello Vite</h1>')

    return {
      get,
      htmlStr
    }
  }
}

function get () {
  console.log('Get', htmlStr)
  fetch('/api/doc/button.md')
    .then(res => res.json())
    .then(res => {
      // console.log(res.data)
      htmlStr.value = res.data
    })
}
</script>

<style lang="less">
h1 {
  color: red;
}
</style>