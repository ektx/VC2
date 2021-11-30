/**
 * 手动获取vue2 中类似 atrrs
 * vue3 中包含有 id style class event
 * 排除函数的值
 * @param array filter 过滤字段
 */
export function getAttrs (attrs, filter) {
  if (!attrs) return {}

  let __attrs = {}
  
  Object.keys(attrs).forEach(key => {
    if (!filter.includes(key)) {
      __attrs[key] = attrs[key]
    }
  })

  return __attrs
}

/**
 * 获取指定的属性
 * @param {*} attrs 
 * @param {array} args 指定需要的属性
 * @returns attrs
 * @example
 * // 获取 id 与 class、style
 * setAttrs($attrs, ['id','class','style'])
 * 
 * // 获取事件
 * setAttrs($attrs, ['events'])
 */
export function setAttrs(attrs, args) {
  let result = {}
  let { id, style, class: calsses, ...events} = attrs

  if (attrs) {
    args.forEach(key => {
      if (key === 'events') {
        result = { ...result, ...events }
      } else {
        result[key] = attrs[key]
      }
    })
  }

  return result
}