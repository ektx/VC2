import { createApp } from 'vue'
import App from './App.vue'
import './assets/reset-1.5.0.css'
import './assets/theme.less'

import HelloWorld from './components/HelloWorld.vue'
import VCMarkedIt from './components/VCMarkedIt/index.vue'
import VCDemoCode from './components/VCDemo/index.vue'

let app = createApp(App)

app.component('HelloWorld', HelloWorld)
app.component('VCMarkedIt', VCMarkedIt)
app.component('demo', VCDemoCode)
app.mount('#app')

