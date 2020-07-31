<template>
  <List :data="value" :level="1"/>
</template>

<script>
import List from './list.vue'

export default {
  name: 'navs-com',
  components: { List },
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      currentNav: null
    }
  },
  watch: {
    currentNav (val, old) {
      if (old && 'active' in old) {
        old.active = false
      }

      val.active = true

      // 本地存储地址
      localStorage.currentNav = JSON.stringify(val)
    }
  },
  provide () {
    return {
      emitParent: this.emitParent,
      setCurrentNav: this.setCurrentNav
    }
  },
  methods: {
    // 通知调用组件的父级当前点击的对象
    emitParent (nav) {
      this.$emit('change', nav)
    },
    // 设置当前菜单
    setCurrentNav (nav) {
      this.currentNav = nav
    }
  }
}
</script>