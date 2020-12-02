
# Upload 上传

## 基础效果

::: demo 
```html
<template>
  <vc-upload 
    action="http://localhost:9000/api/file/admin/uploadPhoto"
    multiple
    :maxSize="1"
    :limit="2"
    @on-exceed-size="handlerExceedSize"
    @on-exceed-limit="handlerExceedLimit"
    @on-success="handlerSuccess"
  />
</template>

<script>
export default {
  methods: {
    handlerExceedSize({list, size}) {
      this.vcMessage.warning('有文件超出上传大小')
      console.log('超出大小文件：', list, size)
    },
    handlerExceedLimit({files, list}) {
      this.vcMessage.warning(`当前上传承制最多 2 个文件，选择了 ${files.length} 个文件，已经上传了 ${list.length} 文件`)
    },
    handlerSuccess({res, file, list}) {
      console.log(res, file, list)
    }
  }
}
</script>
```
:::


## Poprs

| 参数 | 类型 | 说明 | 可选值 | 默认值 |
|---|---|---|---|---|


## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
