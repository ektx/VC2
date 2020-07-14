<template>
  <div :class="['vc-select__dropdown']" data-popper-arrow>
    <slot/>
    <div id="arrow" data-popper-arrow></div>
  </div>
</template>

<script>
export default {
  name: 'VcSelectDropDown',
  props: {
  }
}
</script>

<style lang="less">
.vc-select__dropdown {
  width: 200px;
  z-index: 1000;
  border: 1px solid #ddd;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);

  #arrow,
  #arrow::before {
    position: absolute;
    width: 8px;
    height: 8px;
    z-index: -1;
  }
  
  #arrow::before {
    content: '';
    transform: rotate(-45deg);
    background: #fff;
    border-color: #ddd;
    border-style: solid;
  }

  &[data-popper-placement^='top'] > #arrow {
    bottom: -5px;

    &::before {
      border-width: 0 0 1px 1px;
    }
  }

  &[data-popper-placement^='bottom'] > #arrow {
    top: -5px;

    &::before {
      border-width: 1px 1px 0 0;
    }
  }
}



</style>