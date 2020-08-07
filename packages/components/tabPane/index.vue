<template>
  <teleport v-if="show" :to="`#tab-nav__${id}`">
    <slot name="label"/>
  </teleport>

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
      show: false,
    }
  },
  mounted() {
    this.show = true
    this.vcTabs.updatePanel()
  },
  computed: {
    id () {
      return this.name || this.label
    },
    visible () {
      return this.vcTabs.activeTab ? this.id === this.vcTabs.activeTab.id : false
    }
  }
}
</script>
