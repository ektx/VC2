import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

import HelloWorld from './components/HelloWorld.vue'

let app = createApp(App)

app.component('HelloWorld', HelloWorld)
app.mount('#app')

