<template>
  <h1>{{ msg }}jkjk</h1>
  <button @click="count++">count is: {{ count }}</button>
  <button @click="get">Get</button>
  <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
</template>

<script>
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

    return {
      get
    }
  }
}

function get () {
  console.log('Get')
  fetch('/doc/readme.md')
    .then(res => {
      console.log(res)
    })
}
</script>

<style lang="less">
h1 {
  color: red;
}
</style>