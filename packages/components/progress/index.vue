<template>
  <div :class="[
    'vc-progress', status, 
    {'is-hide-text': textType !== 'outer', 'is-space': format}
  ]">
    <div class="vc-progress-bar" :style="barStyle">
      <div 
        v-for="item in progressList.children"
        :key="item.label"
        :class="['vc-progress-bar__item', {'is-active': hasActive(item)}]" 
        :style="getItemStyle(item)"
      >
        <span v-if="textType === 'inner'">{{ item.width }}</span>
      </div>
    </div>
    <template v-if="format">
      <ul class="vc-progress__space-list">
        <li 
          v-for="item in progressList.children"
          :key="item.label"
        > 
          <i :style="{background: item.color}"></i>{{ item.label }}
        </li>
      </ul>
    </template>
    <template v-else>
      <div v-if="textType === 'outer'" class="vc-progress-text">
        <span v-if="status === 'default'">
          <slot>{{ progressList.usedPerStr }}</slot>
        </span>
        <i v-else :class="statusIcon"></i>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'VcProgress',
  props: {
    value: {
      type: [Number, Object],
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    min: {
      type: Number,
      default: 0
    },
    // 状态 default/success/warning/error
    status: {
      type: String,
      default: 'default'
    },
    // 文字控制 outer/inner/none
    textType: {
      type: String,
      default: 'outer'
    },
    strokeWidth: {
      type: Number,
      default: 6
    },
    /**
     * 自定义颜色
     * 1. string 具体的颜色值
     * 2. array  颜色数组
     * 3. function: color 函数，返回颜色值
     */
    color: {
      type: [String, Array, Function],
      default: ''
    },
    // 空间效果格式化
    format: {
      type: Object,
      default: () => (null)
    }
  },
  computed: {
    total() {
      return this.max - this.min
    },
    progressList() {
      let obj = {
        used: 0,
        usedPer: 0,
        usedPerStr: '0%',
        children: {}
      }
      
      if (typeof this.value === 'number') {
        let val = this.value / this.total

        obj.children.default = {
          label: '',
          color: '',
          percentage: val,
          width: val * 100 + '%'
        }
        obj.used = this.value
        obj.usedPer = val
        obj.usedPerStr = val * 100 + '%'
      } else {
        for (let key in this.format) {
          let item = this.format[key]
          let val = this.value[key] / this.total

          obj.children[key] = {
            label: item.label,
            color: item.color,
            percentage: val,
            width: val * 100 + '%'
          }
        }
      }

      return obj
    },
    statusIcon() {
      return `vc-icon-${this.status}`
    },
    barStyle() {
      return {
        height: this.strokeWidth + 'px',
        borderRadius: this.strokeWidth + 'px'
      }
    }
  },
  methods: {
    getItemStyle({ width, color }) {
      let obj = { width }

      if (this.color) {
        switch (typeof this.color) {
          case 'string': {
            obj.background = this.color
            break
          }
          case 'object': {
            for (let i = 0; i < this.color.length; i++) {
              if (this.value < this.color[i].percentage) {
                obj.background = this.color[i].color
                break
              }
            }
            break
          }
          case 'function': {
            obj.background = this.color(this.progressList.usedPer * 100)
            break
          }
        } 
      } else {
        obj.background = color
      }

      return obj
    },
    hasActive(item) {
      if (this.format) return false
      else {
        return item.percentage < 1
      }
    }
  }
}
</script>
