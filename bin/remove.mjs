import trash from 'trash'
import fs from 'fs'
import inquirer from 'inquirer'
import getMenu from './lib/getMenu.mjs'
import { updateMenu } from './lib/menu.mjs'

async function main() {
  let components = fs.readdirSync('./packages/components')

  components = components.map(item => ({
    name: item,
    value: item
  }))

  let component = await inquirer.prompt([
    {
      type: 'list',
      name: 'dir',
      message: '删除的组件名',
      choices: components
    },
    {
      type: 'confirm',
      name: 'confirm',
      message: '你确认要删除此组件吗',
      default: false
    }
  ])

  if (component.confirm) {
    console.log(`🗑  正在为您删除 ${component.dir} 组件及相关文档等内容，请稍候...`)
    let { menu } = await getMenu()

    console.log(menu)
    menu.forEach(nav => {
      nav.children.forEach((child, i) => {
        if (child.file.startsWith(component.dir)) {
          console.log(child, i)
          nav.children.splice(i, 1)
        }
      })
    })

    updateMenu(menu)

    await trash(`./doc/${component.dir}.md/`)
    await trash(`./packages/components/${component.dir}/`)
    console.log('🎉 删除完成。文件已经移入废纸篓(回收站)。')
  } else {
    console.log('🎉 进程已结束！')
  }
}

main()