# Form 表单

## 典型表单

包括各种表单项，比如输入框、选择器、开关、单选框、多选框等。

### 左右布局效果

::: codeBox
```vue
<template>
  <vc-form ref="form" :model="formData" :rules="rules">

    <vc-form-item label="活动名称" prop="name">
      <vc-input v-model="formData.name"/>
    </vc-form-item>

    <vc-form-item label="队旗颜色" prop="color">
      <vc-color-picker v-model="formData.color" round/>
    </vc-form-item>

    <vc-form-item label="住宿时间" prop="days">
      <vc-radio-group v-model="formData.days">
        <vc-radio :label="1">1天</vc-radio>
        <vc-radio :label="2">2天</vc-radio>
        <vc-radio :label="3">2天以上</vc-radio>
      </vc-radio-group>
    </vc-form-item>


    <vc-form-item label="费用方式" prop="isOwnExpense">
      <vc-switch v-model:value="formData.isOwnExpense" active-text="备用金" inactive-text="报销"/>
    </vc-form-item>
    
    <vc-form-item label="活动区域" prop="region">
      <vc-select v-model="formData.region" :options="options" multiple/>
    </vc-form-item>

    <vc-form-item label="活动人数" prop="total">
      <vc-input-number v-model="formData.total"/>
    </vc-form-item>
    <!-- 时间选择 -->
    <vc-form-item label="出发时间" prop="time">
      <vc-time-picker v-model="formData.time"/>
    </vc-form-item>

    <vc-form-item label="活动形式" prop="desc">
      <vc-input type="textarea" placeholder="请输入内容" :autosize="{ minRows: 2, maxRows: 4}" v-model="formData.desc"/>
    </vc-form-item>

    <vc-form-item>
      <vc-button theme="primary" @click="submitForm">提交</vc-button>
      <vc-button @click="resetForm">重置</vc-button>
      <vc-button @click="clearForm">清除错误</vc-button>
    </vc-form-item>

  </vc-form>

  {{ formData }}
</template>

<script>
import { ref } from 'vue'

export default {
  data () {
    return {
      formData: {
        name: '',
        color: '',
        days: 0,
        time: '',
        isOwnExpense: false,
        region: [],
        desc: 'text',
        total: 0
      },
      options: [{
        value: 'Beijing',
        label: '北京'
      }, {
        value: 'Shanghai',
        label: '上海'
      }],
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: ['blur', 'change'] }
        ],
        color: [
          { required: true, message: '队旗颜色不能为空', trigger: 'blur' },
        ],
        days: [
          { 
            required: true, 
            type: 'number',
            message: '住宿时间不能为空', 
            trigger: ['blur', 'change'],
          },
          { 
            min: 2,
            type: 'number', 
            message: '住宿时间不能小于 2', 
            trigger: ['blur', 'change'],
          },
        ],
        time: [
          { 
            type: 'date',
            required: true, 
            message: '出发时间不能为空', 
            trigger: ['blur', 'change'],
          }
        ],
        isOwnExpense: [
          {required: true, type: 'boolean', message: '费用方式不可为空', trigger: 'change'}
        ],
        region: [
          { required: true, type: 'array', message: '请选择活动区域', trigger: ['blur', 'change'] }
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
        total: [
          {required: true, type: 'number', min: 1,  message: '活动人数不能为0', trigger: 'change'}
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
    },
    change(event) {
      console.log(event.target.value)
    },
    clearForm() {
      this.$refs.form.clearValidate()
    }
  }
}
</script>

<style lang="less" scoped>
.vc-button {
  margin-right: 10px;
}
</style>
```
:::

### 对齐方式

::: codeBox
```vue
<template>
  <vc-radio-group v-model="labelPosition" type="button">
    <vc-radio label="left">左对齐</vc-radio>
    <vc-radio label="right">右对齐</vc-radio>
    <vc-radio label="top">顶部对齐</vc-radio>
  </vc-radio-group>

  <br/>
  
  <vc-form label-width="80px" :labelPosition="labelPosition">
    <vc-form-item label="活动名称">
      <vc-input type="text" v-model="formData.name" validate-event/>
    </vc-form-item>
    <vc-form-item label="活动区域">
      <vc-select v-model="formData.region" :options="options"/>
    </vc-form-item>

    <vc-form-item label="活动形式" prop="desc">
      <vc-input type="textarea" placeholder="请输入内容" :autosize="{ minRows: 2, maxRows: 4}" v-model="formData.desc"></vc-input>
    </vc-form-item>

    <vc-form-item>
      <vc-button theme="primary">提交</vc-button>
      <vc-button>取消</vc-button>
    </vc-form-item>
  </vc-form>
  
  <hr/>

  {{ formData}} 
</template>

<script>
import { ref } from 'vue'

export default {
  data () {
    return {
      formData: {
        name: '',
        region: '',
        desc: ''
      },
      options: [{
        value: 'Beijing',
        label: '北京'
      }, {
        value: 'Shanghai',
        label: '上海'
      }],
      labelPosition: 'right'
    }
  }
}
</script>

<style lang="less" scoped>
.vc-button {
  margin-right: 10px;
}
</style>
```
:::

