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
    checkContactCardInfo(name, email = null, phone, position = null, property) {
        cy.get('[data-testid="contact-info"]').should('exist')
        cy.contains(name).should(property);
        if (email !== null) {
            cy.contains(email).should(property);
        }
        if (position !== null) {
            cy.contains(position).should(property);
        }
        cy.contains(phone).should(property);

    }
    deleteContact(name) {
        return this.getContactInfo().should('be.exist').then(() => {
            let flag = false;
            cy.get('[data-testid="contact-info"]').each(($e1, index, $list) => {
                const text = $e1.text();
                if (text.includes(name)) {
                    cy.wrap($e1).find('.cursor-pointer[type="button"]').should('be.visible').click();
                    cy.contains('Delete Contact').click();
                    cy.contains('Yes, Delete').click();
                    flag = true;
                    return false;
                }
            }).then(() => {
                return flag;
            });
        });
    }
    CheckContactInfoVisibility() {
        cy.wait('@GetProjectContactsQuery').then((interception) => {
            const projectContacts = interception.response.body.data.getProjectContacts;
            if (projectContacts && projectContacts.length > 0) {
                for (let i = 0; i < projectContacts.length; i++) {
                    const contacts = projectContacts[i];
                    if (contacts.units && contacts.units.length === 0) {
                        this.getContactInfo().should('be.visible')
                        return;
                    }
                    else {
                        cy.contains('No Contacts Found').should('be.exist')
                    }
                }
            }
            else {
                cy.contains('No Contacts Found').should('be.exist')
            }
        });
    }

}



export default Contact;
