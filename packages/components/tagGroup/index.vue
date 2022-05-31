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

    <template v-if="editable">
      <my-input
        v-if="showInput"
        ref="inputEl"
        class="tag-input"
        placeholder=""
        v-model="inputValue"
        @keyup.enter="enterInput"
        @blur="blurInput"
      />
      <my-button
        v-else
        class="tag-button"
        :icon="btnIcon"
        @click="toggleInput"
        >{{ btnText }}</my-button
      >
    </template>
  </div>
</template>

<script>
import Tag from '../tag/index.vue'
import MyButton from '../button/index.vue'
import MyInput from '../input/index.vue'

export default {
  name: 'VcTagGroup',
  components: { Tag, MyButton, MyInput },
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
    },
    /** 可编辑的 */
    editable: {
      type: Boolean,
      default: false
    },
    btnIcon: {
      type: String,
      default: 'vc-icon-plus'
    },
    btnText: {
      type: String,
      default: 'New Tag'
    }
  },
  data() {
    return {
      showInput: false,
      inputValue: ''
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
    },

    toggleInput() {
      this.showInput = !this.showInput

      this.$nextTick(() => {
        this.$refs.inputEl.focus()
      })
    },

    enterInput() {
      this.$emit('update', {
        [this.myAlias.label]: this.inputValue
      })

      this.inputValue = ''
    },

    blurInput() {
      this.showInput = !this.showInput
    }
  }
}
</script>
