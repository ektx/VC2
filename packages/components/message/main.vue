<template>
  <transition name="vc-message-fade" @afterLeave="handleAfterLeave">
    <div v-show="visible.value" :class="['vc-message-inner', type]">
      <i :class="[`vc-icon-${type}`, type]"></i>
      <p>{{ message }}</p>
    </div>
  </transition>
</template>

<script>
import { watch, getCurrentInstance } from 'vue'

export default {
  props: {
    message: {
      type: String,
      default: ''
    },
    visible: Object,
    type: String,
  },
  // setup(props, ctx) {
  //   watch(
  //     () => props.visible.value,
  //     (val) => {
  //       console.log(val)
  //     }
  //   )

  //   function handleAfterLeave () {
  //     console.log('closed', ctx, getCurrentInstance())
  //   }

  //   return {
  //     handleAfterLeave
  //   }
  // }
  watch: {
    visible: {
      handler (val) {
        console.log(val.value)
      },
      deep: true
    }
  },
  methods: {
    handleAfterLeave () {
      document.body.removeChild(this.$el.parentNode)
    }
  }
}
</script>
