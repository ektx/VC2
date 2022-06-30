<template>
  <div
    :class="['resize-box', `to-${direction}`]"
    :data="JSON.stringify(children)"
    :size="JSON.stringify(sizes)"
  >
    <div
      class="resize-box-item"
      v-for="(child, i) in sizes"
      :key="child.name"
      :style="getStyle(child)"
    >
      <slot :name="child.name" :options="child"></slot>

      <div
        v-if="i"
        class="drag-bar"
        @mousedown="onMouseDown($event, child, sizes[i - 1])"
        @dblclick="clickHandle($event, child, sizes[i - 1])"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VcSplitPanel',
  props: {
    direction: {
      type: String,
      // horizontal|vertical
      default: 'horizontal'
    },
    /**
     * interface Item {
     *   name: string 插槽名称
     *   show: boolean 是否显示
     *   value?: [number|number] 宽度，
     *   max?: number 最大值；聚会规则如上
     *   min?: number 最小值，取值规则如上
     * }
     */
    sizes: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      children: {},
      mouseStartInfo: null
    }
  },
  watch: {
    sizes: {
      handler() {
        this.updateChildren()
      },
      deep: true
    }
  },
  mounted() {
    this.updateChildren()
    this.resizeObserve()
    window.addEventListener('mousemove', this.mouseMove)
    window.addEventListener('mouseup', this.mouseUp)
  },
  unmounted() {
    window.removeEventListener('mousemove', this.mouseMove)
    window.removeEventListener('mouseup', this.mouseUp)
  },
  methods: {
    updateChildren() {
      let { width: _W } = this.$el.getBoundingClientRect()
      let usedWidth = 0
      let unSetSize = []

      for (let item of this.sizes) {
        let child = {}

        // 非隐藏状态
        if (Reflect.has(item, 'show') && item.show === false) {
          child._oldWidth = this.children[item.name].width
          child.width = 0
        } else {
          if ('value' in item) {
            if (this.children[item.name]) {
              child.width =
                this.children[item.name]._oldWidth ||
                this.children[item.name].width
            } else {
              child.width = this.computedWidth(item.value)
            }
            usedWidth += child.width
          } else {
            unSetSize.push(child)
          }
        }

        child.max = 'max' in item ? this.computedWidth(item.max) : _W
        child.min = 'min' in item ? this.computedWidth(item.min) : 0

        this.children[item.name] = child
      }

      // 为没有设置大小的容器分配平均值
      let autoWidth = (_W - usedWidth) / unSetSize.length

      unSetSize.forEach(item => {
        // 只分配在最大与最小区间之内
        item.width =
          autoWidth < item.max
            ? autoWidth > item.min
              ? autoWidth
              : item.min
            : item.max
      })
    },

    getStyle(item) {
      let obj = this.children[item.name]
      let result = {}

      if (obj) {
        result = { width: obj.width + 'px' }
      }

      return result
    },

    onMouseDown(e, item, prev) {
      this.updateChildren()

      e.target.classList.add('on-drag')

      item = this.children[item.name]
      prev = this.children[prev.name]

      let itemLeft = item.max - item.width
      let itemRight = item.width - item.min
      let prevLeft = prev.width - prev.min
      let prevRight = prev.max - prev.width

      this.mouseStartInfo = {
        el: e.target,
        x: e.x,
        item,
        prev,
        itemW: item.width,
        prevW: prev.width,
        left: Math.min(itemLeft, prevLeft),
        right: -Math.min(itemRight, prevRight)
      }

      // 设置样式
      this.$el.style.userSelect = 'none'
      document.documentElement.style.cursor = 'move'
    },
    mouseMove(e) {
      if (this.mouseStartInfo) {
        this.$el.style.pointerEvents = 'none'
        let { item, prev, itemW, prevW, x, left, right } = this.mouseStartInfo

        let offset = x - e.x

        if (offset > left) offset = left
        if (offset < right) offset = right

        item.width = itemW + offset
        prev.width = prevW - offset
      }
    },

    mouseUp() {
      if (!this.mouseStartInfo) return

      this.mouseStartInfo.el.classList.remove('on-drag')
      this.mouseStartInfo = null

      this.$el.style.userSelect = 'auto'
      this.$el.style.pointerEvents = 'auto'
      document.documentElement.style.cursor = ''
    },

    // 双击拖动条
    clickHandle(e, current, prev) {
      this.$emit('barDblclick', {
        e, // event
        el: e.target, // Element
        current, // 当前容器信息
        prev // 前元素容器信息
      })
    },

    resizeObserve() {
      const resizeObserver = new ResizeObserver(entries => {
        let { width } = this.$el.getBoundingClientRect()
        let usedWidth = 0
        let unSetSize = []

        this.sizes.forEach(item => {
          // 对有设置默认值的进行调整后数据设置
          console.log(item.value)
          if (Reflect.has(item, 'value')) {
            usedWidth += this.children[item.name].width
          }
          // 对于没有设置默认值的将采用平均分配
          else {
            unSetSize.push(this.children[item.name])
          }
        })

        let autoWidth = (width - usedWidth) / unSetSize.length

        // 更新大小，以现有容器大小分配（此处忽略了最小最大值限制）
        unSetSize.forEach(item => {
          item.width = autoWidth
        })
      })
      // 监听容器变化
      resizeObserver.observe(this.$el)
    },

    computedWidth(val) {
      let result = 0
      let { width } = this.$el.getBoundingClientRect()

      // 如果 val 类似是 '50%' => 0.5
      if (typeof val === 'string' && val.endsWith('%')) {
        result = width * (parseFloat(val) / 100)
      } else if (typeof val === 'number') {
        result = val
      }

      return result
    }
  }
}
</script>
