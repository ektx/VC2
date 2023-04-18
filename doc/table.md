# Table 表格

用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。

## 基础表格

基础的表格展示用法。

::: codeBox 
```vue
<template>
  <vc-table :data="data" :header="header"/>
</template>

<script>
export default {
  data () {
    return {
      header: [
        {
          label: '姓名',
          key: 'name',
          width: 100
        },
        {
          label: '时间',
          key: 'date',
          width: 100
        },
        {
          label: '地址',
          key: 'address',
        }
      ],
      data: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    }
  }
}
</script>
```
:::

## 带边框表格

::: codeBox 
```vue
<template>
  <vc-table :data="data" :header="header" border/>
</template>

<script>
export default {
  data () {
    return {
      header: [
        {
          label: '姓名',
          key: 'name',
          width: '100px'
        },
        {
          label: '时间',
          key: 'date',
          width: '100px'
        },
        {
          label: '地址',
          key: 'address',
        }
      ],
      data: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    }
  }
}
</script>
```
:::

## 函数式表头

通过函数方法来指定列有渲染内容。

::: codeBox 
```vue
<template>
  <vc-table :data="data" :header="header"/>
</template>

<script>
export default {
  data () {
    return {
      nameList: ['秦一世', '秦二世', '秦三世', '秦四世'],
      data: [
        {
          date: "2020-9-14",
          name: 0,
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2020-9-15",
          name: 1,
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2020-9-16",
          name: 2,
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2020-9-17",
          name: 3,
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
    }
  },
  computed: {
    header() {
      return [
        {
          label: '姓名',
          key: item => this.nameList[item.name],
          width: 100
        },
        {
          label: '时间',
          key: 'date',
          width: 100
        },
        {
          label: '地址',
          key: 'address',
        }
      ]
    }
  }
}
</script>
```
:::


## 带有分页

### 同步模式

一次加载所有表格的数据.

::: codeBox 
```vue
<template>
  <vc-table 
    :header="header" 
    :data="data" 
    v-model:pageIndex="index" 
    :page-total="data.length"
    height="200px"
    border
  >
    <template #empty>
      <vc-button @click="add">添加 1000 条数据</vc-button>
    </template>
  </vc-table>
</template>

<script>
export default {
  data() {
    return {
      header: [
        {
          label: '姓名',
          key: 'name',
          width: '180px'
        },
        {
          label: '时间',
          key: 'date',
          width: '180px'
        },
        {
          label: '地址',
          key: 'address',
        },
      ],
      data: [],
      index: 1
    }
  },
  methods: {
    showDetail (item, index) {
      console.log(item, index)
      item.name = 'zwl'
    },
    add () {
      for (let i = 0; i < 1000; i++) {
        this.data.push({
          date: `${2020 +i}-09-09`,
          name: `秦${i}世`,
          address: `上海市普陀区金沙江路 ${1518 + i} 弄`
        })
      }
    }
  }
}
</script>
```
:::

### 异步模式

每次加载部分数据。

::: codeBox 
```vue
<template>
  <vc-table 
    asyncData
    height="400px"
    :header="header" 
    :data="data"
    :loading="loading" 
    v-model:pageIndex="index" 
    :page-total="total"
    @page-change="pageChange"
  >
    <template #empty>
      <p>没有数据</p>
      <vc-button @click="pageChange(1)">添加数据</vc-button>
    </template>
  </vc-table>
</template>

<script>
export default {
  data() {
    return {
      header: [
        {
          label: '姓名',
          key: 'name',
          width: '180px'
        },
        {
          label: '时间',
          key: 'date',
          width: '180px'
        },
        {
          label: '地址',
          key: 'address',
        },
      ],
      data: [],
      index: 1,
      total: 0,
      loading: false
    }
  },
  methods: {
    showDetail (item, index) {
      console.log(item, index)
      item.name = 'zwl'
    },
    pageChange(index) {
      this.data = []
      this.loading = '加载中...'

      setTimeout(() => {
        debugger
        this.loading = false
        if (index === 1) this.total = 1000
  
        let i = (index -1) * 10
        let l = i + 10
  
        for (; i < l; i++) {
          this.data.push({
            date: `${2020 +i}-09-09`,
            name: `秦${i + 1}世`,
            address: `上海市普陀区金沙江路 ${1518 + i} 弄`
          })
        }
      }, 1000)

    }
  }
}
</script>
```
:::

