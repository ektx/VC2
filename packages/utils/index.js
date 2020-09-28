import { getCurrentInstance } from 'vue'

/**
 * 手动获取vue2 中类似 atrrs
 * 排除函数的值
 */
export function getAttrs () {
  debugger
  let { ctx } = getCurrentInstance()
  let __attrs = {}

  Object.keys(ctx.$attrs).forEach(key => {
    if (typeof ctx.$attrs[key] !== 'function') {
      __attrs[key] = ctx.$attrs[key]
    }
  })

  return __attrs
}