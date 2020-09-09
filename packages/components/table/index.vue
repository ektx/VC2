<template>
  <div class="vc-table" >
    <div v-if="loading" class="vc-table__loading-mod">
      <div class="inner">
        <i class="vc-icon-loading"/>
        <p>{{ typeof loading === 'boolean' ? 'Loading...' : loading }}</p>
      </div>
    </div>

    <table :style="{height}">
      <colgroup>
        <col v-for="(h,i) in header" :key="i" :width="h.width"/>
      </colgroup>
      <thead>
        <tr>
          <th v-for="item in header" :key="item.label">{{item.label}}</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="currentData.length">
          <tr v-for="(tr, i) in currentData" :key="i" :class="tr.classes">
            <td v-for="td in header" :key="td.label">
              <slot :name="td.slot" v-bind:item="tr" v-bind:index="i">
                <span>{{tr[td.key]}}</span>
              </slot>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr class="empty">
            <td 
              v-if="!loading" 
              :colspan="header.length" 
            >没有数据</td>
          </tr>
        </template>
      </tbody>
    </table>
    <div class="vc-table__pagination" v-show="pageTotal">
      <vc-pagination 
        :index="pageIndex" 
        :total="pageTotal"
        :size="pageSize"
        @indexChange="pageChangeEvt"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "VcTable",
  props: {
    // 表格数据
    data: {
      type: Array,
      default: () => []
    },
    // 表格头
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
    height: {
      type: String,
      default: 'auto'
    },
    // 异步数据
    asyncData: Boolean,
    loading: {
      type: [Boolean, String],
      default: false
    }
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
    }
  },
  methods: {
    pageChangeEvt(index) {
      this.$emit('update:pageIndex', index)
      this.$emit('pageChange', index)
      this.$emit('page-change', index)
    }
  }
};
</script>
