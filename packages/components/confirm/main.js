import { createApp, ref } from 'vue'
import App from './main.vue'

function Confirm(options) {
  let visible = ref(false)
  let el = document.createElement('div')

  return new Promise((resolve, reject) => {
    options = {
      type: 'confirm',
      title: '提醒',
      message: '',
      ...options,
      visible,
      close: (data = '') => {
        visible.value = false
        resolve(data)
      },
      closed: () => {
        document.body.removeChild(el)
      },
      resolve: data => {
        visible.value = false
        resolve(data)
      },
      reject: data => {
        visible.value = false
        reject(data)
      }
    }

    el.classList.add('vc-confirm-hold')
    document.body.appendChild(el)

    let app = createApp(App, options)
    app.mount(el)

    visible.value = true
  })
}

export default {
  name: 'VcConfirm',
  function: Confirm
}
