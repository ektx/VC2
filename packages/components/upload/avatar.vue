<template>
  <div
    class="vc-upload-avatar"
    @click.stop="$emit('select-file')"
    :style="style"
  >
    <slot>
      <img v-if="src" :src="src" alt="avatar" :style="{ 'object-fit': fit }" />

      <div v-else class="vc-upload-avatar__helper">
        <slot name="avatar-helper">
          <i :class="avatarIcon"></i>
          <p>{{ placeholder }}</p>
        </slot>
      </div>
    </slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

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
  }
})

const style = computed(() => ({
  width: props.width,
  height: props.height,
  borderRadius: props.radius
}))
</script>
