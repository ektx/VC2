<template>
  <div :class="['resize-box', `to-${direction}`]">
    <div
      class="resize-box-item"
      v-for="(child, i) in children"
      :key="child.name"
      :style="{ width: child.width + 'px' }"
    >
      <slot :name="child.name" :options="child"></slot>

      <div
        v-if="i"
        class="drag-bar"
        @mousedown="onMouseDown($event, child, children[i - 1])"
        @dblclick="clickHandle($event, child, children[i - 1])"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    direction: {
      type: String,
      // horizontal|vertical
      default: 'horizontal'
    },
    /**
     * interface Item {
     *   name: string 插槽名称
     *   value?: number 宽度，大于1为像素px 小于等于1为百分比值
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
      children: [],
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
    window.addEventListener('mousemove', this.mouseMove)
    window.addEventListener('mouseup', this.mouseUp)
  },
  unmounted() {
    window.removeEventListener('mousemove', this.mouseMove)
    window.removeEventListener('mouseup', this.mouseUp)
  },
  methods: {
    updateChildren() {
      console.log(this.$el)
      let { width: _W } = this.$el.getBoundingClientRect()
      let usedWidth = 0
      let unSetSize = []
      let result = []

      for (let item of this.sizes) {
        let child = { name: item.name }

        if ('value' in item) {
          if (item.value <= 1) {
            child.width = _W * item.value
          } else {
            child.width = item.value
          }

          usedWidth += child.width
        } else {
          unSetSize.push(child)
        }

        if ('max' in item) {
          if (item.max <= 1) {
            child.max = _W * item.max
          } else {
            child.max = item.max
          }
        } else {
          child.max = _W
        }

        if ('min' in item) {
          if (item.min <= 1) {
            child.min = _W * item.min
          } else {
            child.min = item.min
          }
        } else {
          child.min = 0
        }

        result.push(child)
      }

      let autoWidth = (_W - usedWidth) / unSetSize.length

      unSetSize.forEach(item => {
        item.width =
          autoWidth < item.max
            ? autoWidth > item.min
              ? autoWidth
              : item.min
            : item.max
      })

      this.children = result
    },

    onMouseDown(e, item, prev) {
      e.target.classList.add('on-drag')

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
      this.$el.style.userSelect = 'none'
    },
    mouseMove(e) {
      if (this.mouseStartInfo) {
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
    },

    clickHandle(e, current, prev) {
      this.$emit('barDblclick', {
        e,
        el: e.target,
        current,
        prev
      })
    }
  }
}
</script>
