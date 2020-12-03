
# Upload 上传

## 基础效果

::: demo 
```html
<template>
  <vc-upload 
    action="http://localhost:9000/api/file/admin/uploadPhoto"
    multiple
    :maxSize="1"
    :limit="4"
    :before-remove="beforeRemove"
    :on-remove="remove"
    :on-exceed-size="handlerExceedSize"
    :on-exceed-limit="handlerExceedLimit"
    :on-success="handlerSuccess"
    :default-files="files"
  />
</template>

<script>
export default {
  data() {
    return {
      files: [
        {
          name: 'Apple',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        },
        {
          name: 'Macbook Air',
          url: 'https://www.apple.com.cn/v/macbook-air/i/images/overview/hero_endframe__ea0qze85eyi6_large_2x.jpg'
        }
      ]
    }
  },
  methods: {
    handlerExceedSize({list, size}) {
      this.vcMessage.warning('有文件超出上传大小')
      console.log('超出大小文件：', list, size)
    },
    handlerExceedLimit({files, list}) {
      this.vcMessage.warning(`当前上传承制最多 4 个文件，选择了 ${files.length} 个文件，已经上传了 ${list.length} 文件`)
    },
    handlerSuccess({res, file, list}) {
      console.log(file.name, '上传成功')
    },
    beforeRemove({file}) {
      return this.VcConfirm({
        title: '提示',
        message: `你确定要删除 ${file.name} 吗？`,
        type: 'confirm'
      })
    },
    remove({file}) {
      this.vcMessage.success(`${file.name} 删除成功`)
    }
  }
}
</script>
```
:::

## 手动上传

::: demo 
```html
<template>
  <vc-upload 
    action="http://localhost:9000/api/file/admin/uploadPhoto"
    multiple
    :maxSize="1"
    :limit="4"
    :before-remove="beforeRemove"
    :on-remove="remove"
    :on-exceed-size="handlerExceedSize"
    :on-exceed-limit="handlerExceedLimit"
    :on-success="handlerSuccess"
    :default-files="files"
    :autoUpload="false"
  >
    <template #target>
      <vc-button>选择文件</vc-button>
    </template>
    <vc-button>上传文件</vc-button>
  </vc-upload>
</template>

<script>
export default {
  data() {
    return {
      files: [
        {
          name: 'Apple',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        },
        {
          name: 'Macbook Air',
          url: 'https://www.apple.com.cn/v/macbook-air/i/images/overview/hero_endframe__ea0qze85eyi6_large_2x.jpg'
        }
      ]
    }
  },
  methods: {
    handlerExceedSize({list, size}) {
      this.vcMessage.warning('有文件超出上传大小')
      console.log('超出大小文件：', list, size)
    },
    handlerExceedLimit({files, list}) {
      this.vcMessage.warning(`当前上传承制最多 4 个文件，选择了 ${files.length} 个文件，已经上传了 ${list.length} 文件`)
    },
    handlerSuccess({res, file, list}) {
      console.log(file.name, '上传成功')
    },
    beforeRemove({file}) {
      return this.VcConfirm({
        title: '提示',
        message: `你确定要删除 ${file.name} 吗？`,
        type: 'confirm'
      })
    },
    remove({file}) {
      this.vcMessage.success(`${file.name} 删除成功`)
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
