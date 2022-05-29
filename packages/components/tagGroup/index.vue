<template>
  <div class="vc-tag-group">
    <Tag
      v-for="(tag, i) in list"
      :key="tag[myAlias.label]"
      :type="tag[myAlias.type]"
      :color="tag[myAlias.color]"
      :size="size || tag.size"
      :closable="closable"
      :radius="radius"
      :border="border"
      @close="e => onTagClose(e, i)"
      @click="onClickItem(i)"
      >{{ tag[myAlias.label] }}</Tag
    >
  </div>
</template>

<script>
import Tag from '../tag/index.vue'

export default {
  name: 'VcTagGroup',
  components: { Tag },
  props: {
    list: {
      type: Array,
      default: []
    },
    closable: Boolean,
    radius: [String, Number],
    border: [String, Number],
    size: [String, Number],
    alias: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    myAlias() {
      return Object.assign(
        {},
        {
          label: 'label',
          type: 'type',
          color: 'color',
          size: 'size'
        },
        this.alias
      )
    }
  },
  methods: {
    onTagClose(e, index) {
      this.list.splice(index, 1)

      this.$emit('change', { data: this.list, index, event: e })
    },

    onClickItem(index) {
      this.$emit('clickItem', { index, item: this.list[index] })
    }
  }
}
</script>
