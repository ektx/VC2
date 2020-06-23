<script>
import { 
  defineComponent, // 定义组件
  h, // 用于渲染组件
  onMounted,
  reactive, ref, 
  watch 
} from 'vue'

export default {
  name: 'VCDemo',
  props: {
    xml: {
      type: String,
      default: ''
    },
    js: {
      type: String,
      default: ''
    },
    css: {
      type: String,
      default: ''
    }
  },
    // watch: {
    //     show (val) {
    //         if (val) {
    //             let h = this.codeEl.scrollHeight
    //             this.style.height = h + 'px'
    //         } else {
    //             let h = this.codeEl.scrollHeight
    //             this.style.height = `${h}px`

    //             requestAnimationFrame(() => {
    //                 this.style.height = 0
    //             })
    //         }
    //     }
    // },
    // computed: {
    //     html () {
    //         return this.xml.replace(/&#123;/g, '{')
    //     }
    // },
    // mounted () {
    //     // this.codeEl = this.$el.querySelector('.source-box--main')
    //     // this.codeEl.addEventListener('transitionend', this.removeStyle)

    //     // this.init()
    // },
    // methods: {
    //     // 获取 script 部分内容
    //     stripScript (content) {
    //         let result = content.match(/<(script)>([\s\S]+)<\/\1>/)
    //         result = result && result[2] ? result[2].trim() : ''

    //         if (result) {
    //             return Function(`return ${result.substr(15)}`)()
    //         } else {
    //             return {
    //                 data () {
    //                     return {}
    //                 },
    //                 watch: {},
    //                 methods: {},
    //                 mounted () {}
    //             }
    //         }
    //     },
    //     // 获取样式内容
    //     setStyle () {
    //         let cssInner = this.css.match(/<(style)\s*>([\s\S]+)<\/\1>/)
    //         cssInner = cssInner && cssInner[2] ? 
    //             cssInner[2].trim() : ''

    //         let style = document.createElement('style')
    //         this.$el.appendChild(style)

    //         style.type = 'text/css'
    //         style.appendChild(
    //             document.createTextNode(cssInner)
    //         )

    //         // return result && result[2] ? result[2].trim() : ''
    //     },
    //     // 获取 template 内容
    //     stripTemplate(content) {
    //         content = content.trim()
    //         if (!content) {
    //             return content
    //         }
    //         content = content.replace(/<(script|style)[\s\S]+<\/\1>/g, '')
    //         content = content.split('\n')
    //         // 除去前后 template
    //         content = content.slice(1, content.length-1)

    //         return `<div>${content.join('')}</div>`
    //     },

    //     init () {
    //         let { data, methods, mounted, watch } = this.stripScript( this.js )
    //         let template = this.stripTemplate( this.html )

    //         let Com = defineComponent({
    //             // router: this.$router,
    //             template,
    //             data,
    //             watch,
    //             methods,
    //             mounted
    //         })
    //         console.log(Com)

    //         // https://cn.vuejs.org/v2/api/#vm-mount
    //         // 渲染文档后
    //         let component = h(Com)
    //         console.log(component)
    //         // 挂载
    //         // this.$el.querySelector('.display-box').appendChild(component.$el)

    //         this.setStyle()
    //     },

    //     removeStyle () {
    //         if (this.show) this.style.height = ''
    //     }
    // },
    // destroyed () {
    //     this.codeEl.removeEventListener('transitionend', this.removeStyle)
    // },
  setup (props, { slots }) {
    let {xml, css, js} = props
    let setupFun = getSetupFun(js)
    // console.log(setupFun(ref, watch, reactive))

    const state = reactive({
      show: false,
      style: {
        height: '0px'
      }
    })
    const codeEl = ref(null)

    watch(
      () => state.show,
      val => {
        let h = codeEl.value.scrollHeight
        state.style.height = h + 'px'

        if (!val) {
          requestAnimationFrame(() => {
            state.style.height = '0px'
          })
        }
      }
    )

    return () => {
      let _slots = {}
      // 取出可用的插槽对象
      Object.keys(slots).forEach(key => {
        let val = slots[key]
        if (typeof val === 'function') {
          _slots[key] = val
        }
      })

      return h(
      defineComponent({
        template: `<div class="demo-com">
  <div class="display-box">${xml}</div>
    <div class="source-box">
      <div class="source-box--main" ref="CODE_EL__" :style="STATE__.style">
        <slot/>
      </div>
    <div class="source-box--footer" @click="STATE__.show = !STATE__.show">
      <span>{{ STATE__.show ? '收起' : '查看代码'}}</span>
    </div>
  </div>
</div>`,
        // Vue 2
        // data: function () {
        //   return {
        //     // msg: 'Hello',
        //     STATE__: state,
        //   }
        // },

        // Composition API
        setup(props, { slots }) {
          console.log('props:', props)
          // 调用用户定义的组件方法
          let __userData = setupFun(ref, watch, reactive).setup()

          return {
            ...__userData,
            STATE__: state,
            CODE_EL__: codeEl
          }
        }
      }),
      // 各种属性配制访问如下链接
      // https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth
      { },
      // https://github.com/vuejs/rfcs/blob/slots-unification/active-rfcs/0006-slots-unification.md
      // 指定各插槽对应的渲染函数
      _slots
    )
    }
  }
}

/**
 * 从特定字符串获取到 setup与相关的方法
 * @param {string} str 字符串内容
 * @returns 得到一个 object 的对象
 */
function getSetupFun (str) {
  // 移除字符串中 'export default'
  str = str.slice(15)

  return new Function('ref', 'watch', 'reactive', `return ${str}`)
}
</script>


<style lang="less">
.demo-com {
  margin: 2em 0;
  border-radius: 3px;
  border: 1px solid var(--gray75);
  transition: border-color .3s ease-in-out;

  .display-box {
    padding: 10px;
    border-radius: 3px 3px 0 0;
    border-bottom: 1px solid var(--gray75);
    background-color: #fff;
  }

  .source-box {
    .source-box--main {
      overflow: hidden;
      background-color: #fafafa;
      transition: height .5s ease-out;

      pre, code {
        margin: 0;
        border-radius: 0;
        background: transparent;
      }

      p {
        color: #333;
      }
    }

    .source-box--footer {
      position: sticky;
      bottom: 0px;
      margin-top: -1px;
      font-size: 12px;
      color: #666;
      line-height: 3em;
      text-align: center;
      border-top: 1px solid var(--gray75);
      background-color: #fff;
      border-radius: 0 0 3px 3px;
      cursor: pointer;
      transition: 
        color .3s ease-in-out,
        background-color .3s ease-in-out;

      .DARK_source-box--footer {
        color: #aaa;
        background-color: var(--gray75);
      }

      .dark-scheme & {
        .DARK_source-box--footer
      }

      @media (prefers-color-scheme: dark) {
        .DARK_source-box--footer
      }

      &:hover {
        color: #09f;
      }
    }

    blockquote {
      margin: 10px;
      padding: 5px 10px;
      background: #fff;
      border-radius: 3px;
      border: 1px solid #eee;
    }
  }
}
</style>