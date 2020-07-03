
import vcButton from './components/button/index.vue'
import vcIcon from './components/icon/index.vue'
import vcMessage from './components/message/index.js'

const components = [
  vcButton,
  vcIcon,
  vcMessage
]

const install = app => {
  console.log(app, install)

  components.forEach(item => {
    if (item.__file) {
      app.component(item.name, item)
    } else {
      app.provide(item.name, item.function)  
    }
  })

}

export default {
  install,
  vcButton,
  vcIcon,
  vcMessage
}