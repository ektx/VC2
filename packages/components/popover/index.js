import App from './index.vue'

import './index.css'

App.install = app => {
  app.component(app.name, App)
}

export default App
