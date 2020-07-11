describe('测试 Message 信息页面', function () {
  it('打开页面', function () {
    cy.visit('/')
    cy.contains('Message 消息提示').click()
  })
  it('地址栏为 /message.md', function () {
    cy.url().should('include', '/message.md')
  })
})

describe('测试默认效果', function () {
  it('成功', function () {
    cy.get('.demo-com:eq(0) .vc-button:nth-child(1)').click()
    cy.get('.demo-com:eq(0) .vc-button:nth-child(2)').click()
    cy.get('.demo-com:eq(0) .vc-button:nth-child(3)').click()
    cy.get('.demo-com:eq(0) .vc-button:nth-child(4)').click()

    cy.get('.vc-message-box .vc-message')
      .should('contain', '这是一个成功信息！')
  })
  it('测试是否自动关闭', function () {
    cy.wait(3100)
    cy.get('.vc-message-box').should('be.empty')
  })
})

describe('手动关闭', function () {
  it('打开提醒', function () {
    cy.get('.demo-com:eq(1) .vc-button:nth-child(1)').click()
    cy.get('.demo-com:eq(1) .vc-button:nth-child(2)').click()
    cy.get('.demo-com:eq(1) .vc-button:nth-child(3)').click()
    cy.get('.demo-com:eq(1) .vc-button:nth-child(4)').click()
  })

  it('不自动关闭', function () {
    cy.wait(3100)
    cy.get('.vc-message').should($el => {
      expect($el).to.have.length(4)
    })
  })

  it('手动关闭', function () {
    cy
      .get('.vc-message')
      .each((el, i) => {
        el.find('.vc-icon-close').click()
      })
      .then(list => {
        expect(list).to.have.length(4)
      })
    
      cy.wait(1000)
      cy.get('.vc-message-box').should('be.empty')
  })
})