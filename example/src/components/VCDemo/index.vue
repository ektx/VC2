<script>
import { 
  defineComponent, // 定义组件
  h, // 用于渲染组件
  onMounted,
  reactive, ref, 
  watch ,
  inject,
  getCurrentInstance
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
    },
    id: String
  },
  setup (props, { slots }) {
    let {xml, css, js} = props
    let setupFun = getSetupFun(js)
    
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

    onMounted(() => {
      let { ctx } = getCurrentInstance()

      ctx.$el.insertAdjacentHTML('afterend', css)
    })

    let template = `<div class="demo-com" id="${props.id}">
      <div class="display-box">${xml}</div>
        <div class="source-box">
          <div class="source-box--main" ref="CODE_EL__" :style="STATE__.style">
            <slot/>
          </div>
        <div class="source-box--footer" @click="STATE__.show = !STATE__.show">
          <span>{{ STATE__.show ? '收起' : '查看代码'}}</span>
        </div>
      </div>
    </div>`
    let componentOpts = {}
    // 调用用户定义的组件方法
    let __userData = setupFun(ref, watch, reactive, inject)

    if (__userData) {
      // Composition API
      if (Reflect.has(__userData, 'setup')) {
        componentOpts = {
          setup() {
            return {
              ...__userData.setup(),
              STATE__: state,
              CODE_EL__: codeEl
            }
          }
        }
      } 
      // options api
      else {
        // 如果用户并没有设置 data
        if (typeof __userData.data !== 'function') {
          __userData.data = function() { return {}}
        }

        componentOpts = {
          ...__userData,
          data () {
            return {
              ...__userData.data(),
              STATE__: state
            }
          },
          mounted () {
            // 运行 demo mounted
            __userData.mounted && __userData.mounted()

            // 绑定 code 展示区 dom
            codeEl.value = this.$refs.CODE_EL__
          }
        }
      }
    } else {
      componentOpts = {
        setup() {
          return {
            STATE__: state,
            CODE_EL__: codeEl
          }
        }
      }
    }

    return () => {
      let _slots = {}
      // 取出可用的插槽对象
      Object.keys(slots).forEach(key => {
        let val = slots[key]
        if (typeof val === 'function') {
          _slots[key] = val
        }
      })

      let H = h(
          defineComponent({template, ...componentOpts}),
        // 各种属性配制访问如下链接
        // https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth
        { },
        // https://github.com/vuejs/rfcs/blob/slots-unification/active-rfcs/0006-slots-unification.md
        // 指定各插槽对应的渲染函数
        _slots
      )

      return H
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
  str = str.trim().slice(15)

  return new Function('ref', 'watch', 'reactive', 'inject', `return ${str}`)
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
      bottom: -20px;
      margin-top: -1px;
      font-size: 12px;
      color: #666;
      line-height: 3em;
      text-align: center;
      border-top: 1px solid var(--gray75);
      background-color: #fff;
      // border-radius: 0 0 3px 3px;
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