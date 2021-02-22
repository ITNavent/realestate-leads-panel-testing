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
    cy.visit('/contactos.bum')
  })

  it('Check folders navigation', () => {
    cy.intercept('GET', '**/publisher/leads*limit=30*').as('getLeads')
    cy.get('ul li:first').next().click()
    cy.wait('@getLeads')
    cy.get('ul li:last').click()
    cy.wait('@getLeads')
    cy.get('ul li:first').click()
    cy.wait('@getLeads')
  })

  it('Check filtering options', () => {
    cy.contains('Filtrar').click()
    cy.get('ul li').contains('WhatsApp').click()
    cy.contains('Aplicar').click()
    cy.contains(translations.btnLimpiarFiltros).click()
    cy.get('input').type('juanmita{enter}')
    cy.contains(translations.btnLimpiarFiltros).click()
  })
})