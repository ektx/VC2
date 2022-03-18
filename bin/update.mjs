import fs from 'fs'
import path from 'path'
import pack from '../package.json'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const { version } = pack

// 生成 index.less
function createCSS(list) {
  let cssPath = path.join(__dirname, '../packages/index.less')
  let cssData = `/* 以下代码自动生成于 ${Date()} */\n\n`

  cssData += `@import './styles/var.less';\n`
  cssData += `@import './styles/transition.less';\n`
  cssData += list.join('\r\n')

  fs.writeFile(cssPath, cssData, { encoding: 'utf8' }, err => {
    if (err) throw Error(err)
    console.log('Index.css is updated!!')
  })
}

// 生成 index.js
function createIndexJS(compomentArr) {
  let savePath = path.join(__dirname, '../packages/index.js')
  let data = `/* 以下代码自动生成于 ${Date()} */\n\n`
  let imports = []
  let components = []
  let exportComponents = '\n'
  let exportObj = ['install']
  let installStr = `
const install = app => {
  components.forEach(item => {
    if (!item.function) {
      app.component(item.name, item)
    } else {
      app.provide(item.name, item.function)  
      // 绑定 ctx 上(不建议使用全局，后期将要移除)
      // 建议动态导入
      app.config.globalProperties[item.name] = item.function
    }
  })
}`

  compomentArr.forEach(({ dir, file }) => {
    let name = dir[0].toUpperCase() + dir.slice(1)
    let comName = 'vc' + name

    imports.push(`import ${name} from './components/${dir}/${file}'`)
    components.push(name)
    exportObj.push(name)

    if (file.endsWith('.js')) {
      exportComponents += `\nexport const ${comName} = ${name}.function`
    } else {
      exportComponents += `\nexport const ${comName} = ${name}`
    }
  })

  components = `\n\nconst components = [\n  ${components.join(',\n  ')}\n]\n`
  exportObj =
    '\n\nexport default {\n  version: "' +
    version +
    '",\n  ' +
    exportObj.join(',\n  ') +
    '\n}\n'

  data +=
    imports.join('\n') + components + installStr + exportComponents + exportObj

  fs.writeFile(savePath, data, { encoding: 'utf8' }, err => {
    if (err) throw Error(err)
    console.log('Index.js is updated!!')
  })
}

;(async function () {
  let componentsDir = path.join(__dirname, '../packages/components')
  let files = await fs.promises.readdir(componentsDir)
  let layoutArr = []
  let componentArr = []
  let promisesAll = []

  files.forEach(dir => {
    let fun = new Promise((resolve, reject) => {
      let _dir = path.join(componentsDir, dir)

      fs.readdir(_dir, (err, _files) => {
        if (err) {
          return reject(err)
        }

        _files.forEach(file => {
          if (path.extname(file) === '.less') {
            layoutArr.push(`@import './components/${dir}/${file}';`)
          } else if (file.startsWith('index')) {
            componentArr.push({ dir, file })
          }
        })
        resolve()
      })
    })

    promisesAll.push(fun)
  })

  Promise.all(promisesAll).then(() => {
    createCSS(layoutArr)
    createIndexJS(componentArr)
  })
})()
