import { officesData } from '../../../data/offices.js'

describe('Home', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Has the correct title and heading', () => {
    cy.title().should('equal', 'Offices | Senior frontend test')
    cy.contains('h1', 'Offices')
  })

  it('Render Office card list', () => {
    cy.get('[data-test="offices-list"]').find('li').should('have.length', officesData.length)
  })

  it('Add a new office', () => {
    const office = officesData[0]

    cy.get('#add-office button').click()

    cy.wait(500)

    cy.get('input[name="title"]').type(office.title)
    cy.get('input[name="address"]').type(office.address)
    cy.get('input[name="fullname"]').type(office.fullName)
    cy.get('input[name="jobposition"]').type(office.jobPosition)
    cy.get('input[name="email"]').type(office.email)
    cy.get('input[name="phone"]').type(office.phone)

    cy.get('#add-office form button[type="submit"]').click()

    cy.wait(500)

    cy.get('[data-test="offices-list"]').find('li').should('have.length', officesData.length + 1)
  })

  it('Expand the office card', () => {
    const firstOfficeCard = cy.get('[data-test="offices-list"] > li').eq(0)
    firstOfficeCard.click()
    cy.wait(500)
    firstOfficeCard.get('[data-test="officeInfo"]').should('be.visible')
  })

  it('Delete the office', () => {
    cy.get('[data-test="offices-list"]')
      .find('li')
      .its('length')
      .then(size => {
        cy.get('[data-test="offices-list"] > li').eq(0).click()

        cy.wait(500)

        cy.get('button[data-test="delete-button"]').eq(0).click()

        cy.wait(200)

        cy.get('div[role="dialog"]').should('be.visible')

        cy.get('div[role="dialog"] button[data-test="delete-button-dialog"]').click()

        cy.wait(500)

        cy.get('[data-test="offices-list"]').find('li').should('have.length', size - 1)
      })
  })

  it('Edit the office', () => {
    const officeCard = cy.get('[data-test="offices-list"] > li').eq(0)
    const title = 'Business Inc.'

    officeCard.click()

    cy.wait(500)

    officeCard.get('button[data-test="edit-button"]').click()

    cy.wait(500)

    const form = officeCard.get('form[name="office-form"]')
    form.get('input[name="title"]').clear().type(title)
    form.get('button[type="submit"]').click()

    cy.wait(500)

    officeCard.get('[data-test="officeTitle"]').contains(title)
  })
})
