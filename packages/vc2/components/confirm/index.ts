import './index.less'
import App from './main'
import type { App as VueApp } from 'vue'

export const VcConfirm = App.function
;(VcConfirm as any).install = (app: VueApp) => {
  app.provide(App.name, VcConfirm)
  app.config.globalProperties[App.name] = VcConfirm
}

export default VcConfirm
export * from './main'
