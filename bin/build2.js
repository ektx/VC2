const { series } = require('gulp')
const { buildModules } = require('./modules')

const clean = async function () {
  console.log('clean...')
}

const build = async function () {
  console.log('build...')
  await buildModules()
}

exports.default = series(clean, build)
