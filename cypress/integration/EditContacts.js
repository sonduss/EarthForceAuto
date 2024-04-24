import Overview from '../support/PageObjectModal/Overview.js';

describe('Contacts Tests', () => {
  const overview = new Overview()
  beforeEach(() => {
    cy.login();
    cy.wait(5000)
    overview.getMapMArker().eq(0).click();
   cy.get('[data-testid="tab-contacts"]').click();
  });
  it('Edit Name and Phone number with valid data',() =>{
    cy.wait(4000)
    cy.get('[data-testid="contact-info"]').should('exist').then(() => {
      cy.get('[data-testid="contact-info"]').first().find('.cursor-pointer[type="button"]').click();
      cy.contains('Edit Contact').click();
      cy.get('form').should('be.visible').find('div').then(div => {
        cy.wait(1000)
        cy.wrap(div[0]).find('input').type('SondusEdit');
        cy.wrap(div[2]).find('input').type('0595120688');
  
      });
    });
  })
})