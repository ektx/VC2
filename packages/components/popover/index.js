import App from './index.vue'

import './index.css'

App.install = app => {
  app.component(App.name, App)
}

export default App
