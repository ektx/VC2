<template>
  <ul 
    :class="['vc-pagination', {'has-color': background}]"
      :style="{color: background ? background : ''}"
  >
    <li 
      :class="[
        'btn prev-btn', 
        {
          'is-disabled': index === 1,
        }]" 
      @click="changeEvt(-1)"
    ></li>

    <li v-if="prev5" @click="goto(1)">1</li>

    <li 
      v-if="prev5"
      class="vc-icon-__prev"
      @click="goto(index - step)"
    ></li>

    <li 
      v-for="item in currentList" 
      :key="item.label"
      :class="[{'is-active': item.hold}]"
      :style="{backgroundColor: background && item.hold ? background : ''}"
      @click="goto(item.label)"
    >{{item.label}}</li>

    <li 
      v-if="next5" 
      class="vc-icon-__next"
      @click="goto(index + step)"
    ></li>

    <li 
      v-if="next5" 
      @click="goto(pages)"
    >{{pages}}</li>

    <li 
      :class="['btn next-btn', {'is-disabled': index === pages}]" 
      @click="changeEvt(1)"
    ></li>
  </ul>
</template>

<script>
export default {
  name: 'VcPagination',
  props: {
    // 当前页数
    index: {
      type: Number,
      default: 1
    },
    // 总数
    total: {
      tyep: Number,
      default: 0
    },
    // 每页数量
    size: {
      type: Number,
      default: 10
    },
    // 步长
    step: {
      type: Number,
      default: 5
    },
    // 背景色
    background: {
      type: [Boolean, String],
      default: false
    }
  },
  computed: {
    pages () {
      return Math.ceil(this.total/this.size)
    },
    list () {
      let result = []

      for (let i = 1; i <= this.pages; i++) {
        result.push({
          label: i,
          hold: this.index === i
        })
      }

      return result
    },
    currentList() {
      let start = 0

      if (this.pages > 5) {
        start = this.index < 4 ? 0 : this.index -3
        start = (this.pages - this.index) > 3 ? start : this.pages - 5
      }

      return this.list.slice(start, start +5)
    },
    next5 () {
      return this.currentList.length ? this.currentList[0].label + 5 <= this.pages : false
    },
    prev5() {
      return this.currentList.length ? this.currentList[0].label > 1 : false
    }
  },
  methods: {
    changeEvt(type) {
      let val = this.index + type
      // 前进时，页面最少是1 
      if (type < 0 && val < 1) return
      // 下一页最大为总数
      if (type > 0 && val > this.total) return

      this.goto(val)

      if (this.type) {
        this.$emit('nextChange', val)
      } else {
        this.$emit('prevChange', val)
      }
    },

    // 跳转到指定页面
    goto (index) {
      if (index < 1) index = 1
      else if (index > this.pages) index = this.pages
      /**
       * 页码发生变化
       * index {Number} 返回变化后的页数
       */
      this.$emit('indexChange', index)
      this.$emit('update:index', index)
    }
  }
}
</script>