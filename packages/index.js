/* 以下代码自动生成于 Sat Jul 18 2020 10:11:22 GMT+0800 (GMT+08:00) */

import vcButton from './components/button/index.vue'
import vcForm from './components/form/index.vue'
import vcFormItem from './components/formItem/index.vue'
import vcIcon from './components/icon/index.vue'
import vcNotification from './components/notification/index.js'
import vcInput from './components/input/index.vue'
import vcMessage from './components/message/index.js'

const components = [
    vcButton,
    vcForm,
    vcFormItem,
    vcIcon,
    vcNotification,
    vcInput,
    vcMessage
]

const install = app => {
    components.forEach(item => {
        if (item.__file) {
            app.component(item.name, item)
        } else {
            app.provide(item.name, item.function)
        }
    })
}

export default {
    install,
    vcButton,
    vcForm,
    vcFormItem,
    vcIcon,
    vcNotification,
    vcInput,
    vcMessage
}