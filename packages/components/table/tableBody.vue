<template>
  <div class="vc-table__body" :style="bodyStyle">
    <table v-if="data.length" :class="{'has-border': vcTable.border}">
      <colgroup>
        <col v-for="(h,i) in header" :key="i" :width="h.width"/>
      </colgroup>
      <tbody>
        <tr v-for="(tr, i) in data" :key="i" :class="tr.classes">
          <td v-for="td in header" :key="td.label">
            <slot :name="td.slot" :item="tr" :index="i" :tr="tr" :td="td">
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else :class="['vc-table__empty', {'is-border': vcTable.border}]">
      <div v-if="!vcTable.loading">
        <slot name="empty"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['vcTable'],
  props: {
    header: Array,
    data: Array,
    mergeSpan: Array
  },
  computed: {
    bodyStyle() {
      return {
        height: this.vcTable.height
      }
    }
  },
  mounted() {
    if (this.mergeSpan) {
      this.setMergeSpan()
    }
  },
  methods: {
    getTDHTML (tr, td) {
      if (typeof td.key === 'function') {
        return td.key(tr)
      } else {
        return tr[td.key]
      }
    },

    setMergeSpan() {
      let table = this.$el.querySelector('table')
      let tbody = table.tBodies[0]
      let trs = tbody.rows

      this.mergeSpan.forEach(({x, y, row, col}) => {
        trs[y].cells[x].rowSpan = row
        trs[y].cells[x].colSpan = col

        // others row
        for (let r = y; r < (y+row); r++) {
          for (let c = x; c < (x+col); c++) {
            if (r !== y || c !== x) {
              trs[r].cells[c].style.display = 'none'
            }
          }
        }

      })
    }
  }
}
</script>
