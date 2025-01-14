<template>
  <div
    :class="[
      'vc-collapse-item',
      { 'is-open': isOpen, 'is-disabled': disabled }
    ]"
  >
    <div
      :class="['vc-collapse-item__header', { 'is-sticky': sticky }]"
      @click="toggleEvt"
    >
      <div class="vc-collapse-item__title">
        <slot name="title">{{ title }}</slot>
      </div>
      <i class="vc-collapse-item__icon vc-icon-arrow-right"></i>
    </div>

    <div ref="wrap" class="vc-collapse-item__wrap">
      <div class="vc-collapse-item__content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VcCollapseItem',
  props: {
    // 唯一标志符
    value: {
      type: [String, Number],
      default: ''
    },
    // 面板标题
    title: [Number, String],
    // 是否禁用
    disabled: Boolean,
    /** 启用粘性 */
    sticky: Boolean
  },
  inject: ['Collapse'],
  computed: {
    isOpen() {
      return this.Collapse.modelValue.includes(this.value)
    }
  },
  methods: {
    toggleEvt() {
      if (this.disabled) return
      this.Collapse.itemClick(this)
    }
  }
}
</script>
