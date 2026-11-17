<template>
  <div 
    :class="['vc-operation-list', {'is-focus': isFocus}]"
    :style="style"
  >
    <div class="vc-operation-list__container">
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
    </div>
    <div v-if="buttons" class="vc-operation-list__footer">
      <button @click.stop="$emit('add')">
        <i class="vc-icon-plus"></i>
      </button>
      <button @click.stop="$emit('delete')">
        <i class="vc-icon-minus"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VcOperationList',
  props: {
    // 值
    modelValue: {
      type: [Number, String],
      default: ''
    },
    // 表头
    head: {
      type: Array,
      default: () => ([])
    },
    // 列表
    list: {
      type: Array,
      default: () => ([])
    },
    // label 别名
    labelAlias: {
      type: String,
      default: 'label'
    },
    // key 别名
    keyAlias: {
      type: String,
      default: 'key'
    },
    // 是否显示按钮
    buttons: Boolean,
    // 设置高度
    height: {
      type: String,
      default: 'auto'
    }
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
    },
    style() {
      return {
        height: this.height
      }
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
      this.isFocus = false
    }
  }
}
</script>
