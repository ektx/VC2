# Menu 菜单

## 顶部导航

::: codeBox
```vue
<template>
  {{ value }}
  <hr />
  <vc-menu mode="horizontal" v-model="value" @change="onChange">
    <vc-menu-item value="1">🏡 Home</vc-menu-item>
    <vc-menu-item value="2" disabled icon="vc-icon-warning-outline">
      禁用效果
    </vc-menu-item>
    <vc-menu-item value="3">
      <template #icon><i class="vc-icon-wind-power"></i></template>
      <span>子级效果</span>
      <template #children>
        <vc-menu-item value="3-1">标签一</vc-menu-item>
        <vc-menu-item value="3-2">
          <span>标签二</span>
          <template #children>
            <vc-menu-item value="3-2-1">Label One</vc-menu-item>
            <vc-menu-item value="3-2-2">Label Two</vc-menu-item>
            <vc-menu-item value="3-2-3">Label Three</vc-menu-item>
          </template>
        </vc-menu-item>
        <vc-menu-item value="3-3">标签三</vc-menu-item>
      </template>
    </vc-menu-item>
  </vc-menu>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('3-2-2')

const onChange = val => {
  console.log(val)
}
</script>
```
:::

## 侧边导航

::: codeBox
```vue
<template>
  {{ inlineValue }} <hr />
  <h4>mode=inline</h4>
  <div style="width: 200px;">
    <vc-menu mode="inline" v-model="inlineValue">
      <vc-menu-item value="1">🏡 Home</vc-menu-item>
      <vc-menu-item value="2" disabled icon="vc-icon-warning-outline">禁用效果</vc-menu-item>
      <vc-menu-item value="3">
        <template #icon><i class="vc-icon-wind-power"></i></template>
        <span>子级效果</span>
        <template #children>
          <vc-menu-item value="3-1">标签一</vc-menu-item>
          <vc-menu-item value="3-2">
            <span>标签二</span>
            <template #children>
              <vc-menu-item value="3-2-1">这是一个超长的标签 text text这是一个超长的标签 text text这是一个超长的标签 text text这是一个超长的标签 text text这是一个超长的标签 text text</vc-menu-item>
              <vc-menu-item value="3-2-2">Label One</vc-menu-item>
              <vc-menu-item value="3-2-3">Label Two</vc-menu-item>
              <vc-menu-item value="3-2-4">Label Three</vc-menu-item>
            </template>
          </vc-menu-item>
          <vc-menu-item value="3-3">标签三</vc-menu-item>
        </template>
      </vc-menu-item>
    </vc-menu>
  </div>

  {{ verticalValue }} <hr/>
  <h4>mode=vertical</h4>
  <div style="width: 200px">
    <vc-menu mode="vertical" v-model="verticalValue">
      <vc-menu-item value="1">🏡 Home</vc-menu-item>
      <vc-menu-item value="2" disabled icon="vc-icon-warning-outline">禁用效果</vc-menu-item>
      <vc-menu-item value="3">
        <template #icon><i class="vc-icon-wind-power"></i></template>
        <span>子级效果</span>
        <template #children>
          <vc-menu-item value="3-1">标签一</vc-menu-item>
          <vc-menu-item value="3-2">
            <span>标签二</span>
            <template #children>
              <vc-menu-item value="3-2-1">这是一个超长的标签这是一个超长的标签</vc-menu-item>
              <vc-menu-item value="3-2-2">Label Two</vc-menu-item>
              <vc-menu-item value="3-2-3">Label Three</vc-menu-item>
            </template>
          </vc-menu-item>
          <vc-menu-item value="3-3">标签三</vc-menu-item>
        </template>
      </vc-menu-item>
    </vc-menu>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const inlineValue = ref('3-2-2')
const verticalValue = ref('2')
</script>
```
:::

## 默认展开

通过指定 `expand` 可以设置默认展开元素。

