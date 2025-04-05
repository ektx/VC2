import path from 'path'

export const containerPlugin = (md, opts) => {
  function renderDefault(tokens, idx, opts, env) {
    let token = tokens[idx]
    // 开始标签
    if (token.nesting === 1) {
      if (token.info === 'codeBox') {
        let { content, customSize } = token
        let childData = content.match(/(?<=`{3}vue)[\S|\n|\w|\r|\s]*?(?=`{3})/g)
        // 找到 includePlugin 标记的内容 <!---<< ${path} >>--->
        let includePath = content.match(/(?<=<!---<<)[^>-]+(?=>>--->)/)
        let baseName = `IncludeChild_${customSize}`
        let childName = ''
        let childPath = ''

        // 如果是引用文件 #[vue](./child.vue)
        if (includePath) {
          let dir = ''
          let childFile = includePath[0].trim()

          childName = path.basename(childFile)

          // xxx/index.md =>xxx/child.vue
          if (/index\.md/i.test(opts.path)) {
            dir = path.dirname(opts.path)
          }
          // xxx/abcd.md => xxx/abcd/child.vue
          else {
            dir = opts.path.replace(path.extname(opts.path), '')
          }
          childPath = path
            .join(dir, childName)
            .replace(process.cwd(), '@root')
            .replace(/\\/g, '/')
        }
        // 对于非引用文件
        // 比如在md文件中直接写在 codeBox 中的 vue 示例
        // 则生成 IncludeChild_+序列号，如：IncludeChild_1.vue
        else {
          childName = baseName + '.vue'
          childPath = path.join(opts.componentPath, childName)
        }

        childData = Array.isArray(childData) ? childData[0] : ''

        // 保存子组件信息
        // => import [base] from [path]
        opts.children.push({
          base: baseName,
          name: childName,
          path: childPath,
          include: !!includePath,
          data: childData.trim()
        })

        return `<${token.info}><template #child><${baseName} /></template>`
      } else {
        return `<${token.info}>`
      }
    } else {
      return `</${token.info}>`
    }
  }

  opts = opts || {}

  let min_markers = 3
  let marker_str = opts.marker || ':'
  let marker_char = marker_str.charCodeAt(0)
  let marker_len = marker_str.length
  let render = opts.render || renderDefault
  let customSize = 0

  function container(state, startLine, endLine, silent) {
    let pos,
      nextLine,
      marker_count,
      markup,
      params,
      token,
      old_parent,
      old_line_max,
      auto_closed = false
    let start = state.bMarks[startLine] + state.tShift[startLine]
    let max = state.eMarks[startLine]

    // 确认每行第一个字符串是否为 marker 标识
    if (marker_char !== state.src.charCodeAt(start)) {
      return false
    }

    // 验证其它的标记字符串
    for (pos = start + 1; pos <= max; pos++) {
      if (marker_str[(pos - start) % marker_len] !== state.src[pos]) {
        break
      }
    }

    marker_count = Math.floor((pos - start) / marker_len)
    // 如果获取的标记长度与设置的长度不符
    if (marker_count < min_markers) {
      return false
    }
    pos -= (pos - start) % marker_len

    // 整个标记结果 :::
    markup = state.src.slice(start, pos)
    // 标记内容 ::: code => 'code'
    params = state.src.slice(pos, max).trim()

    if (silent) {
      return true
    }

    // Search for the end of the block
    nextLine = startLine

    for (;;) {
      nextLine++
      if (nextLine >= endLine) {
        // unclosed block should be autoclosed by end of document.
        // also block seems to be autoclosed by end of parent
        break
      }

      start = state.bMarks[nextLine] + state.tShift[nextLine]
      max = state.eMarks[nextLine]

      if (start < max && state.sCount[nextLine] < state.blkIndent) {
        // non-empty line with negative indent should stop the list:
        // - ```
        //  test
        break
      }

      if (marker_char !== state.src.charCodeAt(start)) {
        continue
      }

      if (state.sCount[nextLine] - state.blkIndent >= 4) {
        // closing fence should be indented less than 4 spaces
        continue
      }

      for (pos = start + 1; pos <= max; pos++) {
        if (marker_str[(pos - start) % marker_len] !== state.src[pos]) {
          break
        }
      }

      // 结束标记至少与开始标记相同
      if (Math.floor((pos - start) / marker_len) < marker_count) {
        continue
      }

      // make sure tail has spaces only
      pos -= (pos - start) % marker_len
      pos = state.skipSpaces(pos)

      if (pos < max) {
        continue
      }

      // found!
      auto_closed = true
      customSize++
      break
    }

    old_parent = state.parentType
    old_line_max = state.lineMax
    state.parentType = 'container'

    // this will prevent lazy continuations from ever going past our end marker
    state.lineMax = nextLine

    token = state.push('vi_custom_container_open', 'div', 1)
    token.markup = markup
    token.content = state.src.slice(
      state.bMarks[startLine + 1],
      state.bMarks[nextLine]
    )
    token.block = true
    token.info = params
    token.map = [startLine, nextLine]
    token.customSize = customSize

    state.md.block.tokenize(state, startLine + 1, nextLine)

    token = state.push('vi_custom_container_close', 'div', -1)
    token.markup = state.src.slice(start, pos)
    token.block = true
    token.info = params

    state.parentType = old_parent
    state.lineMax = old_line_max
    state.line = nextLine + (auto_closed ? 1 : 0)

    return true
  }

  md.block.ruler.before('fence', 'vi_custom_container', container)
  md.renderer.rules['vi_custom_container_open'] = render
  md.renderer.rules['vi_custom_container_close'] = render
}
