<template>
  <div class="vc-select-group">
    <slot name="label" v-bind="item"></slot>
    <ul>
      <VCSOption
        v-for="child in item.children"
        :key="child.value"
        :item="child"
        :value="value"
        :valueAlias="valueAlias"
      >
        <template #default="item">
          <slot v-bind="item"></slot>
        </template>
      </VCSOption>
    </ul>
  </div>
</template>

<script setup>
import VCSOption from './option.vue'

defineOptions({ name: 'VcSelectGroup' })

const {
  item = {},
  value,
  valueAlias
} = defineProps({
  item: Object,
  value: [String, Number, Array],
  valueAlias: String
})
</script>
