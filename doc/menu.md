# Menu 菜单

## 顶部导航

::: codeBox
```vue
<template>
  {{ value }}
  <hr />
  <vc-menu mode="horizontal" v-model="value">
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

const value = ref(['3', '3-2', '3-2-2'])
</script>
```
:::

## 侧边导航

::: codeBox
```vue
<template>
  {{ inlineValue }} <hr />
  <div style="width: 200px; border-right: 1px solid #eee">
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

  {{ verticalValue }} <hr/>
  <div style="width: 200px; border-right: 1px solid #eee">
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
              <vc-menu-item value="3-2-1">1、这是一个超长的标签 text text</vc-menu-item>
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

const inlineValue = ref(['3', '3-2', '3-2-2'])
const verticalValue = ref(['2'])
</script>
```
:::

## 折叠导航

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
  <vc-menu mode="inline" v-model="inlineValue" :collapse="collapse" style="width: 200px; border-right: 1px solid #eee">
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
    style="width: 200px; border-right: 1px solid #eee"
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

const inlineValue = ref(['3', '3-2', '3-2-2'])
const verticalValue = ref(['2'])
const collapse = ref(true)
</script>

<style lang="less" scoped>
.customize-menu {
  :deep(.vc-menu-item--icon) {
    font-size: 24px;
  }
}
</style>
```
:::
