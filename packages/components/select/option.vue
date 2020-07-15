<template>
  <li 
    :class="['vc-select-option', {
      'selected': item.selected,
      'hover': item.hover
    }]"
    :disabled="item.disabled"
    @click="evt => vcSelect.selectedEvt(evt, item)"
    @mouseover="vcSelect.optionMouseOver(vcSelect.hoverItem, item)"
  >
    <slot v-bind="item"></slot>
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
  }
}
</script>
