export const headingPlugin = md => {
  let obj = {}

  md.renderer.rules.heading_open = (tokens, idx, opts) => {
    const token = tokens[idx]
    let content = tokens[idx + 1].content

    if (token.attrIndex('id')) {
      content = content.replace(/[\s@#$%^&*()_+=!]/g, '-')
      if (content in obj) {
        content += obj[content]
        obj[content]++
      } else {
        obj[content] = 1
      }

      token.attrSet('id', content)
    }

    // add class
    token.attrSet('class', 'vipress-heading')

    return md.renderer.renderToken(tokens, idx, opts)
  }
}
