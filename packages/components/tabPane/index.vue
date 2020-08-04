<template>
  <div class="vc-tab-pane" v-if="visible">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'vcTabPane',
  props: {
    label: {
      type: String,
      default: ''
    },
    name: {
      type: [String, Number],
      default: ''
    }
  },
  inject: ['vcTabs'],
  mounted() {
    this.vcTabs.updatePanel()
  },
  computed: {
    visible () {
      return this.vcTabs.activeTab ? this.name === this.vcTabs.activeTab.id : false
    }
  }
}
</script>

<style lang="less">

</style>