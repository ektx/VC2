<template>
  <div class="vc-input-number">
    <button class="vc-input-number__decrease"></button>
    <button class="vc-input-number__increase"></button>
    <input 
      type="number" 
      class="vc-input-number__input"
      :min="min"
      :max="max"
      :style="inputStyle"
    >
  </div>
</template>

<script>
export default {
  name: 'VcInputNumber',
  props: {
    min: {
      type: String,
      default: '-Infinity'
    },
    max: {
      type: String,
      default: 'Infinity'
    },
    size: {
      type: String,
      default: '12px'
    },
    width: {
      type: String,
      default: '8em'
    }
  },
  computed: {
    inputStyle () {
      return {
        fontSize: this.size
      }
    }
  }
}
</script>

<style lang="less">
.vc-input-number {
  &__input {
    appearance: none;
    display: inline-block;
    width: 8em;
    line-height: 2;
    text-align: center;
    border: 1px solid #dcdfe6;
    border-radius: 3px;
    outline: none;
    transform: border-color .3s;

    &::-webkit-outer-spin-button, 
    &::-webkit-inner-spin-button {
      appearance: none;
    }

    &:focus {
      border-color: #409eff;
    }
  }
}
</style>