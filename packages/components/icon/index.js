import App from './index.vue'

import '../../fonts/index.less'

App.install = app => {
  app.component(App.name, App)
}

export default App
