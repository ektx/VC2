import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'
import { init } from '../client'

import './assets/reset-1.5.0.css'
import 'prismjs/themes/prism.css'
import './assets/theme.less'
import './assets/markdown-theme.less'

import VCDemoCode from './components/VCDemo/index.vue'
import CodeBox from './components/codeBox/index.vue'
import TOC from './components/TOC/index.vue'

let app = createApp(App)

app.use(Router)

app.component('demo', VCDemoCode)
app.component('codeBox', CodeBox)
app.component('TOC', TOC)

init(app)

app.mount('#app')
