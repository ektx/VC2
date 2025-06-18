import fs from 'fs-extra'
import path from 'node:path'
import createVue3 from './markdown/createVue3'
import chokidar from 'chokidar'

const virtualModuleId = '@vipress-router'
const resolvedVirtualModuleId = '\0' + virtualModuleId

// markdown 文档目录
const mdDocDir = 'doc'
// 模板缓存目录
const temSaveDir = '.cache'

export default async function () {
  return {
    // 必须的，将会在 warning 和 error 中显示
    name: virtualModuleId,
    enforce: 'pre',

    buildStart() {
      const watcher = chokidar.watch([mdDocDir], {
        persistent: true
      })

      watcher.on('ready', () => {
        console.log('watcher ready')
      })

      watcher.on('all', (event, filePath) => {
        console.log(event, filePath)
        const pathParse = path.parse(filePath)

        if (pathParse.ext === '.md') {
          // console.log(pathParse, 'pathParse')
          const mdFilePath = path.join(process.cwd(), filePath)
          const { savePath } = getSavePath(mdFilePath)
          // console.log('savePath', savePath)
          // console.log('mdFilePath', mdFilePath)
          // createVue3(mdFilePath, savePath)
          createVue(mdFilePath, savePath)
        }
      })
    },

    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    async load(id) {
      if (id === resolvedVirtualModuleId) {
        const routerDir = mdDocDir
        const routerPath = path.join(process.cwd(), mdDocDir)

        let result = []

        try {
          const files = fs.readdirSync(routerPath)

          for (const file of files) {
            if (file.endsWith('.md')) {
              const mdFile = path.join(routerPath, file)
              const { name, savePath, importPath } = getSavePath(mdFile)
              // console.log(savePath)
              // // 如果 vue 文件不存在，生成 vue 文件
              // if (!fs.existsSync(savePath)) {
              //   await createVue3(mdFile, savePath)
              // }

              // const mdStat = fs.statSync(mdFile)
              // const vueStat = fs.statSync(savePath)

              // // 如果 md 文件有更新，重新生成 vue 文件
              // if (mdStat.mtimeMs > vueStat.mtimeMs) {
              //   await createVue3(mdFile, savePath)
              // }
              await createVue(mdFile, savePath)

              result.push(`{
                path: '/${name}',
                name: '${name}',
                component: () => import('${importPath}')
              }`)
            }
          }
        } catch (error) {
          console.log(error)
        }

        return `export default [${result.join(',')}]`
      }
    }
  }
}

function getSavePath(mdFile) {
  const pathParse = path.parse(mdFile)
  const name = pathParse.name

  // 生成 vue 入口文件名
  const indexVueName = 'AUTO__INDEX.vue'
  const importPath = `${temSaveDir}/${name}/${indexVueName}`
  const saveDir = path.join(temSaveDir, name)
  const savePath = path.join(saveDir, indexVueName)

  return {
    ...pathParse,
    savePath,
    importPath
  }
}

async function createVue(mdFile, dest) {
  console.log(mdFile, '->', dest)

  if (fs.existsSync(dest)) {
    const mdStat = fs.statSync(mdFile)
    const vueStat = fs.statSync(dest)

    // 如果 md 文件有更新，重新生成 vue 文件
    if (mdStat.mtimeMs > vueStat.mtimeMs) {
      await createVue3(mdFile, dest)
    }
  } else {
    // 如果 vue 文件不存在，生成 vue 文件
    await createVue3(mdFile, dest)
  }
}
