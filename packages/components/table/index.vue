<template>
  <div class="vc-table" :style="iStyle">
    <div v-if="loading" class="vc-table__loading-mod">
      <div class="inner">
        <i class="vc-icon-loading"></i>
        <p>{{ typeof loading === 'boolean' ? 'Loading...' : loading }}</p>
      </div>
    </div>

    <div class="vc-table--content">
      <div class="vc-table--head" :style="{ width: tableWidth }">
        <table ref="header" :class="{ 'has-border': border }">
          <colgroup>
            <col v-for="(h, i) in _header" :key="i" :width="h.width" />
          </colgroup>
          <thead>
            <tr>
              <th v-for="item in _header" :key="item.key">
                <div class="cell">
                  <template v-if="item.key === '__SELECT_COLUMN__'">
                    <input
                      v-if="showSelectColumn === 'checkbox'"
                      v-model="item.checked"
                      :indeterminate="item.indeterminate"
                      type="checkbox"
                      @change="checkboxChange(item)"
                    />
                  </template>
                  {{ item.label }}
                </div>
              </th>
            </tr>
          </thead>
        </table>
      </div>

      <slot name="tbody"> </slot>
      <TableBody
        ref="tableBody"
        v-bind="$attrs"
        :header="_header"
        :data="currentData"
        :width="tableWidth"
        :height="height"
        :mergeSpan="style?.mergeSpan"
        :highlightSelectedRow="highlightSelectedRow"
        :showSelectColumn="showSelectColumn"
      >
        <template
          v-for="head in _header"
          :key="head.label"
          #[head.slot]="{ item, index, tr, td }"
        >
          <div class="cell">
            <slot :name="head.slot" :item="item" :index="index">
              {{ getTDHTML(tr, td) }}
            </slot>
          </div>
        </template>
        <template #empty>
          <slot name="empty">没有数据</slot>
        </template>
      </TableBody>
    </div>

    <div class="vc-table__pagination" v-show="pageTotal">
      <vc-pagination
        :index="pageIndex"
        :total="pageTotal"
        :size="pageSize"
        hide-on-single-page
        @indexChange="pageChangeEvt"
      />
    </div>
  </div>
</template>

<script>
import TableBody from './tableBody.vue'

export default {
  name: 'VcTable',
  components: {
    TableBody
  },
  provide() {
    return {
      vcTable: this
    }
  },
  props: {
    // 表格数据
    data: {
      type: Array,
      default: () => []
    },
    /**
     * 表格头
     * {
     *    label: {string} 标签,
     *    key: {string/function}  data 中 key,或设置方法取值，参考【函数式表头】示例
     *    slot: {string}  插槽名称,
     *    width: {number/string} 设置列宽
     * }
     */
    header: {
      type: Array,
      default: () => [],
      required: true
    },
    // 总条数
    pageTotal: {
      type: Number,
      default: 0
    },
    // 当前页
    pageIndex: {
      type: Number,
      default: 1
    },
    // 默认每页条数
    pageSize: {
      type: Number,
      default: 10
    },
    // 高度
    height: {
      type: String,
      default: 'auto'
    },
    // 异步数据
    asyncData: Boolean,
    loading: {
      type: [Boolean, String],
      default: false
    },
    // 显示边框，默认无
    border: Boolean,
    // 样式控制
    style: Object,
    // 高亮当前行
    highlightSelectedRow: {
      type: Boolean,
      default: false
    },
    // 显示单选选择列
    showSelectColumn: {
      type: [Boolean, String],
      default: false
    },
    // 显示多选选择列
    selectColumnWidth: {
      type: Number,
      default: 30
    }
  },
  data() {
    return {
      _pageIndex: this.pageIndex,
      _header: this.header,
      resizeObserver: null
      // tableWidth: 'auto'
    }
  },
  watch: {
    header: {
      handler() {
        this.updateTableSize()
      },
      deep: true
    }
  },
  computed: {
    currentData() {
      if (this.asyncData) {
        return this.data
      } else {
        let start = (this.pageIndex - 1) * this.pageSize
        let end = start + this.pageSize

        return this.data.slice(start, end)
      }
    },
    tableWidth() {
      console.log(this.header)
      this.header.forEach(item => {
        // if ()
      })
    },
    iStyle() {
      return {
        height: this.height ?? ''
      }
    }
  },
  mounted() {
    this.watchRootDom()
  },
  methods: {
    pageChangeEvt(index) {
      this.$emit('update:pageIndex', index)
      this.$emit('pageChange', index)
    },

    getTDHTML(tr, td) {
      if (typeof td.key === 'function') {
        return td.key(tr)
      } else {
        return tr[td.key]
      }
    },

    updateTableSize() {
      let { width } = this.$el.getBoundingClientRect()
      let setWitdh = 0
      let noSetWidth = 0
      let onHasWidthObjs = []
      let defaultTdWidth = 100
      let checked = false

      this._header = this.header.map(item => {
        let obj = { ...item }

        if (item.width) {
          setWitdh += item.width
        } else {
          noSetWidth += 1
          onHasWidthObjs.push(obj)
        }

        return obj
      })

      this.data.forEach(item => {
        if (item.checked) checked++
      })

      if (this.showSelectColumn && typeof this.showSelectColumn !== 'boolean') {
        this._header.unshift({
          label: '',
          key: '__SELECT_COLUMN__',
          width: this.selectColumnWidth + 'px',
          checked: checked === this.data.length,
          indeterminate: checked > 0 ? true : false
        })
      }

      // 设置的宽度大于容器宽度
      // if (setWitdh >= width) {
      //   this.tableWidth = setWitdh + noSetWidth * defaultTdWidth + 'px'
      // } else {
      //   defaultTdWidth = (width - setWitdh) / noSetWidth
      //   this.tableWidth = width + 'px'
      // }

      onHasWidthObjs.forEach(item => {
        item.width = defaultTdWidth
      })
    },

    watchRootDom() {
      this.resizeObserver = new ResizeObserver(() => {
        this.updateTableSize()
      })

      this.resizeObserver.observe(this.$el)
    },

    checkboxChange(item) {
      this.data.forEach(list => {
        list.checked = item.checked
      })

      item.indeterminate = false

      this.$emit('selectChange', item.checked ? this.data : [])
    }
  }
}
</script>
