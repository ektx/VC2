<template>
  <div v-if="vcSelect.multiple" class="vc-select-tags">
    <span 
      class="vc-tag"
      v-for="item in displayItem" 
      :key="item.value"
    >
      {{item.label}}
      <i class="vc-icon-close" @click="evt => vcSelect.selectedEvt(evt, item)"/>
    </span>
    <span 
      v-if="vcSelect.collapseTags && moreSize > 0" 
      class="vc-tag more-tag"
    > +{{ moreSize }} </span>
    <input 
      v-if="vcSelect.filterable" 
      class="vc-select-tags__filter" 
      type="text" 
      autocomplete="off"
      v-model="vcSelect.query"
    >
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
    let H = this.$el.offsetHeight 

    H = H >= 24 ? H + 'px' : 'auto'

    this.vcSelect.$refs.inputArea.style.height = H
    this.vcSelect.tooltip && this.vcSelect.tooltip.update()
  },
  computed: {
    moreSize () {
      return Object.keys(this.selectedItem).length - this.vcSelect.maxTagCount  
    },
    displayItem() {
      if (this.vcSelect.collapseTags) {
        return Object.values(this.selectedItem).slice(0, this.vcSelect.maxTagCount)
      } else {
        return this.selectedItem
      }
    }
  }
}
</script>

<style lang="less">
.vc-select-tags {
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 2em;
  z-index: 1;
  padding: 3px 0 0 3px;
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

    &.more-tag {
      padding: 2px 10px;
    }
  }

  &__filter {
    margin: 0 0 2px 0;
    width: 10%;
    flex-grow: 1;
    color: #333;
    border: none;
    outline: none;
    background-color: transparent;
  }
}
</style>