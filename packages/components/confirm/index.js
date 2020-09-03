import { createApp, ref } from 'vue'
import App from './main.vue'

function Confirm (options) {
  let visible = ref(false)
  options = {
    type: 'confirm',
    title: '提醒',
    message: '',
    ...options,
    visible
  }

  let el = document.createElement('div')
  el.classList.add('vc-confirm')
  document.body.appendChild(el)

  let app = createApp(App, options)
  app.mount(el)

  visible.value = true
}

export default {
  name: 'VcConfirm',
  function: Confirm
}
