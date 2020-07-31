<template>
  <div class="vc-select-group">
    <slot name="label" v-bind="item"></slot>
    <ul>
      <VCSOption 
        v-for="child in item.children"
        :key="child.value"
        :item="child"
      >
        <template #default="item">
          <slot v-bind="item"></slot>
        </template>
      </VCSOption>
    </ul>
  </div>
</template>

<script>
import VCSOption from './option.vue'

export default {
  name: 'VcSelectGroup',
  components: { VCSOption },
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