### 行内表单

当垂直方向空间受限且表单较简单时，可以在一行内放置表单。  
通过设置 `inline` 属性为 `true` 可以让表单域变为行内的表单域。

::: codeBox
```vue
<template>
  <vc-form ref="form" inline :model="formData" :rules="rules">

    <vc-form-item label="活动名称" prop="name">
      <vc-input v-model="formData.name"/>
    </vc-form-item>

    <vc-form-item label="队旗颜色" prop="color">
      <vc-color-picker v-model="formData.color" round/>
    </vc-form-item>

    <vc-form-item label="住宿时间" prop="days">
      <vc-radio-group v-model="formData.days">
        <vc-radio :label="1">1天</vc-radio>
        <vc-radio :label="2">2天</vc-radio>
        <vc-radio :label="3">2天以上</vc-radio>
      </vc-radio-group>
    </vc-form-item>


    <vc-form-item label="费用方式" prop="isOwnExpense">
      <vc-switch v-model:value="formData.isOwnExpense" active-text="备用金" inactive-text="报销"/>
    </vc-form-item>
    
    <vc-form-item label="活动区域" prop="region">
      <vc-select v-model="formData.region" :options="options" multiple/>
    </vc-form-item>

    <vc-form-item label="活动人数" prop="total">
      <vc-input-number v-model="formData.total"/>
    </vc-form-item>
    <!-- 时间选择 -->
    <vc-form-item label="出发时间" prop="time">
      <vc-time-picker v-model="formData.time"/>
    </vc-form-item>

    <vc-form-item label="活动形式" prop="desc" grid-column="span 2">
      <vc-input type="textarea" placeholder="请输入内容" :autosize="{ minRows: 2, maxRows: 4}" v-model="formData.desc"/>
    </vc-form-item>

    <vc-form-item grid-column="span 2">
      <vc-button theme="primary" @click="submitForm">提交</vc-button>
      <vc-button @click="resetForm">重置</vc-button>
      <vc-button @click="clearForm">清除错误</vc-button>
    </vc-form-item>

  </vc-form>

  {{ formData }}
</template>

<script>
import { ref } from 'vue'

export default {
  data () {
    return {
      formData: {
        name: '',
        color: '',
        days: 0,
        time: '',
        isOwnExpense: false,
        region: [],
        desc: 'text',
        total: 0
      },
      options: [{
        value: 'Beijing',
        label: '北京'
      }, {
        value: 'Shanghai',
        label: '上海'
      }],
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: ['blur', 'change'] }
        ],
        color: [
          { required: true, message: '队旗颜色不能为空', trigger: 'blur' },
        ],
        days: [
          { 
            required: true, 
            type: 'number',
            message: '住宿时间不能为空', 
            trigger: ['blur', 'change'],
          },
          { 
            min: 2,
            type: 'number', 
            message: '住宿时间不能小于 2', 
            trigger: ['blur', 'change'],
          },
        ],
        time: [
          { 
            type: 'date',
            required: true, 
            message: '出发时间不能为空', 
            trigger: ['blur', 'change'],
          }
        ],
        isOwnExpense: [
          {required: true, type: 'boolean', message: '费用方式不可为空', trigger: 'change'}
        ],
        region: [
          { required: true, type: 'array', message: '请选择活动区域', trigger: ['blur', 'change'] }
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
        total: [
          {required: true, type: 'number', min: 1,  message: '活动人数不能为0', trigger: 'change'}
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
    },
    change(event) {
      console.log(event.target.value)
    },
    clearForm() {
      this.$refs.form.clearValidate()
    }
  }
}
</script>

<style lang="less" scoped>
.vc-button {
  margin-right: 10px;
}
</style>
```
:::


## 部分验证

