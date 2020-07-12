<template>
  <div class="vc-select">
    <div ref="inputArea" class="vc-select__input">
      <input readonly type="text" autocomplete="off" @focus="focusEvt">
      <i class="vc-icon-arrow-down"/>
    </div>
    <div ref="dropdown" class="vc-select__dropdown">
      {{ options }}
    </div>
  </div>
</template>

<script>
import { createPopper } from '@popperjs/core'

export default {
  name: 'VcSelect',
  props: {
    options: {
      type: Array,
      default: []
    }
  },
  data() {
    return {

    }
  },
  methods: {
    focusEvt () {
      console.log('F', this.$refs)
      createPopper(this.$refs.inputArea, this.$refs.dropdown, {
        placement: 'bottom',
        modifiers: {
          
        },
        strategy: 'fixed'
      })
    }
  }
}
</script>

<style lang="less">
.vc-select {
  display: inline-block;
  width: 200px;

  &__input {
    position: relative;

    input {
      -webkit-appearance: none;
      display: inline-block;
      padding: 5px 2em 5px 10px;
      width: 100%;
      background-color: #fff;
      background-image: none;
      border-radius: 3px;
      border: 1px solid #ddd;
      box-sizing: border-box;
      outline: none;
      transition: border .3s;

      &:hover {
        border-color: #aaa;
      }
    }

    i {
      position: absolute;
      right: 6px;
      top: 50%;
      color: #666;
      transform: translateY(-50%);
    }
  }
}
</style>