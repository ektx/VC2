<template>
  <div :class="['vc-tabs', { 'is-flex': isFlexBox }]">
    <ul class="vc-tabs__head">
      <li class="vc-tabs__active-bar" :style="barStyle"></li>
      <li 
        v-for="tab in list" 
        :key="tab.label"
        :class="['vc-tabs__item', {'is-active': tab.active}]" 
        @click="activeTab = tab"
      >{{ tab.label }}</li>
    </ul>
    <div class="vc-tabs__body">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VcTabs',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    isFlexBox: {
      type: Boolean,
      default: false
    }
  },
  provide() {
    return { vcTabs: this }
  },
  watch: {
    activeTab (val, old) {
      if (old) old.active = false
      val.active = true
      this.$emit('update:value', val.id)

      this.$nextTick(() => {
        let el = this.$el.querySelector('.is-active')
        let { width, padding, paddingLeft } = window.getComputedStyle(el)
// debugger
        console.log(paddingLeft)
        this.barStyle = {
          width: width,
          transform: `translateX(${el.offsetLeft + parseInt(paddingLeft)}px)`
        }
      })
    }
  },
  data() {
    return {
      list: [],
      activeTab: null,
      barStyle: {}
    }
  },
  methods: {
    updatePanel () {
      let slots = this.$slots.default()
      if (slots) {
        let paneSlots = []
        this.list = []

        // 对于动态生成的 pane
        if (typeof slots[0].type === 'symbol') {
          slots = slots[0].children
        }
        
        slots.forEach((vnode, i) => {
          if (vnode.type.name === 'vcTabPane') {
            const id = vnode.props.name || i
            const item = {
              label: vnode.props.label,
              id,
              active: id === this.value
            }

            this.list.push(item)
            if (id === this.value) this.activeTab = item
          }
        })
      } else {
        this.list = []
      }
    },
  }
}
</script>

<style lang="less">
.vc-tabs {
  &__head {
    position: relative;
    border-bottom: 1px solid #ddd;
    box-sizing: border-box;

    .vc-tabs__item {
      display: inline-block;
      padding: 0px 15px;
      font-size: 14px;
      line-height: 3em;
      height: 3em;
      user-select: none;
      cursor: pointer;
      transition: color .3s;

      &.is-active {
        color: #09f;
      }
    }
  }

  &__active-bar {
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 0%;
    height: 2px;
    z-index: 1;
    background-color: #09f;
    transition: transform .35s, width .35s;
  }

  &.is-flex {

    .vc-tabs__head {
      display: flex;
      flex-direction: row;
    }

    .vc-tabs__item {
      flex: 1;
      display: flex;
      padding: 5px;
      align-items: center;
      justify-content: center;
      text-align: center;

      &.is-active {
        color: #fff;
        background-color: #09f;
      }
    }
    .vc-tabs__active-bar {
      display: none;
    }
  }
}
</style>