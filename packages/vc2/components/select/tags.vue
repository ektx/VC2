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
      class="vc-select-tags__filter"
      type="text"
      autocomplete="off"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
// import { inject } from 'vue'
import { selectKey } from './types'

export default {
  name: 'VcSelectTags',
  // setup() {
  //   const vcSelect = inject(selectKey) // inject('vcSelect')
  //   console.log(vcSelect)
  //   return { vcSelect }
  // },
  props: {
    selectedItem: {
      type: Object,
      default: () => ({})
    }
  },
  updated() {
    let H = this.$el.offsetHeight

    H = H >= 24 ? H + 'px' : 'auto'

    // this.vcSelect.$refs.inputArea.value.style.height = H
  },
  computed: {
    moreSize() {
      return 'moreSize'
      return (
        Object.keys(this.selectedItem).length - this.vcSelect.props.maxTagCount
      )
    },
    displayItem() {
      // if (this.vcSelect.props.collapseTags) {
      //   return Object.values(this.selectedItem).slice(
      //     0,
      //     this.vcSelect.props.maxTagCount
      //   )
      // } else {
      //   return this.selectedItem
      // }
    }
    // placeholder() {
    //   return this.vcSelect.props.modelValue.length
    //     ? ''
    //     : this.vcSelect.props.placeholder
    // }
  },
  methods: {
    focusEvt() {
      let { filterable, createTags } = this.vcSelect.props
      if (filterable || createTags) {
        this.$el.querySelector('.vc-select-tags__filter').focus()
      }
    }
  }
}
</script>
<script setup>
import { inject, computed } from 'vue'

const vcSelect = inject(selectKey)

const { placeholder } = defineProps({
  placeholder: String
})
</script>
