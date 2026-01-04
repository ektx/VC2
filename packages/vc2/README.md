# @ektx/vc2

Vue 3.x UI 组件库核心包，基于 TypeScript 构建，提供完整的类型支持与高性能的按需加载能力。

## 特性

- **Vue 3 & TypeScript**: 深度集成，提供完美的开发体验。
- **类型支持**: 完美支持 Volar，提供组件级的类型提示。
- **Popover API**: Popover 组件基于原生浏览器 Popover API 封装。
- **按需加载**: 支持 Tree-shaking，支持通过插件自动引入组件与样式。

## 安装

```bash
pnpm add @ektx/vc2
```

## 快速上手

### 全量引入

```typescript
import { createApp } from 'vue'
import VC2 from '@ektx/vc2'
import '@ektx/vc2/lib/index.css'

const app = createApp(App)
app.use(VC2)
app.mount('#app')
```

### 按需引入

推荐使用 `unplugin-vue-components` 来实现自动按需加载组件和样式。

#### 1. 安装插件
```bash
pnpm add unplugin-vue-components -D
```

#### 2. 配置 Vite
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    // ...
    Components({
      resolvers: [
        (componentName) => {
          if (componentName.startsWith('Vc')) {
            const name = componentName.slice(2).charAt(0).toLowerCase() + componentName.slice(3)
            return {
              name: componentName,
              from: '@ektx/vc2',
              sideEffects: `@ektx/vc2/es/components/${name}/index.css`
            }
          }
        }
      ]
    })
  ]
})
```

## TypeScript 支持

在 `tsconfig.json` 中配置 `compilerOptions.types` 以获得全局组件类型提示：

```json
{
  "compilerOptions": {
    "types": ["@ektx/vc2/global"]
  }
}
```

## 许可证

MIT License

