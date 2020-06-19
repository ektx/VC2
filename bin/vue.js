module.exports = function vue_plugin(md, name, options) {
  // 渲染方案
  function render (tokens, idx, opts, env, self) {
    if (tokens[idx].nesting === 1) {
      let { $template, $js, $css } = tokens[idx]

      tokens[idx].attrJoin('xml', $template)
      tokens[idx].attrJoin('js', $js)
      tokens[idx].attrJoin('css', $css)
      tokens[idx].attrJoin('key', Date.now())
    }
    // 生成 html
    return self.renderToken(tokens, idx, opts, env, self)
  }

  function container (state, startLine, endLine, slient) {
      let start = state.bMarks[startLine] + state.tShift[startLine]
      let demoStr = state.src.slice(state.bMarks[startLine], state.eMarks[startLine])
      let max = state.eMarks[startLine]
      let auto_closed = false

      if (!demoStr.startsWith('::: demo')) {
          return false
      }

      // 自动处理标签
      // :::demo => <demo></demo>
      // :::demo-theme => <demo-theme/>
      let markToken = demoStr.slice(3).trim()

    //   Since start is found, we can report success here in validation mode
    if (slient) { return true }

      // 查找 block 结束位置
      let nextLine = startLine
      let temStart = startLine
      let temEnd = startLine
      let jsStart = startLine
      let jsEnd = startLine
      let cssStart = startLine
      let cssEnd = startLine

      for (;;) {
          // console.log('nextLine:', nextLine)
          // console.log(`start: ${start} max: ${max}`)
          // console.log('text:', state.src.slice(start, max))
          // console.log('sCount', state.sCount[nextLine])
          // console.log('blkIndent', state.blkIndent)

          nextLine++
          // 在文档与父级结束时 需要自动结束循环
          if (nextLine >= endLine) {
              break
          }

          start = state.bMarks[nextLine] + state.tShift[nextLine]
          max = state.eMarks[nextLine]

          
          if (start < max && state.sCount[nextLine] < state.blkIndent) {
              break
          }
          
          // 过滤那些非从行头开始的内容
          // ::: demo > ok
          //     :::: demo > pass
          if (state.sCount[nextLine] - state.blkIndent >= 4) {
              continue
          }

        //   if (state.src.slice(start, max).length < 3) {
        //       continue
        //   }

          let str = state.src.slice(start, max)
          
          switch (true) {
              case str === '<template>':
                  // 必须开始标签小于结束标签
                  // 防止多个 template 时无法正确取值
                  if (temStart <= temEnd) {
                      temStart = nextLine
                  }
                  break
              case str === '</template>':
                  temEnd = nextLine + 1
                  break
              case str.startsWith('<script'):
                  jsStart = nextLine
                  break
              case str === '</script>':
                  jsEnd = nextLine + 1
                  break
              case str.startsWith('<style'):
                  cssStart = nextLine
                  break
              case str === '</style>':
                  cssEnd = nextLine + 1
          }

        if (str === ':::') {
          auto_closed = true
          break
        }
      }

      let old_parent = state.parentType
      let old_line_max = state.lineMax
      let token = state.push('vue-code_open', markToken, 1)

      token.markup = ':::'
      token.content = state.src.slice(
        state.bMarks[startLine +1],
        state.bMarks[nextLine]
      )
      // 获取模板内容 <template>...</template>
      token.$template = state.src.slice(
        state.bMarks[temStart], 
        state.bMarks[temEnd]
      )
      // 获取 JS 内容 <script>...</script>
      token.$js = state.src.slice(
        state.bMarks[jsStart],
        state.bMarks[jsEnd]
      )
      // 获取 Css 内容 <style>...</style>
      token.$css = state.src.slice(
        state.bMarks[cssStart],
        state.bMarks[cssEnd]
      )
      token.map = [startLine, nextLine]
      token.info = markToken
      token.block = true

      state.md.block.tokenize(state, startLine + 1, nextLine)
      
      token = state.push('vue-code_close', markToken, -1)
      token.markup = ':::'
      token.block = true
      state.parentType = old_parent
      state.lineMax = old_line_max
      state.line = nextLine + (auto_closed ? 1 : 0)

      return true
  }

  md.block.ruler.before('fence', 'container_vue', container)
  md.renderer.rules['vue-code_open'] = render
  md.renderer.rules['vue-code_close'] = render
}