<template>
  <transition
    name="vc-fade-animate"
  >
    <div v-show="visible.value" class="vc-confirm">
      <div class="vc-confirm-box">
        <div class="vc-confirm-box__header">
          <div class="vc-confirm-box__title">{{title}}</div>
          <i class="vc-confirm-box__close-btn vc-icon-close"></i>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'VcConfirm',
  props: {
    visible: Object,
    title: {
      type: String,
      default: '标题'
    }
  }
}
</script>

<style lang="less">
.vc-confirm {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2000;
  background-color: rgba(0, 0, 0, .3);

  h1 {
    color: red;
  }
}
</style>