::: codeBox
```vue
<template>
  <vc-form ref="form" label-width="80px" :model="formData" :rules="rules">
    <vc-form-item label="活动名称" prop="name">
      <vc-input type="text" v-model="formData.name" validate-event/>
    </vc-form-item>
    <vc-form-item label="活动区域" prop="region">
      <vc-select v-model="formData.region" :options="options"/>
    </vc-form-item>
    <vc-form-item label="活动形式" prop="desc">
      
      <vc-input type="textarea" placeholder="请输入内容" :autosize="{ minRows: 2, maxRows: 4}" v-model="formData.desc"></vc-input>
    </vc-form-item>
    <vc-form-item>
      <vc-button theme="primary" @click="submitForm">提交</vc-button>
      <vc-button @click="resetForm">重置</vc-button>
    </vc-form-item>
  </vc-form>

  {{ formData }}
</template>

<script>
import { ref } from 'vue'

export default {
  data() {
    return {
      formData: {
        name: '',
        region: '',
        desc: ''
      },
      options: [{
        value: 'Beijing',
        label: '北京'
      }, {
        value: 'Shanghai',
        label: '上海'
      }],
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

<style lang="less" scoped>
.vc-button {
  margin-right: 10px;
}
</style>
```
:::

## 自定义校验规则

这个例子中展示了如何使用自定义验证规则来完成密码的二次验证。

> 自定义校验 **callback** 必须被调用。 更多高级用法可参考 [async-validator](https://github.com/yiminghe/async-validator)。

::: codeBox
```vue
<template>
  <vc-form ref="form" label-width="80px" :model="formData" :rules="rules">
    <vc-form-item label="密码" prop="passwd" help="这里输入不少于8位字符" validate-status="error">
      <vc-input type="password" v-model="formData.passwd" validate-event/>
    </vc-form-item>
    <vc-form-item label="确认密码" prop="checkPass">
      <vc-input type="password" v-model="formData.checkPass" validate-event/>
    </vc-form-item>
    <vc-form-item>
      <vc-button theme="primary" @click="submitForm">提交</vc-button>
      <vc-button @click="resetForm">重置</vc-button>
    </vc-form-item>
  </vc-form>
</template>

<script setup>
import { ref, reactive } from 'vue'

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
  const errors =[]
  if (value === '') {
    // callback(new Error('请再次输入密码'));
    errors.push('xxxxxxxx')
  } else if (value !== formData.passwd) {
    // callback(new Error('两次输入密码不一致!'));
  } else {
    // callback();
  }

  return errors
}

const form = ref(null)
const formData = reactive({
  passwd: '',
  checkPass: '',
})
const rules = reactive({
  passwd: [
    { required: true, validator: validatePass, message: '不能为空', trigger: 'blur' }
  ],
  checkPass: [
    { validator: validatePass2, trigger: 'blur' }
  ],
})

let submitForm = () => {
  form.value.validate(valid => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!!');
    }
  });
}

function resetForm() {
  form.value.resetFields()
}

   
</script>

<style lang="less" scoped>
.vc-button {
  margin-right: 10px;
}
</style>
```
:::


## 复杂对象

::: codeBox
```vue
<template>
  <vc-form ref="form" label-width="80px" :model="formData" :rules="rules">
    <vc-form-item label="活动名称" prop="user.name">
      <vc-input type="text" v-model="formData.user.name" validate-event/>
    </vc-form-item>
    <vc-form-item label="活动区域" prop="info.region">
      <vc-select v-model="formData.info.region" :options="options"/>
    </vc-form-item>
    <vc-form-item label="活动形式" prop="desc">
      <vc-input type="textarea" placeholder="请输入内容" :autosize="{ minRows: 2, maxRows: 4}" v-model="formData.desc"></vc-input>
    </vc-form-item>
    <vc-form-item>
      <vc-button theme="primary" @click="submitForm">提交</vc-button>
      <vc-button @click="resetForm">重置</vc-button>
    </vc-form-item>
  </vc-form>

  {{ formData }}
</template>

<script>
import { ref } from 'vue'

export default {
  data() {
    return {
      formData: {
        user: { 
          name: ''
        },
        info: {
          region: ''
        },
        desc: ''
      },
      options: [{
        value: 'Beijing',
        label: '北京'
      }, {
        value: 'Shanghai',
        label: '上海'
      }],
      rules: {
        'user.name': [
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
      this.$refs.form.validate( (valid) => {
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

<style lang="less" scoped>
.vc-button {
  margin-right: 10px;
}
</style>
```
:::
