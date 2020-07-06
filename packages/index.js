
import vcButton from './components/button/index.vue'
import vcIcon from './components/icon/index.vue'
import vcMessage from './components/message/index.js'
import vcNotification from './components/notification/index.js'

const components = [
  vcButton,
  vcIcon,
  vcMessage,
  vcNotification
]

const install = app => {
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
  vcMessage,
  vcNotification
}