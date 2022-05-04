<template>
  <div
    class="vc-upload-avatar"
    @click.stop="$emit('select-file')"
    :style="style"
  >
    <slot>
      <img v-if="src" :src="src" alt="avatar" />

      <div v-else class="vc-upload-avatar__helper">
        <slot name="avatar-helper">
          <i :class="avatarIcon"></i>
          <p>{{ placeholder }}</p>
        </slot>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'VcUploadAvatar',
  props: {
    src: String,
    placeholder: {
      type: String,
      default: '点击选择图片上传'
    },
    avatarIcon: {
      type: String,
      default: 'vc-icon-picture-outline'
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
    }
  },
  computed: {
    style() {
      return {
        width: this.width,
        height: this.height,
        borderRadius: this.radius
      }
    }
  }
}
</script>
