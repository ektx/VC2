<template>
  <div class="vc-tab-pane" v-if="visible">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'vcTabPane',
  props: {
    // 选项卡标题
    label: {
      type: String,
      default: ''
    },
    // 与选项卡绑定值 value 对应的标识符，表示选项卡别名
    name: {
      type: [String, Number],
      default: ''
    },
    closable: Boolean,
    disabled: Boolean
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