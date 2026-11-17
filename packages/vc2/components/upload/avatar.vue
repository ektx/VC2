<template>
  <div
    class="vc-upload-avatar"
    @click.stop="$emit('select-file')"
    :style="style"
  >
    <input
      ref="clipboardRef"
      type="text"
      class="clipboard-txt"
      @click.stop
      @paste="onPaste"
    />
    <slot>
      <img v-if="src" :src="src" alt="avatar" :style="{ 'object-fit': fit }" />

      <div v-else class="vc-upload-avatar__helper">
        <slot name="avatar-helper">
          <i
            v-if="useClipboard"
            class="vc-clipboard-btn vc-icon-s-order"
            @click.stop="getClipboardImgs"
          ></i>
          <i v-else :class="avatarIcon"></i>

          <p>{{ placeholder }}</p>
        </slot>
      </div>
    </slot>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  src: String,
  placeholder: {
    type: String,
    default: '点击选择图片上传'
  },
  avatarIcon: {
    type: String,
    default: 'vc-icon-upload-cloud'
  },
  width: {
    type: String,
    default: '200px'
  },
  height: {
    type: String,
    default: '200px'
  },
  radius: {
    type: String,
    default: '3px'
  },
  /** 'fill', 'contain', 'cover', 'none', 'scale-down' */
  fit: {
    type: String,
    default: 'inherit'
  },
  useClipboard: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['upload'])
const clipboardRef = ref(null)

const style = computed(() => ({
  width: props.width,
  height: props.height,
  borderRadius: props.radius
}))

async function getClipboardImgs(e) {
  clipboardRef.value.focus()
}

function onPaste(e) {
  const clipboardData = e.clipboardData || window.clipboardData

  if (clipboardData.items) {
    const firstItem = clipboardData.items[0]

    if (firstItem.type.includes('image') !== -1) {
      const imgFile = firstItem.getAsFile()

      emits('upload', [
        {
          file: imgFile,
          name: imgFile.name || '[clip Data]',
          __progress: 0,
          __status: 'ready'
        }
      ])
    }
  }
}
</script>
