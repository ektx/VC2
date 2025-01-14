<template>
  <div class="vc-tag-group" :style="styles">
    <Tag
      v-for="(tag, i) in list"
      :key="tag[myAlias.label]"
      :type="tag[myAlias.type]"
      :color="tag[myAlias.color]"
      :size="size || tag.size"
      :closable="closable"
      :radius="radius"
      :border="border"
      :theme="theme"
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
    /** 标签列表 */
    list: {
      type: Array,
      default: []
    },
    /** 是否可关闭 */
    closable: Boolean,
    radius: [String, Number],
    border: [String, Number],
    size: [String, Number],
    theme: String,
    /** 设置 List 属性对应的别名 */
    alias: {
      type: Object,
      default: () => ({})
    },
    /** 可编辑的 */
    editable: {
      type: Boolean,
      default: false
    },
    /** 按钮图标 */
    btnIcon: {
      type: String,
      default: 'vc-icon-plus'
    },
    btnText: {
      type: String,
      default: 'New Tag'
    },
    showBorder: {
      type: Boolean,
      default: false
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
    },
    styles() {
      let result = {
        borderRadius:
          typeof this.radius === 'number' ? this.radius + 'px' : this.radius,
        '--border':
          typeof this.border === 'number' ? this.border + 'px' : this.border,
        '--size': typeof this.size === 'number' ? this.size + 'px' : this.size
      }

      return result
    }
  },
  methods: {
    onTagClose(e, index) {
      this.$emit('removeItem', {
        list: this.list,
        item: this.list[index],
        index,
        event: e
      })
    },

    onClickItem(index) {
      this.$emit('clickItem', {
        index,
        item: this.list[index],
        list: this.list
      })
    },

    toggleInput() {
      this.showInput = !this.showInput

      this.$nextTick(() => {
        this.$refs.inputEl.focus()
      })
    },

    enterInput() {
      this.$emit('addItem', {
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
