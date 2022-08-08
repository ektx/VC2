# Menu 菜单

## 顶部导航

::: codeBox
```vue
<template>
  {{ value }}
  <hr />
  <vc-menu mode="horizontal" v-model="value">
    <vc-menu-item value="1">🏡 Home</vc-menu-item>
    <vc-menu-item value="2" disabled>
      <i class="vc-icon-no-smoking" />
      禁用效果
    </vc-menu-item>
    <vc-menu-item value="3">
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
      <vc-menu-item value="2" disabled>
        <i class="vc-icon-no-smoking" />
        禁用效果
      </vc-menu-item>
      <vc-menu-item value="3">
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
      <vc-menu-item value="2" disabled>
        <i class="vc-icon-no-smoking" />
        禁用效果
      </vc-menu-item>
      <vc-menu-item value="3">
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
