# VC 2

## 安装

```bash
npm i vc2
# or
yarn add vc2
# or
pnpm add vc2
```

## 使用

### 全局引用
```js
import VC2 from 'vc2'
import '@root/lib/es/index.css'

app.use(VC2)
```

### 单个组件引用 全局注册方案

```js
import { VcNotification } from 'vc2'
app.use(VcNotification)
```

### 单个组件单文件引用方式

```js
import { VcNotification } from 'vc2'

// Option API
export default {
  components: { VcNotification }
}
```

## 资料参考
[Vue3.js 官方文档](http://v3.vuejs.org/)  
[Vue3.js 镜像文档](https://vue3js.cn/docs/)  
[Vue3.js 中文文档](https://vue-docs-next-zh-cn.netlify.app/)  
[Vue-next](https://github.com/vuejs/vue-next)  
[RFC](https://github.com/vuejs/rfcs)  
[composition api](https://composition-api.vuejs.org/)  
