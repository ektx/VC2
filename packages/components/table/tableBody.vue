<template>
  <div
    :class="[
      'vc-table__body',
      { 'highlight-current-row': highlightSelectedRow }
    ]"
    :style="bodyStyle"
  >
    <table v-if="data.length" :class="{ 'has-border': vcTable.border }">
      <colgroup>
        <col v-for="(h, i) in header" :key="i" :width="h.width" />
      </colgroup>
      <tbody>
        <tr
          v-for="(tr, i) in data"
          :key="i"
          :class="[
            tr.classes,
            {
              current:
                showSelectColumn === 'checkbox' ? tr.checked : currentRow == tr
            }
          ]"
          @click="setSelected(tr)"
        >
          <td v-for="td in header" :key="td.key">
            <template v-if="td.key === '__SELECT_COLUMN__'">
              <Radio
                v-if="showSelectColumn === 'radio'"
                v-model="currentRow"
                :label="tr"
                ><i></i
              ></Radio>

              <input
                v-else-if="showSelectColumn === 'checkbox'"
                v-model="tr.checked"
                type="checkbox"
              />
            </template>
            <slot
              v-else
              :name="td.slot"
              :item="tr"
              :index="i"
              :tr="tr"
              :td="td"
            >
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else :class="['vc-table__empty', { 'is-border': vcTable.border }]">
      <div v-if="!vcTable.loading">
        <slot name="empty"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Radio from '../radio/index.vue'

export default {
  inject: ['vcTable'],
  components: { Radio },
  props: {
    header: Array,
    data: Array,
    mergeSpan: Array,
    width: String,
    highlightSelectedRow: Boolean,
    showSelectColumn: [Boolean, String]
  },
  data() {
    return {
      currentRow: null
    }
  },
  computed: {
    bodyStyle() {
      return {
        height: this.vcTable.height,
        width: this.width
      }
    }
  },
  mounted() {
    if (this.mergeSpan) this.setMergeSpan()
  },
  methods: {
    getTDHTML(tr, td) {
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

      this.mergeSpan.forEach(({ x, y, row, col }) => {
        trs[y].cells[x].rowSpan = row
        trs[y].cells[x].colSpan = col

        // others row
        for (let r = y; r < y + row; r++) {
          for (let c = x; c < x + col; c++) {
            if (r !== y || c !== x) {
              trs[r].cells[c].style.display = 'none'
            }
          }
        }
      })
    },

    setSelected(item) {
      if (this.showSelectColumn === 'checkbox') {
        if (item.checked) {
          item.checked = false
        } else {
          item.checked = true
        }

        this.currentRow = []
        this.data.forEach(list => {
          if (list.checked) this.currentRow.push(list)
        })

        this.updateAllCheckbox()
      } else {
        this.currentRow = item
      }

      this.vcTable.$emit('selectChange', this.currentRow)
    },

    updateAllCheckbox() {
      let firstChild = this.vcTable._header[0]

      if (this.currentRow.length === this.data.length) {
        firstChild.checked = true
        firstChild.indeterminate = false
      } else {
        firstChild.checked = false
        firstChild.indeterminate = this.currentRow.length ? true : false
      }
    }
  }
}
</script>
