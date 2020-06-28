describe('测试快速上手页面', function () {
  it('打开帮助页面', function () {
    cy.visit('/')
    // 暂停，用于手动运行
    // cy.pause()

    // 找到文字内容为「快速上手」
    cy.contains('快速上手').click()
    // 地址栏应该包含 /
    cy.url().should('include', '/')
  })
})

describe('测试 Composition API 功能', function () {
  it('输入框功能', function () {
    cy.get('.display-box > input:first')
      .clear()
      .type('hello')

    cy.get('.display-box > span')
      .should('contain', 'hello')
  })
})