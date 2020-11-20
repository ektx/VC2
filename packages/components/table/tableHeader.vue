<template>
  <table :class="{'has-border': vcTable.border}">
      <colgroup>
        <col v-for="(h,i) in vcTable.header" :key="i" :width="h.width"/>
      </colgroup>
      <thead>
        <tr>
          <th v-for="item in vcTable.header" :key="item.label">{{item.label}}</th>
        </tr>
      </thead>
    </table>
</template>

<script>
export default {
  inject: ['vcTable'],
}
</script>
