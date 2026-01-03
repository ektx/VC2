// 扩展 Vue 模块类型
declare module 'vue' {
  export interface GlobalComponents {
    // UiButton: typeof import('../components/Button')['UiButton']
  }
}

// 声明模块（处理 Vue 文件）
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 组件库全局类型导出
// export * from '../components/Button/types'
