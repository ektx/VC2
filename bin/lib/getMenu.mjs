import fs from 'fs'

export default function () {
  return new Promise(async (resolve, reject) => {
    let path = './example/src/menu.js'
    let menu = await fs.promises.readFile(path, {encoding: 'utf8'})
    menu = Function(`return ${menu.slice(15)}`)()
  
    let list = menu.map((item, index) => ({
      name: item.label,
      value: index
    }))

    resolve({menu, list})
  })
}