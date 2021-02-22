// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
const site = Cypress.config('site')

Cypress.Commands.add('scrapCloudflareLogin', () => {
    cy.request({
        method: 'GET',
        url: '/',
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json',
            'CF-Access-Client-Id': '7c130103beaec1af9574ed69e0511f2e.access.inmuebles24.com',
            'CF-Access-Client-Secret': 'b1b7a585fc64a5063aa99f90093e74b5ee670915c9eda6e2c53eef9a526292d7'
        }
    })
})

Cypress.Commands.add('scrapLogin', () => {
    cy.request({
        method: 'GET',
        url: '/rp-api/user/' + site.usr + '/exist',
    })

    const siteEncoded = encodeURIComponent(Cypress.config().baseUrl)
    const userEncoded = encodeURIComponent(site.usr)

    cy.request({
        method: 'POST',
        url: site.loginUrl,
        headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'accept': '*/*',
        },
        body: 'email=' + userEncoded + '&password=' + site.pass + '&recordarme=true&homeSeeker=true&urlActual=' + siteEncoded
    })
})
