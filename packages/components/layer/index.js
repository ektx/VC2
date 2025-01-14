import App from './index.vue'

import './index.less'

App.install = app => {
  app.component(App.name, App)
}

export default App
