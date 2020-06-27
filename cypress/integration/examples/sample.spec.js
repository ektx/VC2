describe('测试快速上手页面', function () {
  it('打开VC库页面', function () {
    cy.visit('http://localhost:3000/')
    // 找到文字内容为「快速上手」
    cy.contains('快速上手').click()
  })
})