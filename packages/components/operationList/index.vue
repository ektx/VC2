<template>
  <div :class="['vc-operation-list', {'is-focus': isFocus}]">
    <table>
      <thead>
        <tr>
          <th v-for="item in head" :key="item[keyAlias]">
            {{ item[labelAlias] }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="(tr, i) in myList" 
          :key="i"
          :class="[{
            'is-active': tr.$isActive
          }]"
          @click.stop="clickEvt(i)"
        >
          <td v-for="td in head" :key="td[keyAlias]">
            {{ tr[td[keyAlias]] }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="vc-operation-list__footer">
      <button>
        <i class="vc-icon-plus"></i>
      </button>
      <button>
        <i class="vc-icon-minus"></i>
      </button>
    </div>
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
    },
    buttons: Boolean
  },
  data() {
    return {
      isFocus: false,
    }
  },
  computed: {
    myList () {
      return this.list.map((item, i) => {
        item.$isActive = [].concat(this.modelValue).includes(i)

        return item
      })
    }
  },
  mounted() {
    document.addEventListener('click', this.blurEvt)
  },
  unmounted() {
    document.removeEventListener('click', this.blurEvt)
  },
  methods: {
    clickEvt(i) {
      this.isFocus = true
      this.$emit('update:modelValue', i)
    },

    blurEvt(evt) {
      console.log(evt)
      this.isFocus = false
    }
  }
}
</script>

<style lang="less">
.vc-operation-list {
  font-size: 14px;
  color: #262626;
  border: 1px solid rgb(197, 197, 197);

  table {
    width: 100%;

    thead {
      font-size: 12px;
      border-bottom: 1px solid rgb(199, 199, 199);

      th {
        padding: 5px;
        text-align: left;
        background-color: rgb(240, 240, 240);
      }
    }

    tbody {
      tr {
        transition: background-color .3s;

        &:hover {
          background-color: #eee;
        }

        &.is-active {
          background-color: rgb(220, 220, 220);
        }
      }
      td {
        text-align: left;
        padding: 3px 5px;
      }
    }
  }

  &.is-focus tbody tr.is-active {
    color: #fff;
    background-color: #0099ff;
  }

  &__footer {
    display: flex;
    align-items: center;
    height: 24px;
    border-top: 1px solid #c7c7c7;
    background-color: #f0f0f0;
    box-sizing: border-box;

    button {
      display: inline-flex;
      width: 24px;
      height: 100%;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      border: none;
      border-radius: 0;
      border-right: 1px solid #c7c7c7;
      outline: none;

      &:active {
        background-color: #ccc;
      }
    }
  }
}
</style>