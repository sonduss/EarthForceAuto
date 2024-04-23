import Overview from '../support/PageObjectModal/Overview.js';


describe('Contacts Tests', () => {
  const overview = new Overview()
  beforeEach(() => {
    cy.login();
  });


 /*it('Add new contacts successfully', () => {
  cy.wait(4000);
    overview.getMapMArker().eq(0).click();
    cy.get('[data-testid="tab-contacts"]').click()
    cy.get('#radix-\\:rk\\:-content-contacts')
    .should('be.visible')
    .find('button[type="button"]')
    .should('be.enabled') 
    .click({ force: true }); 
    cy.get('form.space-y-4').should('be.visible').find('div').then(div =>  {
      cy.wrap(div[0]).should('be.visible').and('contain.text', 'Contact Name');
      cy.wrap(div[1]).should('be.visible').and('contain.text', 'Email');
      cy.wrap(div[2]).should('be.visible').and('contain.text', 'Phone Number');
      cy.wrap(div[3]).should('be.visible').and('contain.text', 'Position');
      
      cy.wrap(div[0]).find('input').type('sondus Moh');
      cy.wrap(div[1]).find('input').type('sondus@gmail.com');
      cy.wrap(div[2]).find('input').type('0595122222');
      cy.wrap(div[3]).find('input').type('test');
  });
  
  cy.get('[type="submit"]').click();

});*/
it('Delete contacts successfully', () => {
  cy.wait(4000);
    overview.getMapMArker().eq(0).click();
    cy.get('[data-testid="tab-contacts"]').click()
  cy.get('[data-testid="contact-info"]').should('exist').then(() => {
    cy.get('[data-testid="contact-info"]').first().find('.cursor-pointer[type="button"]').click();
    cy.contains('Delete Contact').click();
    
    });
      cy.contains('Yes, Delete').click();
    
      });
    });


