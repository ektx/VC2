# Collapse 折叠面板

通过折叠面板收纳内容区域

## 基础效果

可同时展开多个面板，面板之间不影响

::: codeBox
```vue
<template>
  <vc-collapse v-model="value">
    <vc-collapse-item title="一致性 Consistency" value="1" sticky>
      <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
      <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
    </vc-collapse-item>
    <vc-collapse-item title="反馈 Feedback" value="2">
      <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
      <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
    </vc-collapse-item>
    <vc-collapse-item title="效率 Efficiency" value="3">
      <div>简化流程：设计简洁直观的操作流程；</div>
      <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
      <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
    </vc-collapse-item>
    <vc-collapse-item title="可控 Controllability" value="4">
      <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
      <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
    </vc-collapse-item>
  </vc-collapse>
</template>

<script>
export default {
  data() {
    return {
      value: ['1']
    }
  }
}
</script>
```
:::

## 手风琴效果

每次只能展开一个面板

::: codeBox
```vue
<template>
  <vc-collapse v-model="value" accordion>
    <vc-collapse-item title="一致性 Consistency" value="1">
      <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
      <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
    </vc-collapse-item>
    <vc-collapse-item title="反馈 Feedback" value="2">
      <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
      <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
    </vc-collapse-item>
    <vc-collapse-item title="效率 Efficiency" value="3">
      <div>简化流程：设计简洁直观的操作流程；</div>
      <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
      <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
    </vc-collapse-item>
    <vc-collapse-item title="可控 Controllability" value="4">
      <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
      <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
    </vc-collapse-item>
  </vc-collapse>
</template>

<script>
export default {
  data() {
    return {
      value: ['1']
    }
  }
}
</script>
```
:::

## 自定义面板标题

除了可以通过 `title` 属性以外，还可以通过具名插槽来实现自定义面板的标题内容，以实现增加图标等效果。

::: codeBox
```vue
<template>
  <vc-collapse v-model="value" accordion>
    <vc-collapse-item value="1">
      <template #title>
        一致性 Consistency <i class="vc-icon-star-off"/>
      </template>
      <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
      <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
    </vc-collapse-item>
    <vc-collapse-item title="反馈 Feedback" value="2">
      <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
      <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
    </vc-collapse-item>
    <vc-collapse-item title="效率 Efficiency" value="3">
      <div>简化流程：设计简洁直观的操作流程；</div>
      <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
      <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
    </vc-collapse-item>
    <vc-collapse-item title="可控 Controllability" value="4">
      <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
      <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
    </vc-collapse-item>
  </vc-collapse>
</template>

<script>
export default {
  data() {
    return {
      value: ['1']
    }
  }
}
</script>
```
:::

## 禁用效果

使用 `disabled` 可以禁用。

::: codeBox
```vue
<template>
  <vc-collapse v-model="value" accordion>
    <vc-collapse-item title="一致性 Consistency" value="1">
      <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
      <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
    </vc-collapse-item>
    <vc-collapse-item title="反馈 Feedback" value="2" disabled>
      <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
      <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
    </vc-collapse-item>
    <vc-collapse-item title="效率 Efficiency" value="3">
      <div>简化流程：设计简洁直观的操作流程；</div>
      <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
      <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
    </vc-collapse-item>
    <vc-collapse-item title="可控 Controllability" value="4">
      <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
      <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
    </vc-collapse-item>
  </vc-collapse>
</template>

<script>
export default {
  data() {
    return {
      value: ['1']
    }
  }
}
</script>
```
:::

## Poprs

| 参数 | 类型 | 说明 | 可选值 | 默认值 |
|---|---|---|---|---|
| v-model | **Array** | 当前激活的面板 | - | [] |
| accordion | **Boolean** | 是否手风琴模式 | - | false |
| noBorder | **Boolean** | 移除边框 | - | false |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 当前激活面板改变时触发 | (Array) => {} |

## CollapseItem

| 参数 | 类型 | 说明 | 可选值 | 默认值 |
|---|---|---|---|---|
| value | **String/Number** | 唯一标志符 | - | - |
| title | **String** | 面板标题 | - | - |
| disabled | **Boolean** | 是否禁用 | - | - |
| sticky | **Boolean** | 启用粘性 | - | - |
