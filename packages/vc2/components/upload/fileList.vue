<template>
  <div class="vc-upload__file-list">
    <div class="vc-upload__btns-area">
      <div
        v-if="$slots.target"
        class="vc-upload__btns-btn"
        @click="$emit('select-file')"
      >
        <slot name="target"></slot>
      </div>
      <div class="vc-upload__btns-btn" @click="$emit('upload-file')">
        <slot>
          <vc-button theme="primary" @click.stop="$emit('select-file')">
            选择文件
          </vc-button>
        </slot>
      </div>
    </div>

    <div class="vc-upload__file-list-content">
      <ul>
        <li
          class="vc-upload__file-list-item"
          v-for="(item, index) in list"
          :key="item.name"
        >
          <span class="item-name">
            <i class="vc-icon-document"></i>
            {{ item.name }}
          </span>
          <span class="item-status">
            <i v-if="item.__status === 'ready'" class="vc-icon-upload"></i>
            <i v-if="item.__status === 'uploaded'" class="vc-icon-success"></i>
            <i v-if="item.__status === 'error'" class="vc-icon-error"></i>
            <i class="remove vc-icon-delete" @click="remove(item, index)"></i>
          </span>
          <VCProgress
            text-type="none"
            :stroke-width="2"
            :value="item.__progress"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import VCProgress from '../progress/index.vue'

export default {
  components: {
    VCProgress
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    remove(item, index) {
      this.$emit('remove', item, index)
    }
  }
}
</script>
