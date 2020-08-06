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
    // 标签是否可关闭
    closable: Boolean,
    // 是否禁用
    disabled: Boolean,
    // 选项卡图标
    icon: String
  },
  inject: ['vcTabs'],
  data() {
    return {
      id: null
    }
  },
  mounted() {
    this.vcTabs.updatePanel()
  },
  computed: {
    visible () {
      return this.vcTabs.activeTab ? (this.name || this.label) === this.vcTabs.activeTab.id : false
    }
  }
}
</script>

<style lang="less">

</style>