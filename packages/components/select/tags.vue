<template>
  <div v-if="vcSelect.multiple" class="vc-select-tags">
    <span 
      class="vc-tag"
      v-for="item in selectedItem" 
      :key="item.value"
    >
      {{item.label}}
      <i class="vc-icon-close" @click="evt => vcSelect.selectedEvt(evt, item)"/>
    </span>
  </div>
</template>

<script>
export default {
  name: 'VcSelectTags',
  inject: ['vcSelect'],
  props: {
    selectedItem: {
      type: Object,
      default: () => ({})
    },
  },
  updated() {
    if (!this.vcSelect.collapseTags) {
      let H = this.$el.offsetHeight 

      if (H >= 20) 
        this.vcSelect.$refs.inputArea.style.height = H + 'px'

      this.vcSelect.tooltip && this.vcSelect.tooltip.update()
    }
  },
  methods: {
  }
}
</script>

<style lang="less">
.vc-select-tags {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 1;
  padding: 3px 2em 0px 3px;
  box-sizing: border-box;

  .vc-tag {
    display: inline-block;
    margin: 0 3px 3px 0;
    padding: 2px 3px;
    color: #666;
    border-radius: 2px;
    border: 1px solid #e9e9eb;
    background-color: #f4f4f5;

    i {
      opacity: .5;
      cursor: pointer;
      transition: opacity .3s;

      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>