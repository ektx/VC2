<template>
  <section class="vc-form">
    <slot/>
  </section>
</template>

<script>
export default {
  name: 'VcForm',
  props: {
    // 表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。
    // 支持 auto。
    labelWidth: String
  },
  data () {
    return {
      autoLabelWidth: 0
    }
  }
}
</script>

<style lang="less">

</style>