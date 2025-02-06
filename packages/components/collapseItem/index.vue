<template>
  <details
    :name="name"
    :class="[
      'vc-collapse-item',
      { 'is-open': isOpen, 'is-disabled': disabled }
    ]"
    :open="isOpen"
  >
    <summary :class="[{ 'is-sticky': sticky }]" @click="toggleEvt">
      <div class="vc-collapse-item__title">
        <slot v-if="$slots.summary" name="summary">{{ title }}</slot>
        <slot name="title">{{ title }}</slot>
      </div>
      <i class="vc-collapse-item__icon vc-icon-arrow-right"></i>
    </summary>

    <div ref="wrap" class="vc-collapse-item__wrap">
      <div class="vc-collapse-item__content">
        <slot></slot>
      </div>
    </div>
  </details>
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
  data() {
    return {
      isOpen: false,
      name: null
    }
  },
  mounted() {
    this.isOpen = this.Collapse.modelValue.includes(this.value)
    this.name = this.Collapse.accordion ? this.Collapse.name : ''
  },
  methods: {
    toggleEvt(e) {
      if (this.disabled) {
        e.preventDefault()
        return
      }
      this.Collapse.itemClick(this)
    }
  }
}
</script>
