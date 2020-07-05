import { ref, createApp } from 'vue'
import App from './main.vue'

const notifyObj = {}

function Notification (options) {
  let visible = ref(false)
  let top = ref(-1)
  let position = options.position || 'top-right'
  let id = Object.keys(notifyObj).length + 1
  let boxEl = document.querySelector('.vc-notification-box')

  options = {
    ...options,
    id,
    visible,
    top,
    position,
    close: Notification.close
  }

  let app = createApp(App, options)

  let el = document.createElement('div')
  el.classList.add('vc-notification')
  if (position === 'top-right' || position === 'bottom-right') {
    el.style.right = 0
  } else {
    el.style.left = 0
  }

  document.body.appendChild(el)
  app.mount(el)

  if (id > 1) {
    let _arr = Object.values(notifyObj).filter(item => item.position === position)
    let { el, top: _t } = _arr.slice(-1)[0]
    let H = el.offsetHeight

    top.value = H + _t.value
  } else {
    top.value = 0
  }

  visible.value = true

  notifyObj[id] = { id, visible, top, el, position }
  console.log(notifyObj)
}

Notification.close = function (id) {
  console.log('close', id)
  let notify = notifyObj[id]
  notify.visible.value = false

  Object.values(notifyObj).forEach(item => {
    if (
      item.position === notify.position
      && item.id > id
    ) {
      item.top.value -= notify.el.offsetHeight
    }
  })
}

export default {
  name: 'vcNotification',
  function: Notification
}