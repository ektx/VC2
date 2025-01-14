import './index.less'
import App from './main.js'

App.function.install = app => {
  // for component API
  app.provide(App.name, App.function)
  // for option API
  app.config.globalProperties[App.name] = App.function
}

export default App.function
