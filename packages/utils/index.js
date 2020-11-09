/**
 * 手动获取vue2 中类似 atrrs
 * 排除函数的值
 * @param array filter 过滤字段
 */
export function getAttrs (attrs, filter) {
  if (!attrs) return {}

  let __attrs = {}

  Object.keys(attrs).forEach(key => {
    if (
      typeof attrs[key] !== 'function' 
      && !filter.includes(key)
    ) {
      __attrs[key] = attrs[key]
    }
  })

  return __attrs
}