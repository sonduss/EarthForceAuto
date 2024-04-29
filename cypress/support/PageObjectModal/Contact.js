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
    getContactInfo() {
        return cy.get('[data-testid="contact-info"]');
    }
    fillContactForm(name, email, phoneNumber, position) {
        cy.get('form').should('be.visible').find('div').then(div => {
          cy.wrap(div[0]).find('input').clear().type(name);
          cy.wrap(div[1]).find('input').clear().type(email);
          cy.wrap(div[2]).find('input').clear().type(phoneNumber);
          cy.wrap(div[3]).find('input').clear().type(position);
        });
    }
    checkContactCardInfo(name, email = null,phone, position = null) {
        cy.get('[data-testid="contact-info"]').should('exist')
        cy.contains(name).should('be.exist');
        if (email !== null) {
            cy.contains(email).should('be.exist');
        }
        if (position !== null) {
            cy.contains(position).should('be.exist');
        }
        cy.contains(phone).should('be.exist');
       
    }
    checkContactCardNotExistInfo(name, email = null,phone, position = null) {
        cy.contains(name).should('not.exist');
        if (email !== null) {
            cy.contains(email).should('not.exist');
        }
        if (position !== null) {
            cy.contains(position).should('not.exist');
        }
        cy.contains(phone).should('not.exist');
       
    }






}

export default Contact;
