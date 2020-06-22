<template>
  <h1>{{ msg }}</h1>
  <button @click="get">Get</button>
  <!-- 测试插槽 -->
  <!-- <demo>
    <template #default>default Slot</template>
    <template #test>Test Slot</template>
  </demo> -->

  <!-- 测试指定具名插槽 -->
  <!-- <demo>
    <template #test>
      <pre>Hello</pre>
    </template>
  </demo> -->

  <VCMarkedIt :value="htmlStr"/>
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
    htmlStr = ref('')

    return {
      get,
      htmlStr
    }
  }
}

function get () {
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