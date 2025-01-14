import App from './index.vue'

import './index.less'

App.name = 'VcTabPane'
App.install = app => {
  app.component(App.name, App)
}

export default App
