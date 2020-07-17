<template>
  <div class="vc-color-picker">
    <div class="vc-color-picker__color"></div>
  </div>
</template>

<script>
export default {
  name: 'VcColorPicker',
}
</script>

<style lang="less">
.vc-color-picker {
  display: inline-block;
  font-size: 0;
  border: 1px solid #666;

  &__color {
    display: inline-block;
    width: 1em;
    height: 1em;
    font-size: 12px;

  }
}
</style>