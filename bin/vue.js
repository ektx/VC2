// 对 markdown 文档中的 ::: demo 进行文档化解析功能
module.exports = function (md, name = 'demo') {
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
    let autoClosed = false

    demoStr = demoStr.trim()

    if (!demoStr.startsWith(`::: ${name}`)) {
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
      let templateIndex = {
        start: null,
        end: null
      }
      let jsStart, jsEnd, cssStart, cssEnd

      for (;;) {
        nextLine++
        // 在文档与父级结束时 需要自动结束循环
        if (nextLine >= endLine) break

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

        let str = state.src.slice(start, max).trim()
          
        switch (true) {
          case str === '<template>': {
            // 防止多 template 嵌套
            if (!templateIndex.start) templateIndex.start = nextLine + 1
            break
          }
          case str === '</template>': {
            templateIndex.end = nextLine
            break
          }
          case str.startsWith('<script'): {
            jsStart = nextLine + 1
            break
          }
          case str === '</script>': {
            jsEnd = nextLine
            break
          }
          case str.startsWith('<style'): {
            cssStart = nextLine
            break
          }
          case str === '</style>': 
            cssEnd = nextLine + 1
        }

        if (str === ':::') {
          autoClosed = true
          break
        }
      }

      let old_parent = state.parentType
      let old_line_max = state.lineMax
      let token = state.push('vue_code_open', markToken, 1)

      token.markup = ':::'
      token.content = state.src.slice(
        state.bMarks[startLine +1],
        state.bMarks[nextLine]
      )
      // 获取 template 模板内容
      token.$template = state.src.slice(
        state.bMarks[templateIndex.start], 
        state.bMarks[templateIndex.end]
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
      // 源映射信息 整个文档的开始与结束行数
      token.map = [startLine, nextLine]
      // 围栏(代码块)信息字符串
      token.info = markToken
      // 对于块级 token 来说为 true，对于 inline 令牌来说为 false。
      // 在渲染器中用于计算换行。
      token.block = true

      state.md.block.tokenize(state, startLine + 1, nextLine)
      
      token = state.push('vue_code_close', markToken, -1)
      token.markup = ':::'
      token.block = true
      state.parentType = old_parent
      state.lineMax = old_line_max
      state.line = nextLine + (autoClosed ? 1 : 0)

      return true
  }

  md.block.ruler.before('fence', 'container_vue', container)
  md.renderer.rules['vue_code_open'] = render
  md.renderer.rules['vue_code_close'] = render
}