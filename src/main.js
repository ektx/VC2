import { createApp } from 'vue'
import App from './App.vue'
import './assets/reset-1.5.0.css'
import './assets/theme.less'

import HelloWorld from './components/HelloWorld.vue'
import VCMdDemo from './components/VCMdDemo/index.vue'

let app = createApp(App)

app.component('HelloWorld', HelloWorld)
app.component('VCMdDemo', VCMdDemo)
app.mount('#app')

