# Form 表单

## 典型表单

包括各种表单项，比如输入框、选择器、开关、单选框、多选框等。

### 左右布局效果

::: demo
```html
<template>
  <vc-form label-width="auto" :model="formData">
    <vc-form-item label="活动名称" prop="name">
      <input type="text" v-model="formData.name" />
    </vc-form-item>
    <vc-form-item label="活动区域" prop="region">
      <select v-model="formData.region">
        <option value="" selected disabled>请选择</option>
        <option value="shanghai">上海</option>
        <option value="beijing">北京</option>
      </select>
    </vc-form-item>
    <vc-form-item label="活动形式" prop="desc">
      <textarea v-model="formData.desc" style="height: 100px"></textarea>
    </vc-form-item>
    <vc-form-item>
      <vc-button color="primary">提交</vc-button>
      <vc-button>取消</vc-button>
    </vc-form-item>
  </vc-form>

  {{ formData }}
</template>

<script>
export default {
  data () {
    return {
      formData: {
        name: '',
        region: '',
        desc: ''
      }
    }
  }
}

</script>
```
:::

### 上下布局效果

::: demo
```html
<template>
  <vc-form>
    <vc-form-item label="活动名称">
      <input type="text" v-model="formData.name"/>
    </vc-form-item>
    <vc-form-item label="活动区域">
      <select v-model="formData.region">
        <option value="" selected disabled>请选择</option>
        <option value="shanghai">上海</option>
        <option value="beijing">北京</option>
      </select>
    </vc-form-item>
    <vc-form-item label="活动形式" prop="desc">
      <textarea v-model="formData.desc" style="height: 100px"></textarea>
    </vc-form-item>
    <vc-form-item>
      <vc-button color="primary">提交</vc-button>
      <vc-button>取消</vc-button>
    </vc-form-item>
  </vc-form>
  
  <hr/>

  {{ formData}}
</template>

<script>
export default {
  data () {
    return {
      formData: {
        name: '',
        region: '',
        desc: ''
      }
    }
  }
}

</script>
```
:::