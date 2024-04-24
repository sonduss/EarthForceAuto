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


Cypress.Commands.add('login', () => {
cy.visit("/")
cy.get('#\\:r0\\:\\-form\\-item').type("muathmoh8+1@gmail.com");
cy.get('#\\:r1\\:-form-item').type("Earth@1234");
cy.get('[type="submit"]').click();



})

Cypress.Commands.add('fillContactForm', (name, email, phoneNumber, position) => {
    cy.get('form').should('be.visible').find('div').then(div => {
      cy.wrap(div[0]).find('input').type(name);
      cy.wrap(div[1]).find('input').type(email);
      cy.wrap(div[2]).find('input').type(phoneNumber);
      cy.wrap(div[3]).find('input').type(position);
    });
  });




//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })