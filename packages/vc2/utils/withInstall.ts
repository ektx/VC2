import type { App, Component, Plugin } from 'vue'

export type SFCWithInstall<T> = T & Plugin

export const withInstall = <T extends Component>(component: T) => {
  ;(component as SFCWithInstall<T>).install = (app: App) => {
    const { name } = component
    if (name) {
      app.component(name, component as SFCWithInstall<T>)
    }
  }

  return component as SFCWithInstall<T>
}
