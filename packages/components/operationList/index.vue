<template>
  <div class="vc-operation-list">
    <table>
      <thead>
        <tr>
          <th v-for="item in head" :key="item[keyAlias]">
            {{ item[labelAlias] }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(tr, i) in list" :key="i">
          <td v-for="td in head" :key="td[keyAlias]">
            {{ tr[td[keyAlias]] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'VcOperationList',
  props: {
    modelValue: {
      type: [Number, String],
      default: ''
    },
    head: {
      type: Array,
      default: () => ([])
    },
    list: {
      type: Array,
      default: () => ([])
    },
    labelAlias: {
      type: String,
      default: 'label'
    },
    keyAlias: {
      type: String,
      default: 'key'
    }
  }
}
</script>

<style lang="less">
.vc-operation-list {
  font-size: 14px;
  border: 1px solid rgb(197, 197, 197);

  table {
    width: 100%;

    thead {
      border-bottom: 1px solid rgb(199, 199, 199);

      th {
        color: #262626;
        background-color: rgb(240, 240, 240);
      }
    }

    th {
      padding: 5px;
      text-align: left;
    }
  }
  h1 {
    color: red;
  }
}
</style>