import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'
import VC2 from '@ektx/vc2'
// import '@ektx/vc2/packages/vc2/index.less'

import './assets/reset-1.5.0.css'
import 'prismjs/themes/prism.css'
import './assets/theme.less'
import './assets/markdown-theme.less'

import VCDemoCode from './components/VCDemo/index.vue'
import CodeBox from './components/codeBox/index.vue'
import TOC from './components/TOC/index.vue'

let app = createApp(App)

window.App = app

app.use(Router)
app.use(VC2)

app.component('demo', VCDemoCode)
app.component('codeBox', CodeBox)
app.component('TOC', TOC)

app.mount('#app')
