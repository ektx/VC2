<template>
  <div class="vc-select-tags">
    <span class="vc-tag--item" v-for="item in displayItem" :key="item.value">
      {{ item[vcSelect.props.labelAlias] }}
      <i
        class="vc-icon-close"
        @click="evt => vcSelect.selectedEvt(evt, item)"
      />
    </span>
    <span
      v-if="vcSelect.props.collapseTags && moreSize > 0"
      class="vc-tag--item more-tag"
    >
      +{{ moreSize }}
    </span>

    <input
      v-if="hasInput"
      class="vc-select-tags__filter"
      type="text"
      autocomplete="off"
      :placeholder="placeholder"
      :value="query"
      @input="e => emit('update:query', e.target.value)"
    />
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'
import { selectKey } from './types'

const vcSelect = inject(selectKey)

defineOptions({ name: 'VcSelectTags' })

const { placeholder, selectedItem, collapseTags, maxTagCount, filterable } =
  defineProps({
    placeholder: String,
    selectedItem: Object,
    collapseTags: Boolean,
    maxTagCount: Number,
    filterable: Boolean,
    query: String
  })

const emit = defineEmits(['update:query'])

const displayItem = computed(() => {
  if (collapseTags) {
    return Object.values(selectedItem).slice(0, maxTagCount)
  } else {
    return selectedItem
  }
})

const hasInput = computed(() => {
  if (filterable) {
    return true
  } else {
    return Object.keys(selectedItem).length === 0
  }
})

const moreSize = computed(() => {
  return Object.keys(selectedItem).length - vcSelect.props.maxTagCount
})
</script>
