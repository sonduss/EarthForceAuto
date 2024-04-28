class Contact {


    clickOnAddContactBtn() {
        cy.contains('button', 'Add Contact').click();
    }
    clickOnSubmitBtn() {
        cy.get('[type="submit"]').should('be.visible').click();
    }
    checkConfirmatoinMsg(message) {
        cy.get('[role="status"]').each(($status) => {
            cy.wrap($status).within(() => {
                cy.contains(message).should('be.visible');
            });
        });
    }
    getContactInfo(){
        return cy.get('[data-testid="contact-info"]').should('exist')
    }

}

export default Contact;
