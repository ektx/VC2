<template>
  <li 
    :class="['vc-select-option', {
      'selected': isActive,
      'hover': item.hover
    }]"
    :disabled="item.disabled"
    @click="evt => vcSelect.selectedEvt(evt, item)"
    @mouseover="vcSelect.optionMouseOver(vcSelect.hoverItem, item)"
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
      let { value, multiple, valueAlias, labelAlias } = this.vcSelect
      this.item.selected = value.includes( this.item[valueAlias] )

      this.vcSelect.updateSelectedItem(this.item, this.item.selected)

      return this.item.selected
    }
  }
}
</script>
