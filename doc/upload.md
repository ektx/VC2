
# Upload 上传

## 图片上传

### 基础上传

::: codeBox
```vue
<template>
  <vc-upload 
    type="avatar"
    action="http://localhost:4080/api/upload"
    :src="src"
  />
</template>

<script>
export default {
  data() {
    return {
      src: ''
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
      this.src = 'http://localhost:4080' + res.path
      console.log(file, res, list, '上传成功')
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

### 头像上传

::: codeBox
```vue
<template>
  <vc-upload 
    type="avatar"
    action="http://localhost:4080/api/upload"
    avatar-icon="vc-icon-plus"
    placeholder="upload..."
    width="150px"
    height="150px"
    radius="100%"
    :src="src"
    :before-remove="beforeRemove"
    :on-remove="remove"
    :on-exceed-size="handlerExceedSize"
    :on-exceed-limit="handlerExceedLimit"
    :on-success="handlerSuccess"
  />
</template>

<script>
export default {
  data() {
    return {
      src: ''
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
      this.src = 'http://localhost:4080' + res.path
      console.log(file, res, list, '上传成功')
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

## 基础效果

::: codeBox
```vue
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

::: codeBox
```vue
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


## 属性

| 参数 | 类型 | 说明 | 可选值 | 默认值 |
|---|---|---|---|---|
| action | **String** | 必选参数，上传的地址 | - | - |
| maxSize | **Number** | 文件最大值，单位为 M | - | - |
| type | **String** | 展现形式 默认为 fileList(文件列表),<br/>暂时只有 fileList | - | fileList |
| name | **String** | 上传的文件字段名 | - | file |
| autoUpload | **Boolean** | 是否在选取文件后立即进行上传 | - | true |
| multiple | **Boolean** | 是否支持多选文件 | - | false |
| limit | **Number** | 最大上传个数 | - | - |
| beforeRemove | **Function** | 删除文件之前的钩子，参数为上传的文件和文件列表 | - | - |
| onRemove | **Function** | 删除完成时触发 | - | - |
| onExceedSize | **Function** | 超出文件大小时触发，返回超出大小的文件列表 | - | - |
| onExceedLimit | **Function** | 超出指定上传大小时触发 | - | - |
| onSuccess | **Function** | 上传成功时触发 | - | - |
| defaultFiles | **Function** | 默认展示文件列表 | - | - |


## 头像专有属性

| 参数 | 类型 | 说明 | 可选值 | 默认值 |
|---|---|---|---|---|
| src | **String** | 图片默认地址 | - | - |
| placeholder | **String** | 上传提示信息 | - | `点击选择图片上传` |
| avatarIcon | **String** | 上传提示图标 | - | - |
| width | **String** | 宽度 | - | `200px` |
| height | **String** | 高度 | - | `200px` |
| radius | **String** | 圆角 | - | `3px` |
| fit | **String** | 图片填充方式，具体访问 [Object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) | - | `3px` |
