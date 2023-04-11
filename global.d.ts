declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    /** buttom */
    VcButton: typeof import('./types/button')['VcButton']
  }
}

export {}
