/**
 * 手动获取vue2 中类似 atrrs
 * 排除函数的值
 */
export function getAttrs (attrs) {
  if (!attrs) return {}

  let __attrs = {}

  Object.keys(attrs).forEach(key => {
    if (typeof attrs[key] !== 'function') {
      __attrs[key] = attrs[key]
    }
  })

  return __attrs
}