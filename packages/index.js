
import vcButton from './components/button/index.vue'
import vcIcon from './components/icon/index.vue'

const components = [
  vcButton,
  vcIcon
]

const install = app => {
  console.log(app, install)

  components.forEach(item => {
    app.component(item.name, item)
  })
}

export default {
  install,
  vcButton,
  vcIcon
}