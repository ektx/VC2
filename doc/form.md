# Form 表单

## 典型表单

包括各种表单项，比如输入框、选择器、开关、单选框、多选框等。

### 左右布局效果

::: demo
```html
<template>
  <vc-form label-width="auto">
    <div>
      <vc-form-item label="活动名称">
        <input type="text" />
      </vc-form-item>
    </div>
    <vc-form-item label="活动区域">
      <select>
        <option>1</option>
        <option>2</option>
      </select>
    </vc-form-item>
    <vc-form-item label="活动形式">
      <textarea style="height: 100px"></textarea>
    </vc-form-item>
    <vc-form-item>
      <vc-button color="primary">提交</vc-button>
      <vc-button>取消</vc-button>
    </vc-form-item>
  </vc-form>
</template>
```
:::

### 上下布局效果

::: demo
```html
<template>
  <vc-form>
    <div>
      <vc-form-item label="活动名称">
        <input type="text" />
      </vc-form-item>
    </div>
    <vc-form-item label="活动区域">
      <select>
        <option>1</option>
        <option>2</option>
      </select>
    </vc-form-item>
    <vc-form-item label="活动形式">
      <textarea style="height: 100px"></textarea>
    </vc-form-item>
    <vc-form-item>
      <vc-button color="primary">提交</vc-button>
      <vc-button>取消</vc-button>
    </vc-form-item>
  </vc-form>
</template>
```
:::