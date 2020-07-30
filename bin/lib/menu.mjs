import fs from 'fs'

/**
 * 更新菜单
 * @param {object} data 数据
 */
export function updateMenu (data) {
  data = 'export default ' + JSON.stringify(data, '', '  ')
  return fs.promises.writeFile('./example/src/menu.js', data)
}