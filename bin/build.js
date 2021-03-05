const fs = require('fs')
const less = require('less')
const path = require('path')

async function main () {
  await setOutpath()
  await copyIndexFile()
  await genLess()
  await copyDir('./packages/fonts', './dist/fonts')
  await copyDir('./packages/components', './dist/components')
  await copyDir('./packages/utils', './dist/utils')
}

function setOutpath () {
  return new Promise(async (resolve) => {
    let buildPath = './dist'
  
    if (fs.existsSync(buildPath)) {
      await fs.promises.rmdir(buildPath, { recursive: true})
    }
  
    await fs.promises.mkdir('./dist', { recursive: true })

    console.log('🗃  Dist is done!')
    resolve()
  })
}

function copyIndexFile () {
  return new Promise(async (resolve) => {
    let rs = fs.createReadStream('./packages/index.js')
    let ws = fs.createWriteStream(path.join(__dirname, '../dist/index.js'))
    rs.pipe(ws)
    console.log('🚛 Index.js is done!')
    resolve()
  })
}

function genLess () {
  return new Promise(async (resolve, reject) => {
    let file = path.join(__dirname, '../packages/layout.less')
    let css = fs.readFileSync(file, {encoding: 'utf8'})
    let output_ = path.join(__dirname, '../dist/layout.css')

    less.render(css, {
      paths: ['./packages'], // 指定@import指令的搜索路径
      // compress: true, // 压缩样式
    }, async function(err, output) {
      if (err) {
        reject()
        throw err
      }

      let css = output.css.replaceAll('../../fonts/icon', './fonts/icon')

      await fs.promises.writeFile(output_, css)
      resolve()
      console.log('🎨 Less to css is done!')
    })
  })
}

function copyDir(from, to) {
  return new Promise(async (resolve, reject) => {
    await copyFile(from, to)
    resolve()
  })
}

function copyFile (entryDir, outputDir) {
  return new Promise(async (resolve, reject) => {
    let _isAbsolute = path.isAbsolute(entryDir)
    // 移动文件时，过滤文件的后缀名类型
    let filter = ['', '.less']

    await fs.promises.mkdir(outputDir)

    fs.readdir(entryDir, (err, files) => {
      if (err) {
        reject(err)
        throw err
      }
  
      files.forEach(async file => {
        let entry = path.join(entryDir, file)
        let output = path.join(outputDir, file)

        if (!_isAbsolute) {
          entry = path.join(process.cwd(), entry)
          output = path.join(process.cwd(), output)
        }

        let stat = await fs.promises.stat(entry)

        if (stat.isFile()) {
          let ext = path.extname(entry) 

          if (!filter.includes(ext)) {
            let rs = fs.createReadStream(entry)
            let ws = fs.createWriteStream(output)
            
            rs.pipe(ws)
            console.log(`🚚 ${file} is done!`)
          } else {
            console.log(`🗑  ${file} is remove!`)
          }
        } else {
          console.log(`🔍 Find ${file} files...`)
          await copyFile(entry, output)
        }
      })

      resolve()
    })
  })
}

main()