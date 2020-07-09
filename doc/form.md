# Form 表单

## 典型表单

包括各种表单项，比如输入框、选择器、开关、单选框、多选框等。

### 左右布局效果

::: demo
```html
<template>
  <vc-form ref="form" label-width="80px" :model="formData" :rules="rules">
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
      <vc-button color="primary" @click="submitForm">提交</vc-button>
      <vc-button @click="resetForm">重置</vc-button>
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
        desc: 'text'
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.form.validate((valid) => {
        console.log(valid)
        if (valid) {
          console.log('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm() {
      console.log('reset...')
      this.$refs.form.resetFields()
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


## 部分验证

::: demo
```html
<template>
  <vc-form ref="form" label-width="80px" :model="formData" :rules="rules">
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
      <vc-button color="primary" @click="submitForm">提交</vc-button>
      <vc-button @click="resetForm">重置</vc-button>
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
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.form.validateField(['name','desc'], (valid) => {
        if (valid) {
          console.log('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm() {
      console.log('reset...')
      this.$refs.form.resetFields()
    }
  }
}
</script>
```
:::

## 自定义校验规则

这个例子中展示了如何使用自定义验证规则来完成密码的二次验证。

> 自定义校验 **callback** 必须被调用。 更多高级用法可参考 [async-validator](https://github.com/yiminghe/async-validator)。

::: demo
```html
<template>
  <vc-form ref="form" label-width="80px" :model="formData" :rules="rules">
    <vc-form-item label="密码" prop="passwd">
      <input type="password" v-model="formData.passwd" />
    </vc-form-item>
    <vc-form-item label="确认密码" prop="checkPass">
      <input type="password" v-model="formData.checkPass" />
    </vc-form-item>
    <vc-form-item>
      <vc-button color="primary" @click="submitForm">提交</vc-button>
      <vc-button @click="resetForm">重置</vc-button>
    </vc-form-item>
  </vc-form>
</template>

<script>
export default {
  setup () {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        // 测试数据调用
        if (formData.checkPass !== '') {
          form.value.validateField('checkPass');
        }
        callback();
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== formData.passwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }

    const form = ref(null)
    const formData = reactive({
      passwd: '',
      checkPass: '',
    })
    const rules = reactive({
      passwd: [
        { validator: validatePass, trigger: 'blur' }
      ],
      checkPass: [
        { validator: validatePass2, trigger: 'blur' }
      ],
    })

    let submitForm = () => {
      form.value.validate((valid) => {
        if (valid) {
          console.log('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }

    function resetForm() {
      form.value.resetFields()
    }

    return {
      form,
      formData,
      rules,
      submitForm,
      resetForm
    }
  }
}
</script>
```
:::