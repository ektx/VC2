# @ektx/vc2

Vue 3.x UI 组件库核心包。

## 特性

- 基于 Vue 3 & TypeScript
- 支持 Volar 类型提示
- 支持 Tree-shaking
- 完整的组件库功能

## 安装

```bash
pnpm add @ektx/vc2
```

## 使用

```typescript
import { createApp } from 'vue'
import VC2 from '@ektx/vc2'
import '@ektx/vc2/lib/index.css'

const app = createApp(App)
app.use(VC2)
app.mount('#app')
```
