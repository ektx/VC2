import { ref, createVNode, render, type Ref } from 'vue'
import App from './main.vue'

export type NotifyType = 'success' | 'warning' | 'info' | 'error'
export type NotifyPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

export interface NotificationOptions {
  title?: string
  message?: string
  type?: NotifyType
  position?: NotifyPosition
}

interface RuntimeNotify {
  id: number
  visible: Ref<boolean>
  top: Ref<number>
  bottom: Ref<number>
  position: NotifyPosition
}

const notifyObj: Record<number, RuntimeNotify & { el: HTMLElement }> = {}

export function Notification(options: NotificationOptions = {}) {
  const visible = ref(false)
  const top = ref(-1)
  const bottom = ref(-1)
  const position: NotifyPosition = (options.position as NotifyPosition) || 'top-right'
  const id = Object.keys(notifyObj).length + 1

  const runtime = {
    ...options,
    id,
    visible,
    top,
    bottom,
    position,
    close: Notification.close
  }

  const el = document.createElement('div')
  el.classList.add('vc-notification')

  if (position.endsWith('right')) {
    el.style.right = '0'
  } else {
    el.style.left = '0'
  }

  const vm = createVNode(App, runtime)
  render(vm, el)
  document.body.appendChild(el)

  const samePosItems = Object.values(notifyObj).filter(item => item.position === position)

  if (id > 1 && samePosItems.length > 0) {
    const { el: _el, top: _t, bottom: _b } = samePosItems.slice(-1)[0]
    const H = _el.offsetHeight

    if (position.startsWith('top')) top.value = H + _t.value
    else bottom.value = H + _b.value
  } else {
    if (position.startsWith('top')) top.value = 0
    else bottom.value = 0
  }

  visible.value = true
  notifyObj[id] = { id, visible, top, bottom, el, position }
}

Notification.close = function (id: number) {
  const notify = notifyObj[id]
  if (!notify) return
  notify.visible.value = false

  Object.values(notifyObj).forEach(item => {
    if (item.position === notify.position && item.id > id) {
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
