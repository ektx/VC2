<template>
  <details
    :name="name"
    :class="['vc-collapse-item', { 'is-disabled': disabled }]"
    :open="defOpen"
  >
    <summary :class="[{ 'is-sticky': sticky }]" @click="toggleEvt">
      <slot name="summary" :open="isOpen">
        <div class="content">
          <div class="vc-collapse-item__title">
            <slot name="summary-title">{{ title }}</slot>
          </div>
          <i class="icon vc-icon-arrow-right"></i>
        </div>
      </slot>
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
      defOpen: false,
      isOpen: false,
      name: null
    }
  },

  mounted() {
    this.defOpen = this.Collapse.modelValue.includes(this.value)
    this.isOpen = this.defOpen
    this.name = this.Collapse.accordion ? this.Collapse.name : ''
  },
  methods: {
    toggleEvt(e) {
      if (this.disabled) {
        e.preventDefault()
        return
      }
      this.isOpen = !this.isOpen
      this.Collapse.itemClick(this)
    }
  }
}
</script>
