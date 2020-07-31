describe('测试 Message 信息页面', function () {
  it('打开页面', function () {
    cy.visit('/')
    cy.contains('Message 消息提示').click()
  })
})

describe('测试自动关闭', function () {
  it('成功', function () {
    cy.get(':nth-child(4) .vc-button:nth-child(1)').click()
    cy.get('.vc-message-box .vc-message')
      .should('contain', '这是一个普通信息！')
  })
  it('close', function () {
    cy.wait(3100)
    cy.get('.vc-message-box').should('be.empty')
  })
})

describe('手动关闭', function () {
  it('打开提醒', function () {
    cy.get(':nth-child(6) .vc-button:nth-child(1)').click()
    cy.get(':nth-child(6) .vc-button:nth-child(2)').click()
    cy.get(':nth-child(6) .vc-button:nth-child(3)').click()
    cy.get(':nth-child(6) .vc-button:nth-child(4)').click()
  })

  it('不自动关闭', function () {
    cy.wait(3100)
    cy.get('.vc-message').should($el => {
      expect($el).to.have.length(4)
    })
  })
})