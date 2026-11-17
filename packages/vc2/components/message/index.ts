import './index.less'
import App from './main'
import type { App as VueApp } from 'vue'
export const VcMessage = App.function
;(VcMessage as any).install = (app: VueApp) => {
  app.provide(App.name, VcMessage)
  app.config.globalProperties[App.name] = VcMessage
}

export default VcMessage
export * from './main'
