import { ref, createApp } from 'vue'
import App from './main.vue'

const notifyObj = {}

function Notification (options) {
  let visible = ref(false)
  let top = ref(-1)
  let bottom = ref(-1)
  let position = options.position || 'top-right'
  let id = Object.keys(notifyObj).length + 1

  options = {
    ...options,
    id,
    visible,
    top,
    bottom,
    position,
    close: Notification.close
  }

  let app = createApp(App, options)

  let el = document.createElement('div')
  el.classList.add('vc-notification')
  if (position.endsWith('right')) {
    el.style.right = 0
  } else {
    el.style.left = 0
  }

  document.body.appendChild(el)
  app.mount(el)

  let _arr = Object.values(notifyObj).filter(item => item.position === position)

  if (id > 1 && _arr.length > 0) {
    let { el, top: _t, bottom: _b } = _arr.slice(-1)[0]
    let H = el.offsetHeight

    if (position.startsWith('top')) top.value = H + _t.value
    else bottom.value = H + _b.value
  } else {
    if (position.startsWith('top')) top.value = 0  
    else bottom.value = 0  
  }

  visible.value = true

  notifyObj[id] = { id, visible, top, bottom, el, position }
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
      if (item.position.startsWith('top')) {
        item.top.value -= notify.el.offsetHeight
      } else {
        item.bottom.value -= notify.el.offsetHeight
      }
    }
  })
}

export default {
  name: 'vcNotification',
  function: Notification
}