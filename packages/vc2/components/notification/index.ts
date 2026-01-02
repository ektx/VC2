import './index.less'
import App from './main'
import type { App as VueApp } from 'vue'
export const VcNotification = App.function
;(VcNotification as any).install = (app: VueApp) => {
  app.provide(App.name, VcNotification)
  app.config.globalProperties[App.name] = VcNotification
}

export default VcNotification
export * from './main'
