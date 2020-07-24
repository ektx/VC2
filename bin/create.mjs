// 自动生成组件
import fs from 'fs'
import inquirer from 'inquirer'

async function main() {
  let menu = await fs.promises.readFile('./example/src/menu.js', {encoding: 'utf8'})
  menu = Function(`return ${menu.slice(15)}`)()

  let menuList = menu.map((item, index) => ({
    name: item.label,
    value: index
  }))

  console.log('Create')
  let components = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: '组件名称',
      validate: async (name) => {
        let files = fs.readdirSync('./packages/components')
         
        return !files.includes(name) || `${name} 组件已经存在`
      }
    },
    {
      type: 'list',
      name: 'type',
      message: '选择组件类型',
      choices: [
        {
          name: '单个组件',
          value: 'single',
          description: '此组件为普通组件',
          
        },
        {
          name: '全局组件',
          value: 'global',
          description: '此组件会在全局引用'
        },
      ]
    },
    {
      type: 'list',
      name: 'menuIndex',
      message: '菜单位置选择',
      choices: menuList
    }
  ])

  menu[components.menuIndex].children.push({
    label: components.name,
    file: components.name + '.md'
  })

  updateMenu(menu)
  createMarkdown(components)
  createComponent(components)
}

function updateMenu (data) {
  data = 'export default ' + JSON.stringify(data, '', '  ')
  return fs.promises.writeFile('./example/src/menu.js', data)
}

function createMarkdown({ name }) {
  let comName = name.replace(/([A-Z])/g, '-$1').toLowerCase()

  const data = `
# ${name}

## 基础效果

::: demo 
\`\`\`html
<template>
  <vc-${comName} />
</template>
\`\`\`
:::


## Poprs

| 参数 | 类型 | 说明 | 可选值 | 默认值 |
|---|---|---|---|---|


## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
`
  return fs.promises.writeFile(`./doc/${name}.md`, data)
}

function createComponent({ name, type }) {
  let comName = name.replace(/([A-Z])/g, '-$1').toLowerCase()
  let vcName = `Vc${name[0].toUpperCase() + name.slice(1)}`

  let vueData = `<template>
  <div class="vc-${comName}">
    <h1>Hello, ${name}</h1>
  </div>
</template>

<script>
export default {
  name: '${vcName}',
}
</script>

<style lang="less">
.vc-${comName} {
  h1 {
    color: red;
  }
}
</style>`

  let indexJS = `import { createApp } from 'vue'
import App from './main.vue'

function ${vcName.slice(2)} (options) {
  // 功能代码
}

export default {
  name: '${vcName}',
  function: ${vcName.slice(2)}
}
`

  return new Promise(async (resolve) => {
    let savePath = `./packages/components/${name}/`
    await fs.promises.mkdir(savePath, { recursive: true})

    if (type === 'single') {
      await fs.promises.writeFile(savePath + 'index.vue', vueData)
    } else {
      await fs.promises.writeFile(savePath + 'index.js', indexJS)
      await fs.promises.writeFile(savePath + 'main.vue', vueData)
    }
    console.log('🎉 组件已经生成，你可以开发组件了！')
    resolve()
  })
}

main()
