<template>
  <div :class="['vc-select__dropdown']">
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
