<template>
  <div class="vc-table__body" :style="bodyStyle">
    <table v-if="vcTable.currentData.length" :class="{'has-border': vcTable.border}">
      <colgroup>
        <col v-for="(h,i) in header" :key="i" :width="h.width"/>
      </colgroup>
      <tbody>
        <tr v-for="(tr, i) in vcTable.currentData" :key="i" :class="tr.classes">
          <td v-for="td in header" :key="td.label">
            <slot :name="td.slot" :item="tr" :index="i" :tr="tr" :td="td">
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="vc-table__empty">
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
    header: Array
  },
  computed: {
    bodyStyle() {
      return {
        height: this.vcTable.height
      }
    }
  },
  methods: {
    getTDHTML (tr, td) {
      if (typeof td.key === 'function') {
        return td.key(tr)
      } else {
        return tr[td.key]
      }
    }
  }
}
</script>
