import { ref, createApp } from 'vue'
import App from './main.vue'

function Notification (options) {
  let visible = ref(false)
  let boxEl = document.querySelector('.vc-notification-box')
  let app = createApp(App, {
    ...options,
    visible
  })

  if (!boxEl) {
    boxEl = document.createElement('section')
    boxEl.classList.add('vc-notification-box')
    document.body.appendChild(boxEl)
  }

  let el = document.createElement('div')
  el.classList.add('vc-notification')
  boxEl.appendChild(el)
  app.mount(el)

  visible.value = true
}

export default {
  name: 'vcNotification',
  function: Notification
}