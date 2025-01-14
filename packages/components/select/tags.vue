<template>
  <div v-if="vcSelect.multiple || vcSelect.createTags" class="vc-select-tags">
    <span class="vc-tag--item" v-for="item in displayItem" :key="item.value">
      {{ item[vcSelect.labelAlias] }}
      <i
        class="vc-icon-close"
        @click="evt => vcSelect.selectedEvt(evt, item)"
      />
    </span>
    <span
      v-if="vcSelect.collapseTags && moreSize > 0"
      class="vc-tag--item more-tag"
    >
      +{{ moreSize }}
    </span>
    <input
      v-if="vcSelect.filterable || vcSelect.createTags"
      class="vc-select-tags__filter"
      type="text"
      autocomplete="off"
      :placeholder="placeholder"
      v-model="vcSelect.query"
    />
  </div>
</template>

<script>
export default {
  name: 'VcSelectTags',
  inject: ['vcSelect'],
  props: {
    selectedItem: {
      type: Object,
      default: () => ({})
    }
  },
  updated() {
    let H = this.$el.offsetHeight

    H = H >= 24 ? H + 'px' : 'auto'

    this.vcSelect.$refs.inputArea.style.height = H
  },
  computed: {
    moreSize() {
      return Object.keys(this.selectedItem).length - this.vcSelect.maxTagCount
    },
    displayItem() {
      if (this.vcSelect.collapseTags) {
        return Object.values(this.selectedItem).slice(
          0,
          this.vcSelect.maxTagCount
        )
      } else {
        return this.selectedItem
      }
    },
    placeholder() {
      return this.vcSelect.modelValue.length ? '' : this.vcSelect.placeholder
    }
  },
  methods: {
    focusEvt() {
      let { filterable, createTags } = this.vcSelect
      if (filterable || createTags) {
        this.$el.querySelector('.vc-select-tags__filter').focus()
      }
    }
  }
}
</script>
