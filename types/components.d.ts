// components.d.ts
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    VcButton: typeof import('./button')['VcButton']
  }
}

export {}
