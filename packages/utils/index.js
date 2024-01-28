/**
 * 手动获取vue2 中类似 atrrs
 * vue3 中包含有 id style class event
 * 排除函数的值
 * @param array filter 过滤字段
 */
export function getAttrs(attrs, filter) {
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
  let { id, style, class: calsses, ...events } = attrs

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

/**
 * 将属性转换成样式格式
 * @param {string} name 属性
 */
export function props2class(name) {
  return name.replace(/([A-Z])/g, '-$1').toLowerCase()
}

/**
 * 通过属性值生成指定的样式
 * @param {any} props 属性
 * @param {string} [name] 额外指定样式名
 */
export function hasClass(props, name) {
  return this.$props[props] ? props2class(name ?? props) : ''
}

/**
 * 从路径中获取对象中值
 * @param {object} obj 取值对象
 * @param {string} path 对象路径
 * @returns {any} 返回获取的值
 */
export function getValueOfPath(obj, path) {
  let paths = path.split('.')
  let res = obj
  let prop

  while ((prop = paths.shift())) {
    res = typeof res === 'object' ? res[prop] : undefined
  }
  return res
}

/**
 * 设置字符串路径嵌套对象属性
 * @param {proxy} obj 代理对象
 * @param {string} path keys值字符串
 * @param {any} value 要设置的内容
 */
export function setValueOfPath(obj, path, value) {
  let paths = path.split('.')
  let res = obj

  while (paths.length > 1 && Reflect.has(res, paths[0])) {
    res = res[paths.shift()]
  }

  res[paths[0]] = value
}
