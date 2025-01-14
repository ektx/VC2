import { createApp, ref } from 'vue'
import App from './main.vue'

const Message = function (options) {
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }

  let boxEl = document.querySelector('.vc-message-box')
  let visible = ref(false)
  let app = createApp(App, {
    ...options,
    visible
  })

  if (!boxEl) {
    boxEl = document.createElement('section')
    boxEl.classList.add('vc-message-box')
    document.body.appendChild(boxEl)  
  }

  let el = document.createElement('div')
  let time = options.duration ? options.duration + 400 : 3000
  el.classList.add('vc-message')
  boxEl.appendChild(el)  
  app.mount(el)
  
  visible.value = true

  if (options.duration !== 0) {
    setTimeout(() => {
      visible.value = false
    }, time)
  }

  function close () {
    visible.value = false
  }

  return { close }
};

['success', 'warning', 'info', 'error'].forEach(type => {
  Message[type] = (options = {}) => {
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