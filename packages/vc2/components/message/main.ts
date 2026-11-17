import { createApp, ref, type Ref } from 'vue'
import App from './main.vue'

export type MessageType = 'success' | 'warning' | 'info' | 'error'

export interface MessageOptions {
  message?: string
  type?: MessageType
  duration?: number
  showClose?: boolean
}

interface RuntimeMessageOptions extends Required<
  Pick<MessageOptions, 'duration'>
> {
  message?: string
  type?: MessageType
  visible: Ref<boolean>
  showClose: Ref<boolean>
  [key: string]: any
}

const Message = function (options: MessageOptions | string = {}) {
  if (typeof options === 'string') {
    options = { message: options }
  }

  let boxEl = document.querySelector('.vc-message-box') as HTMLElement | null
  const visible = ref(false)
  const showClose = ref(false)

  const runtime: RuntimeMessageOptions = {
    message: options.message,
    type: options.type,
    duration: options.duration ?? 3000,
    visible,
    showClose
  }

  const app = createApp(App, runtime)

  if (!boxEl) {
    boxEl = document.createElement('section')
    boxEl.classList.add('vc-message-box')
    document.body.appendChild(boxEl)
  }

  const el = document.createElement('div')
  const time = runtime.duration ? runtime.duration + 400 : 3000
  el.classList.add('vc-message')
  boxEl.appendChild(el)
  app.mount(el)

  visible.value = true

  if (runtime.duration !== 0) {
    setTimeout(() => {
      visible.value = false
    }, time)
  } else {
    showClose.value = true
  }

  function close() {
    visible.value = false
  }

  return { close }
} as {
  (options?: MessageOptions | string): { close: () => void }
} & {
  success: (options?: MessageOptions | string) => { close: () => void }
  warning: (options?: MessageOptions | string) => { close: () => void }
  info: (options?: MessageOptions | string) => { close: () => void }
  error: (options?: MessageOptions | string) => { close: () => void }
}

;(['success', 'warning', 'info', 'error'] as MessageType[]).forEach(type => {
  ;(Message as any)[type] = (options: MessageOptions | string = {}) => {
    if (typeof options === 'string') {
      options = { message: options }
    }
    options.type = type
    return Message(options)
  }
})

export default {
  function: Message,
  name: 'vcMessage'
}
