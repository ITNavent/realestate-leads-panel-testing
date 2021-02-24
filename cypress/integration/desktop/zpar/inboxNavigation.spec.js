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
    cy.intercept('GET', '**/publisher/leads*limit=30*').as('getLeads')
    cy.visit('/contactos.bum')
  })

  it.skip('Check folders navigation', () => {
    cy.get('ul li:first').next().click()
    cy.wait('@getLeads')
    cy.get('ul li:last').click()
    cy.wait('@getLeads')
    cy.get('ul li:first').click()
    cy.wait('@getLeads')
  })

  it.skip('Check filtering options', () => {
    cy.get('button').contains('Filtrar').click()
    cy.get('ul li').contains('WhatsApp').click()
    cy.contains('Aplicar').click()
    cy.wait('@getLeads')
    cy.contains(translations.clearFilters).click()
    cy.get('input').type('navent{enter}')
    cy.wait('@getLeads')
    cy.contains(translations.clearFilters).click()
  })

  it.skip('Check ordering options', () => {
    cy.get('button').contains(translations.recent).click()
    cy.get('ul li').contains(translations.recent).siblings().contains(translations.favorites).click()
    cy.wait('@getLeads')
    cy.get('button').contains(translations.favorites).click()
    cy.get('ul li').contains(translations.unreaded).click()
    cy.wait('@getLeads')
  })

  it('Check lead details screen', () => {
    cy.wait('@getLeads')
    cy.get('tbody>tr').its('length').then(rows => {
      const randomRow = Math.floor(Math.random() * (rows - 1))
      cy.get('tbody>tr').eq(randomRow).children('td.nameColumn').click()
    })
  })
})