## 加载中

::: codeBox 
```vue
<template>
  <vc-table height="200px" :header="header" :data="[]" loading/>
</template>

<script>
export default {
  data() {
    return {
      header: [
        {
          label: '姓名',
          key: 'name',
          width: 100
        },
        {
          label: '时间',
          key: 'date',
          width: 100
        },
        {
          label: '地址',
          key: 'address',
        },
        {
          label: '设置',
          slot: 'setting',
          width: 100
        },
      ],
    }
  },
}
</script>
```
:::

## 带状态表格

可将表格内容高亮显示，方便区分「成功、信息、警告、危险」等内容。

::: codeBox 

> 通过在 data 中添加 `classes` 属性，可以自定义当前行的颜色。

```vue
<template>
  <vc-table :header="header" :data="data" :index.sync="index" :total="data.length">
    <template v-slot:setting="{item, index}">
      <vc-button @click="showDetail(item, index)">详情</vc-button>
    </template>
  </vc-table>
</template>

<script>
export default {
  data() {
    return {
      header: [
        {
          label: '姓名',
          key: 'name',
          width: 100
        },
        {
          label: '时间',
          key: 'date',
          width: 100
        },
        {
          label: '地址',
          key: 'address',
        },
      ],
      data: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          classes: 'warning'
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          classes: "success"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          classes: "error"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      index: 1
    }
  },
}
</script>
<style>
.vc-table .warning td {
  color: #fff;
  background: #f90;
}
.vc-table .success td {
  color: #fff;
  background: green;
}
.vc-table .error td {
  color: #fff;
  background: red;
}
</style>
```
:::


## 自定义列模板

自定义列的显示内容，可组合其他组件使用。

::: codeBox 

> 通过在 header 的数组对象中，添加 `slot` 具名插槽可以自定义显示内容。

```vue
<template>
  <vc-table :header="header" :data="data" :total="data.length">
    <template #name="{item, index}">
      {{index +1}}.<vc-button>{{item.name}}</vc-button>
    </template>
    <template #date="{item, index}">
      <i class="vc-icon-time"></i>{{item.date}}
    </template>
    <template v-slot:address="{item, index}">
      <input v-model="item.address" />
    </template>
  </vc-table>
</template>

<script>
export default {
  data() {
    return {
      header: [
        {
          label: '姓名',
          key: 'name',
          slot: 'name',
          width: 100
        },
        {
          label: '时间',
          key: 'date',
          slot: 'date',
          width: 180
        },
        {
          label: '地址',
          key: 'address',
          slot: 'address'
        },
      ],
      data: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    }
  },
}
</script>
```
:::


## 表格合并方案

::: codeBox 

> 通过 `style.mergeSpan` 来手动控制合并对象。

```vue
<template>
  <vc-table :data="data" :header="header" border :style="style"/>
</template>

<script>
export default {
  data () {
    return {
      header: [
        {
          label: 'ID',
          key: 'id',
          width: 100
        },
        {
          label: '姓名',
          key: 'name',
          width: 100
        },
        {
          label: '数值1',
          key: 'amount1',
          width: 100
        },
        {
          label: '数值2',
          key: 'amount2',
          width: 100
        },
        {
          label: '数值3',
          key: 'amount3',
        },
      ],
      data: [
        {
          id: '0x0001',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10,
         
        }, 
        {
          id: '0x0001',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 10,
        }, 
        {
          id: '0x0001',
          name: '王小军',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }, 
         {
          id: '0x0001',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }, 
        {
          id: '0x0002',
          name: '王小军',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        },
        {
          id: '0x0002',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        }, 
        {
          id: '0x0002',
          name: '王小虎',
          amount1: '621',
          amount2: '2.1',
          amount3: 18
        }, 
        {
          id: '0x0003',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        }, 
      ],
      // style: {
      //   mergeSpan: [
      //     {
      //       x: 1,
      //       y: 0,
      //       row: 2,
      //       col: 1
      //     },
      //     {
      //       x: 0,
      //       y: 0,
      //       row: 3,
      //       col: 1
      //     },
      //   ]
      // }
    }
  },
  computed: {
    style() {
      let result = []
      let obj = {}

      // 树型数据自动合并
      this.data.forEach((item, y, data) => {
        this.header.forEach((head, x, header) => {
          let val = item[head.key]

          if (val in obj) {
            let arr = obj[val].slice(-1)[0]

            if (x > 0 && y > 0) {
              let prevSibling = data[y -1][header[x].key]
              let thisSiblingParentVal = data[y][header[x -1].key]

              if (val === prevSibling) {
                // 获取父级对象
                let thisParentObj = obj[thisSiblingParentVal].slice(-1)[0]
                // 如果需要在已经存在的对象上进行行例合并
                // 则父级合并的行数必须大于 1 
                if (thisParentObj.row > 1) {
                  if (y > arr.y) {
                    arr.row += 1
                  }
  
                  if (x > arr.x) {
                    arr.col += 1
                  }
                } else {
                  obj[val].push({x, y, row: 1, col: 1})
                }
              } else {
                obj[val].push({x, y, row: 1, col: 1})
              }
            } else {
              if (y > arr.y) {
                arr.row += 1
              }
  
              if (x > arr.x) {
                arr.col += 1
              }
            }

          } else {
            obj[val] = [{x, y, row: 1, col: 1}]
          }
        })
      })

      return {mergeSpan: Object.values(obj).flat().filter(item => (item.row > 1 || item.col > 1))}
    }
  }
}
</script>
```
:::


