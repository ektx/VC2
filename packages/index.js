
import vcButton from './components/button/index.vue'

const install = app => {
  console.log(app, install)

  app.component('vcBtn', vcButton)
}

export default {
  install,
  vcButton
}