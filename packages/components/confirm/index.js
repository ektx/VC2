import { createApp, ref } from 'vue'
import App from './main.vue'

function Confirm (options) {
  let visible = ref(false)
  let el = document.createElement('div')

  options = {
    type: 'confirm',
    title: '提醒',
    message: '',
    ...options,
    visible,
    close: () => {
      visible.value = false
    },
    closed: () => {
      document.body.removeChild(el)
    }
  }

  el.classList.add('vc-confirm-hold')
  document.body.appendChild(el)

  let app = createApp(App, options)
  app.mount(el)

  visible.value = true
}

export default {
  name: 'VcConfirm',
  function: Confirm
}
