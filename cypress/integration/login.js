describe('Login Test', () => {
    it('should login with valid credentials', () => {
      cy.visit('https://portal.dev.earthforce.io/portal/overview');
      cy.get('#\\:r0\\:\\-form\\-item').type("muathmoh8+1@gmail.com");
      cy.get('#\\:r1\\:-form-item').type("Earth@1234");
      cy.get('.inline-flex').click();
      cy.get('.text-white.text-xl').should('be.visible');
    });
  
});
