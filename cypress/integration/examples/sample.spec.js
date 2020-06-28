describe('测试快速上手页面', function () {
  it('打开帮助页面', function () {
    cy.visit('http://localhost:3000/')
    // 找到文字内容为「快速上手」
    cy.contains('快速上手').click()
    // 地址栏应该包含 /
    cy.url().should('include', '/')
  })
})

describe('测试 Composition API 功能', function () {
  it('输入框功能', function () {
    cy.get(':nth-child(4) > .display-box > :nth-child(2)')
      .type(' hello')
      .should('have.value', 'composition api demo hello')
  })
})