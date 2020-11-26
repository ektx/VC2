<template>
  <table :class="{'has-border': vcTable.border}">
      <colgroup>
        <col v-for="(h,i) in header" :key="i" :width="h.width"/>
      </colgroup>
      <thead>
        <tr>
          <th v-for="item in header" :key="item.label">{{item.label}}</th>
        </tr>
      </thead>
    </table>
</template>

<script>
export default {
  inject: ['vcTable'],
  props: {
    header: Array
  }
}
</script>
