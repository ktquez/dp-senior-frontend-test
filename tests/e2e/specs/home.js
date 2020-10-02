describe('Home', () => {
  it('Should has the correct title and heading', () => {
    cy.visit('/')
    cy.title().should('equal', 'Offices | Senior frontend test')
    cy.contains('h1', 'Offices')
  })
})
