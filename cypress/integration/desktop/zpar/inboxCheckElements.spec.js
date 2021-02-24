/// <reference types="cypress" />

const locale = Cypress.env('LOCALE')
const translations = require('../../../translations/translations.json')[locale]

context('Navegación del panel: ' + locale, () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false
  })

  before(() => {
    cy.scrapCloudflareLogin()
    cy.scrapLogin()
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('sessionId', 'hashKey', 'usuarioLogeado')
    cy.intercept('GET', '**/publisher/leads*limit=30*', { fixture: 'mokedInbox.json' }).as('getLeads')
    cy.intercept('GET', '**/publisher/leads*limit=1*', { fixture: 'mokedCounter.json' }).as('getCounter')
    cy.visit('/contactos.bum')
  })

  it('Check folders navigation', () => {
    cy.contains(translations.resultLabel)
    cy.wait('@getCounter')
    cy.contains('1223233')
    cy.contains('+999')
  })
})