::: codeBox
```vue
<template>
  {{ inlineValue }} <hr />
  <div style="width: 200px;">
    <vc-menu mode="inline" v-model="inlineValue" v-model:expand="expand" expand-on-click-icon>
      <vc-menu-item value="1">🏡 Home</vc-menu-item>
      <vc-menu-item value="2" disabled icon="vc-icon-warning-outline">禁用效果</vc-menu-item>
      <vc-menu-item value="3">
        <template #icon><i class="vc-icon-wind-power"></i></template>
        <span>子级效果</span>
        <template #children>
          <vc-menu-item value="3-1">标签一</vc-menu-item>
          <vc-menu-item value="3-2">
            <span>标签二</span>
            <template #children>
              <vc-menu-item value="3-2-1">3-2-1</vc-menu-item>
              <vc-menu-item value="3-2-2">Label One</vc-menu-item>
              <vc-menu-item value="3-2-3">Label Two</vc-menu-item>
              <vc-menu-item value="3-2-4">Label Three</vc-menu-item>
            </template>
          </vc-menu-item>
          <vc-menu-item value="3-3">
            标签三
            <template #children>
              <vc-menu-item value="3-3-1">3-3-1</vc-menu-item>
              <vc-menu-item value="3-3-2">3-3-2</vc-menu-item>
              <vc-menu-item value="3-3-3">3-3-3</vc-menu-item>
              <vc-menu-item value="3-3-4">3-3-4</vc-menu-item>
            </template>
          </vc-menu-item>
        </template>
      </vc-menu-item>
    </vc-menu>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const inlineValue = ref('3-2-2')
const expand = ref(['3', '3-2', '3-3'])
</script>
```
:::

## 折叠导航

折叠导航时，需要设置一级导航的图标，否则可能丢失导航。

::: codeBox
```vue
<template>
  <vc-radio-group 
    v-model="collapse"
    type="button" 
  >
    <vc-radio v-model="collapse" :label="true">折叠</vc-radio>
    <vc-radio v-model="collapse" :label="false">展开</vc-radio>
  </vc-radio-group>
  {{ inlineValue }} <hr />

  <vc-menu mode="inline" v-model="inlineValue" :collapse="collapse">
    <vc-menu-item value="1" icon="vc-icon-s-shop">Home</vc-menu-item>
    <vc-menu-item value="2" disabled icon="vc-icon-warning-outline">禁用效果</vc-menu-item>
    <vc-menu-item value="3">
      <template #icon><i class="vc-icon-wind-power"></i></template>
      <span>子级效果</span>
      <template #children>
        <vc-menu-item value="3-1">标签一</vc-menu-item>
        <vc-menu-item value="3-2">
          <span>标签二</span>
          <template #children>
            <vc-menu-item value="3-2-1">1、这是一个超长的标签 text text</vc-menu-item>
            <vc-menu-item value="3-2-2">Label One</vc-menu-item>
            <vc-menu-item value="3-2-3">Label Two</vc-menu-item>
            <vc-menu-item value="3-2-4">Label Three</vc-menu-item>
          </template>
        </vc-menu-item>
        <vc-menu-item value="3-3">标签三</vc-menu-item>
      </template>
    </vc-menu-item>
  </vc-menu>

  {{ verticalValue }} <hr/>
  <vc-menu 
    class="customize-menu" 
    mode="vertical" 
    v-model="verticalValue" 
    :collapse="collapse" 
    :width="300"
    minWidth="60px"
  >
    <vc-menu-item value="1" icon="vc-icon-s-shop">Home</vc-menu-item>
    <vc-menu-item value="2" disabled icon="vc-icon-warning-outline">禁用效果</vc-menu-item>
    <vc-menu-item value="3">
      <!-- 自定义 ICON -->
      <template #icon><i class="vc-icon-wind-power"></i></template>
      <span>子级效果</span>
      <template #children>
        <vc-menu-item value="3-1">标签一</vc-menu-item>
        <vc-menu-item value="3-2">
          <span>标签二</span>
          <template #children>
            <vc-menu-item value="3-2-1">1、这是一个超长的标签 text text</vc-menu-item>
            <vc-menu-item value="3-2-2">Label Two</vc-menu-item>
            <vc-menu-item value="3-2-3">Label Three</vc-menu-item>
          </template>
        </vc-menu-item>
        <vc-menu-item value="3-3">标签三</vc-menu-item>
      </template>
    </vc-menu-item>
  </vc-menu>
</template>

<script setup>
import { ref } from 'vue'

const inlineValue = ref('3-2-2')
const verticalValue = ref('2')
const collapse = ref(true)
</script>

<style lang="less" scoped>
.customize-menu {
  :deep(.vc-menu-item--icon) {
    font-size: 24px; // <- 设置图标大小
  }
}
</style>
```
:::

