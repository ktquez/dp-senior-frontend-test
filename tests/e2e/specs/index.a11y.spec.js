describe('Home', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.injectAxe()
  })

  it('Has no detectable a11y violations on load', () => {
    cy.checkA11y()
  })

  it('Has no detectable a11y violations in office card', () => {
    cy.get('#office-item-1 div[data-test="officeCard"]').click()
    cy.wait(500)
    cy.checkA11y('#office-item-1 article')
  })

  it('Has no detectable a11y violations in new office form', () => {
    cy.get('#add-office button').click()
    cy.wait(500)
    cy.checkA11y('#add-office')
  })

  it('Has no detectable a11y violations in notification when new office', () => {
    cy.get('#add-office button').click()

    cy.wait(500)

    cy.get('input[name="title"]').type('Office Inc')
    cy.get('input[name="address"]').type('Street 100')
    cy.get('input[name="fullname"]').type('Adrian Tith')
    cy.get('input[name="jobposition"]').type('Developer')
    cy.get('input[name="email"]').type('email@example.com')
    cy.get('input[name="phone"]').type('(000) 000-0000')

    cy.get('#add-office form button[type="submit"]').click()

    cy.wait(500)

    cy.checkA11y('[data-test="notification"]')
  })

  it('Has no detectable a11y violations when form error', () => {
    cy.get('#add-office button').click()

    cy.wait(500)

    cy.get('#add-office form button[type="submit"]').click()

    cy.checkA11y('#add-office')
  })
})
