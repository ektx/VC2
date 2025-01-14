# TimelineCalendar 时间线日历

## week 星期维度

::: codeBox
```vue
<template>
  <VcTimelineCalendar 
    unit="week"
    :start-time="new Date(2022, 0, 1)"
    :end-time="new Date(2022, 11, 30, 23, 59, 59)"
    :head="head"
    :data="data"
    :scale="5"
    :aside-width="230"
    @onLabelClick="labelClick"
    @onCellClick="cellClick"
  />
</template>

<script setup>
import { ref } from 'vue'

const head = ref([
 {
    label: 'ID',
    key: 'id',
    width: 150
  },
  {
    label: 'Name',
    key: 'label',
    width: 150
  }
])
const data = ref([
  {
    id: '0001-0000-0000',
    label: 'A0010',
    calendar: [
      {
        // start: new Date(2022, 1, 6), // week-6
        // end: new Date(2022, 1, 12, 23, 59, 59),
        type: 'week',
        value: 6,
        inner: 100
      },
      {
        start: new Date(2022, 1, 13), // week-7
        end: new Date(2022, 1, 26, 23, 59, 59),
        style: { color: '#4caf50', background: '#f2ffe4' },
        inner: 999
      }
    ],
    children: [
      {
        id: '0001-0001-0000',
        label: 'A0011',
        calendar: [
          {
            start: new Date(2022, 2, 20),
            end: new Date(2022, 2, 25),
            inner: 1000
          },
          {
            start: new Date(2022, 2, 26),
            end: new Date(2022, 2, 31),
            style: { color: '#4caf50', background: 'rgba(76, 175, 80, .1)' },
            inner: 999
          }
        ]
      },
      {
        id: '0001-0002-0000',
        label: 'A0012',
        children: [
          {
            id: '0001-0002-0001',
            label: 'A0012-A'
          },
          {
            id: '0001-0002-0002',
            label: 'A0012-B'
          }
        ]
      }
    ]
  },
  {
    id: '0002-0000-0000',
    label: 'B0010',
    calendar: [
      {
        start: new Date(2022, 2, 24),
        end: new Date(2022, 2, 32),
        style: { background: '#f90', color: '#fff' },
        inner: 'hello'
      },
      {
        start: new Date(2022, 3, 1),
        end: new Date(2022, 3, 15),
        style: { background: '#4caf50', color: '#fff' },
        inner: 'World'
      }
    ]
  },
  {
    id: '0003-0000-0000',
    label: 'C0010'
  },
  {
    id: '0004-0000-0000',
    label: 'D0010'
  },
  {
    id: '0005-0000-0000',
    label: 'E0010'
  },
  {
    id: '0006-0000-0000',
    label: 'F0010'
  }
])

function labelClick({row, col, index}) {
  console.log('row:', row)
  console.log('col:', col)
  console.log('index:', index)
}

function cellClick({ row, col, index }) {
  console.log('row:', row)
  console.log('col:', col)
  console.log('index:', index)
}
</script>
```
:::

## 自定义渲染

`contentItem` 可以指定渲染自定义效果，可以获取到 `row`、`item`、`style` 与 `index` 信息。

`emptyItem` 用于返回单个空节点内容，返回内容有 `row`、`item` 与 `index`。

::: codeBox
```vue
<template>
  <VcTimelineCalendar 
    unit="week"
    :start-time="new Date(2022, 0, 1)"
    :end-time="new Date(2022, 11, 30, 23, 59, 59)"
    :head="head"
    :data="data"
    :scale="5"
    :aside-width="230"
  >
    <template #contentItem="{item, style, index}">
      <div class="item" :style="style">
        <input v-model="item.inner"/>
      </div>
    </template>
    <template #emptyItem="{index}">
      {{ index }}
    </template>
  </VcTimelineCalendar>
</template>

<script setup>
import { ref } from 'vue'

const head = ref([
 {
    label: 'ID',
    key: 'id',
    width: 150
  },
  {
    label: 'Name',
    key: 'label',
    width: 150
  }
])
const data = ref([
  {
    id: '0001-0000-0000',
    label: 'A0010',
    calendar: [
      {
        // start: new Date(2022, 1, 6), // week-6
        // end: new Date(2022, 1, 12, 23, 59, 59),
        type: 'week',
        value: 6,
        inner: 100
      },
      {
        start: new Date(2022, 1, 13), // week-7
        end: new Date(2022, 1, 26, 23, 59, 59),
        style: { color: '#4caf50', background: '#f2ffe4' },
        inner: 999
      }
    ],
    children: [
      {
        id: '0001-0001-0000',
        label: 'A0011',
        calendar: [
          {
            start: new Date(2022, 2, 20),
            end: new Date(2022, 2, 25),
            inner: 1000
          },
          {
            start: new Date(2022, 2, 26),
            end: new Date(2022, 2, 31),
            style: { color: '#4caf50', background: 'rgba(76, 175, 80, .1)' },
            inner: 999
          }
        ]
      },
      {
        id: '0001-0002-0000',
        label: 'A0012',
        children: [
          {
            id: '0001-0002-0001',
            label: 'A0012-A'
          },
          {
            id: '0001-0002-0002',
            label: 'A0012-B'
          }
        ]
      }
    ]
  },
  {
    id: '0002-0000-0000',
    label: 'B0010',
    calendar: [
      {
        start: new Date(2022, 2, 24),
        end: new Date(2022, 2, 32),
        style: { background: '#f90', color: '#fff' },
        inner: 'hello'
      },
      {
        start: new Date(2022, 3, 1),
        end: new Date(2022, 3, 15),
        style: { background: '#4caf50', color: '#fff' },
        inner: 'World'
      }
    ]
  },
  {
    id: '0003-0000-0000',
    label: 'C0010'
  },
  {
    id: '0004-0000-0000',
    label: 'D0010'
  },
  {
    id: '0005-0000-0000',
    label: 'E0010'
  },
  {
    id: '0006-0000-0000',
    label: 'F0010'
  }
])
</script>

<style lang="less" scoped>
.item {
  height: 100%;

  input {
    width: 100%;
    text-align: center;
    background: transparent;
    border: none;
  }
}
</style>
```
:::
