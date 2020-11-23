<template>
  <div class="vc-table" >
    <div v-if="loading" class="vc-table__loading-mod">
      <div class="inner">
        <i class="vc-icon-loading"/>
        <p>{{ typeof loading === 'boolean' ? 'Loading...' : loading }}</p>
      </div>
    </div>
    <TableHeader :header="_header"/>
    <TableBody v-bind="$attrs" :header="_header">
      <template v-for="head in _header" :key="head.label" #[head.slot]="{item, index, tr, td}">
        <slot :name="head.slot" :item="item" :index="index">
          {{getTDHTML(tr, td)}}
        </slot>
      </template>
      <template #empty>
        <slot name="empty">没有数据</slot>
      </template>
    </TableBody>
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
import TableHeader from './tableHeader.vue'
import TableBody from './tableBody.vue'

export default {
  name: "VcTable",
  components: {
    TableBody,
    TableHeader
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
      default: () => []
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
    border: Boolean
  },
  data() {
    return {
      _pageIndex: this.pageIndex
    }
  },
  computed: {
    currentData() {
      if (this.asyncData) {
        return this.data
      } else {
        let start = (this.pageIndex -1) * this.pageSize
        let end = start + this.pageSize

        return this.data.slice(start, end)
      }
    },
    _header() {
      return this.header.map(item => {
        let width = 'auto'
        
        if ('width' in item) {
          width = typeof item.width === 'number' ? item.width +'px' : item.width
        }

        return {
          ...item,
          width
        }
      })
    }
  },
  methods: {
    pageChangeEvt(index) {
      this.$emit('update:pageIndex', index)
      this.$emit('pageChange', index)
      this.$emit('page-change', index)
    },

    getTDHTML (tr, td) {
      if (typeof td.key === 'function') {
        return td.key(tr)
      } else {
        return tr[td.key]
      }
    }
  }
};
</script>