## 更多图标位置设置

::: codeBox
```vue
<template>
  {{ value }}
  <hr />
  <vc-menu mode="horizontal" v-model="value" more-icon-position="left">
    <vc-menu-item value="1">🏡 Home</vc-menu-item>
    <vc-menu-item value="2" disabled icon="vc-icon-warning-outline">
      禁用效果
    </vc-menu-item>
    <vc-menu-item value="3">
      <template #icon><i class="vc-icon-wind-power"></i></template>
      <span>子级效果</span>
      <template #children>
        <vc-menu-item value="3-1">标签一</vc-menu-item>
        <vc-menu-item value="3-2">
          <span>标签二</span>
          <template #children>
            <vc-menu-item value="3-2-1">Label One</vc-menu-item>
            <vc-menu-item value="3-2-2">Label Two</vc-menu-item>
            <vc-menu-item value="3-2-3">Label Three</vc-menu-item>
          </template>
        </vc-menu-item>
        <vc-menu-item value="3-3">标签三</vc-menu-item>
      </template>
    </vc-menu-item>
  </vc-menu>

  {{ inlineValue }} <hr />
  <div style="width: 200px;">
    <vc-menu mode="inline" v-model="inlineValue" more-icon-position="left">
      <vc-menu-item value="1">Home</vc-menu-item>
      <vc-menu-item value="2" disabled>禁用效果</vc-menu-item>
      <vc-menu-item value="3">
        <span>子级效果</span>
        <!-- 自定义展开收缩的标记 -->
        <template #more="{status}">{{status ? '-' : '+'}}</template>
        <template #children>
          <vc-menu-item value="3-1">标签一</vc-menu-item>
          <vc-menu-item value="3-2">
            <span>标签二</span>
            <template #children>
              <vc-menu-item value="3-2-1">1、这是一个超长的标签 text text</vc-menu-item>
              <vc-menu-item value="3-2-2">Label One</vc-menu-item>
              <vc-menu-item value="3-2-3">Label Two</vc-menu-item>
              <vc-menu-item value="3-2-4">Label Three</vc-menu-item>
            </template>
          </vc-menu-item>
          <vc-menu-item value="3-3">标签三</vc-menu-item>
        </template>
      </vc-menu-item>
    </vc-menu>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('3-2-2')
const inlineValue = ref('3-2-2')

</script>
```
:::

## Menu 属性

| 参数 | 类型 | 说明 | 可选值 | 默认值 |
|---|---|---|---|---|
| modelValue/v-model | **String[]** | 值 | - | - |
| mode | **string** | 模式 | inline/horizontal/vertical | - |
| expand | **String[]** | 默认扩展（只在inline模式下生效） | - | - |
| expandOnClickIcon | **boolean** | 只在点击展开图标时展开 | - | false |
| closeDelay | **Number** | 关闭弹层延迟(ms) | - | 100 |
| collapse | **boolean** | 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用） | - | false |
| moreIconPosition | **String** | 更多图标位置 | - | right |

## Menu 事件

| 事件名称 | 说明 | 参数 |
|---|---|---|
| `update:modelValue` | 更新值 | - |
| `change` | 变更时事件 | 如下 |

```js
const change = (key, path, item) {
  // key string 值
  // path string[] modelValue
  // item Object 当前点击 MenuItem Vue实例
}
```


## MenuItem 属性

| 参数 | 类型 | 说明 | 可选值 | 默认值 |
|---|---|---|---|---|
| disabled | **Boolean** | 是否禁用 | - | false |
| value | **string** | 绑定的值 | - | - |
| icon | **String** | 图标（VC2 中图标） | - | - |

## MenuItem Slot

| 名称 | 说明 |
| --- | --- |
| default | 内容渲染 |
| children | 子级渲染 |
| more | 更多图标设置 |
| icon | 自定义展开收缩图标设置 |

