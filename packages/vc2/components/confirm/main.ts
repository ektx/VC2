import { createApp, ref, type Ref } from 'vue'
import App from './main.vue'

export type ConfirmType = 'alert' | 'confirm' | 'prompt'

export interface ConfirmButton {
  label: string
  type?: string
  color?: string
  func?: (visible: boolean) => unknown
}

export interface ConfirmOptions {
  type?: ConfirmType
  title?: string
  message?: string
  buttons?: ConfirmButton[]
  showClose?: boolean
  closeOnClickModal?: boolean
  update?: (val: string) => string | void
  useHTML?: boolean
}

interface RuntimeConfirmOptions extends Required<Pick<ConfirmOptions, 'type'>> {
  title: string
  message: string
  buttons?: ConfirmButton[]
  showClose?: boolean
  closeOnClickModal?: boolean
  update?: (val: string) => string | void
  useHTML?: boolean
  visible: Ref<boolean>
  close: (data?: unknown) => void
  closed: () => void
  resolve: (data?: unknown) => void
  reject: (data?: unknown) => void
  [key: string]: any
}

function Confirm(options: ConfirmOptions = {}) {
  const visible = ref(false)
  const el = document.createElement('div')

  return new Promise<unknown>((resolve, reject) => {
    const runtime: RuntimeConfirmOptions = {
      type: options.type ?? 'confirm',
      title: options.title ?? '提醒',
      message: options.message ?? '',
      buttons: options.buttons,
      showClose: options.showClose ?? true,
      closeOnClickModal: options.closeOnClickModal ?? true,
      update: options.update,
      useHTML: options.useHTML,
      visible,
      close: (data: unknown = '') => {
        visible.value = false
        resolve(data)
      },
      closed: () => {
        document.body.removeChild(el)
      },
      resolve: (data?: unknown) => {
        visible.value = false
        resolve(data)
      },
      reject: (data?: unknown) => {
        visible.value = false
        reject(data)
      }
    }

    el.classList.add('vc-confirm-hold')
    document.body.appendChild(el)

    const app = createApp(App, runtime)
    app.mount(el)

    visible.value = true
  })
}

export default {
  name: 'VcConfirm',
  function: Confirm
}
