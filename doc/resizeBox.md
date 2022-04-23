

::: codeBox
```vue
<ResizeBox :sizes="resizeOpt" @barDblclick="barDbClick">
  <template #main="{ options }">{{ options }}</template>
  <template #other="{ options }">{{ options }}</template>
  <template #aside="{ options }">{{ options }}</template>
</ResizeBox>
```
:::