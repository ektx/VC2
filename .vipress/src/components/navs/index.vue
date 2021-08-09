<template>
  <List :data="value"/>
</template>

<script>
import List from './list.vue'

export default {
  name: 'navs-com',
  components: { List },
  props: {
    value: {
      type: Array,
      default: []
    }
  }
}
</script>