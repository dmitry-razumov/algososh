describe('test app is up', () => {
  it('should be available on localhost:3000', () => {
    cy.visit('/')
  })
})