## 单选功能

::: codeBox 
```vue
<template>
  <vc-table :data="data" :header="header" 
    show-select-column="radio" 
    highlight-selected-row 
    @selectChange="change"
  />
</template>

<script>
export default {
  data () {
    return {
      header: [
        {
          label: '姓名',
          key: 'name',
          width: 100
        },
        {
          label: '时间',
          key: 'date',
        },
        {
          label: '地址',
          key: 'address',
        }
      ],
      data: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    }
  },
  methods: {
    change(val) {
      console.log(val)
    }
  }
}
</script>
```
:::

## 多选功能

::: codeBox 
```vue
<template>
  <vc-table :data="data" :header="header" 
    show-select-column="checkbox" 
    highlight-selected-row 
    @selectChange="change"
  />
</template>

<script>
export default {
  data () {
    return {
      header: [
        {
          label: '姓名',
          key: 'name',
          width: 100
        },
        {
          label: '时间',
          key: 'date',
        },
        {
          label: '地址',
          key: 'address',
        }
      ],
      data: [
        {
          date: "2016-05-02",
          name: "王小虎",
          checked: true,
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    }
  },
  methods: {
    change(val) {
      console.log(val)
    }
  }
}
</script>
```
:::


# 表格属性

| 参数 | 类型 | 说明 | 默认值 | 可选值 |
| --- | --- | --- | --- | --- |
| data | **Array** | 表格数据 | [] | - |
| header | **Array** | 表格头 | [] | - |
| pageTotal | **Number** | 总条数 | - | - |
| pageIndex | **Number** | 当前页 | 1 | - |
| pageSize | **Number** | 默认每页条数 | 10 | - |
| height | **String** | 高度 | auto | - |
| asyncData | **Boolean** | 异步数据 | false | - |
| loading | **Boolean/String** | 布尔值时，控制是否加载；<br/>字符串时，加载时文字 | false | - |
| border | **Boolean** | 显示边框，默认无 | auto | - |
| style | **Object** | 样式控制 | {} | - |

## 表格头属性

| 参数 | 类型 | 说明 | 默认值 | 可选值 |
| --- | --- | --- | --- | --- |
| label | **String** | 标签 | - | - |
| key | **String/Function** | data 中 key<br/>或设置方法取值，参考【函数式表头】示例 | - | - |
| slot | **String** | 插槽名称 | - | - |
| width | **Number/String** | 设置列宽 | - | - |

## Style Props
| 参数 | 类型 | 说明 | 默认值 | 可选值 |
| --- | --- | --- | --- | --- |
| mergeSpan | **Array** | 表格合并对象，格式为 `[{x,y,row,col}]`<br/>- `x` td索引<br/>- `y` tr索引<br/>- `row` rowSpan值<br/>- `col` colSpan值 | - | - |

# Events


| 事件名称 | 说明 | 回调参数 |  
|---|---|---|
| page-change | 分页变化时，返回最新页码 | (index) => {} |
