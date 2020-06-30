import { createApp } from 'vue'
import App from './App.vue'
import VC from '../../packages/index'

import './assets/reset-1.5.0.css'
import './assets/theme.less'
import '../../packages/layout.less'

import VCMarkedIt from './components/VCMarkedIt/index.vue'
import VCDemoCode from './components/VCDemo/index.vue'

let app = createApp(App)

app.use(VC)

app.component('VCMarkedIt', VCMarkedIt)
app.component('demo', VCDemoCode)
app.mount('#app')

