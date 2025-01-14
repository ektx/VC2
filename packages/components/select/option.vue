<template>
  <li 
    :class="['vc-select-option', {
      'selected': isActive,
    }]"
    :disabled="item.disabled"
    @click="evt => vcSelect.selectedEvt(evt, item)"
  >
    <slot v-bind="item" />
  </li>  
</template>

<script>
export default {
  name: 'VcSelectOption',
  inject: ['vcSelect'],
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    isActive() {
      let { modelValue, multiple, valueAlias, labelAlias } = this.vcSelect
      this.item.selected = [].concat(modelValue).includes( this.item[valueAlias] )

      this.vcSelect.updateSelectedItem(this.item, this.item.selected)

      return this.item.selected
    }
  }
}
</script>
