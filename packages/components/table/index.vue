<template>
  <div class="vc-table-com">
    <table>
      <colgroup>
        <col v-for="(h,i) in header" :key="i" :width="h.width"/>
      </colgroup>
      <thead>
        <tr>
          <th v-for="item in header" :key="item.label">{{item.label}}</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="data.length">
          <tr v-for="(tr, i) in data" :key="i">
            <td v-for="td in header" :key="td.label">
              <slot :name="td.slot" v-bind:item="tr" v-bind:index="i">
                <span>{{tr[td.key]}}</span>
              </slot>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr class="empty">
            <td :colspan="header.length">没有数据</td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr v-show="total">
          <td :colspan="header.length">
            <vc-pagination 
              v-model:index="pageIndex" 
              :total="total"
            />
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  name: "VcTable",
  props: {
    data: {
      type: Array,
      default: () => []
    },
    header: {
      type: Array,
      default: () => []
    },
    total: {
      type: Number,
      default: 0
    },
    index: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      pageIndex: this.index
    }
  },
  watch: {
    pageIndex (val) {
      this.$emit('update:index', val)
      this.$emit('indexChange', val)
    }
  },
  methods: {

  }
};
</script>
