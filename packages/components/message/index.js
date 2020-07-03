import { createApp, ref } from 'vue'
import App from './main.vue'

const Message = function (options) {
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  let visible = ref(false)
  let app = createApp(App, {
    ...options,
    visible
  })
  let el = document.createElement('div')
  el.classList.add('vc-message')
  document.body.appendChild(el)  
  app.mount(el)
  
  visible.value = true

  // setTimeout(() => {
  //   visible.value = false
  // }, 3000)
  console.log(app)
};

['success', 'warning', 'info', 'error'].forEach(type => {
  Message[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options
      }
    }
    options.type = type
    return Message(options)
  }
})

export default {
  function: Message,
  name: 'message'
}