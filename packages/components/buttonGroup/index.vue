<template>
  <div class="vc-button-group">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'vcButtonGroup',
}
</script>

<style lang="less">
.vc-button-group {
  display: inline-block;

  & > .vc-button {
    position: relative;
    margin: 0;
    z-index: 0;

    &:hover {
      z-index: 1;
    }

    &:first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    &:last-child {
      margin-left: -1px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    &:not(:first-child):not(:last-child) {
      margin-left: -1px;
      border-radius: 0;
    }
  }
}
</style>