import Contact from '../support/PageObjectModal/Contact.js';
import Overview from '../support/PageObjectModal/Overview.js';

describe('Contacts Tests', () => {
  const overview = new Overview()
  const contact = new Contact()
  beforeEach(() => {
    cy.login();
    cy.wait(5000)
    cy.intercept('POST', 'https://api.dev.earthforce.io/portal/main-api', (req) => {
      if (req.body && req.body.operationName === "GetProjectContacts") {
        req.alias = 'GetProjectContactsQuery';
      }
    });
    overview.getMapMArker().eq(0).click();
    cy.get('[data-testid="tab-contacts"]').click();
  });


  it('Design tests', () => {
    contact.clickOnAddContactBtn()
    cy.get('form').should('be.visible').find('div').then(div => {
      cy.wrap(div[0]).should('be.visible').and('have.text', 'Contact Name');
      cy.wrap(div[1]).should('be.visible').and('have.text', 'Email');
      cy.wrap(div[2]).should('be.visible').and('have.text', 'Phone Number');
      cy.wrap(div[3]).should('be.visible').and('have.text', 'Position');
      cy.get('h2').should('be.visible').and('have.text', 'Create Contact');
      cy.get('[type="submit"]').should('be.visible').and('have.text', 'Create New Contact');



    })
  })

  it('Add initial contacts successfully', () => {
    contact.clickOnAddContactBtn()
    cy.fillContactForm('sondus Moh', 'sondus@gmail.com', '0595122222', 'test');
    contact.clickOnSubmitBtn()
    contact.checkConfirmatoinMsg('Contact added successfully')
    cy.get('[data-testid="contact-info"]').eq(0).should('be.visible').within(() => {
      cy.contains('sondus Moh').should('be.visible');
      cy.contains('sondus@gmail.com').should('be.visible');
      cy.contains('0595122222').should('be.visible');
      cy.contains('test').should('be.visible');

    })
  });
  it('Add contact with duplicate name and phone number', () => {
    contact.getContactInfo()
    contact.clickOnAddContactBtn()
    cy.fillContactForm('sondus Moh', 'sondus@gmail.com', '0595122222', 'test');
    contact.clickOnSubmitBtn()
    contact.checkConfirmatoinMsg('The contact your trying to add already exists')
  });

  it('Add contact with duplicate phone number but different name', () => {
    contact.getContactInfo()
    contact.clickOnAddContactBtn()
    cy.fillContactForm('sondus test', 'sondus2@gmail.com', '0595122222', 'test');
    contact.clickOnSubmitBtn()
    cy.get('[role="dialog"]').should('be.visible');
    cy.contains('[role="dialog"] button', 'Add Contact').click();
    contact.checkConfirmatoinMsg('Contact added successfully')

  });

  it('Add a contact by filling just the required feilds and leave the optional feilds as empty', () => {
    contact.getContactInfo()
    contact.clickOnAddContactBtn()
    cy.fillContactForm('sondus Mohtest', '{selectall}{backspace}', '0595122211', '{selectall}{backspace}');
    contact.clickOnSubmitBtn()
    contact.checkConfirmatoinMsg('Contact added successfully')

  });

  it('Leave all the feilds empty', () => {
    contact.getContactInfo()
    contact.clickOnAddContactBtn()
    contact.clickOnSubmitBtn()
    cy.get('form').should('be.visible').find('div').then(div => {
      cy.wrap(div[0]).find('p').should('be.visible').and('have.text', 'first name must be at least 3 characters').and('have.class', 'text-destructive');
      cy.wrap(div[0]).find('label').should('be.visible').and('have.class', 'text-destructive');
      cy.wrap(div[2]).find('p').should('be.visible').and('have.text', 'Invalid phone number').and('have.class', 'text-destructive');
      cy.wrap(div[2]).find('label').should('be.visible').and('have.class', 'text-destructive');
      cy.get('[type="submit"]').should('be.disabled');
    })

  })
  it('Leave name feilds empty', () => {
    contact.getContactInfo()
    contact.clickOnAddContactBtn()
    cy.fillContactForm('{selectall}{backspace}', 'sondus@gmail.com', '0595122222', 'test');
    contact.clickOnSubmitBtn()
    cy.get('form').should('be.visible').find('div').then(div => {
      cy.wrap(div[0]).find('p').should('be.visible').and('have.text', 'first name must be at least 3 characters').and('have.class', 'text-destructive');
      cy.wrap(div[0]).find('label').should('be.visible').and('have.class', 'text-destructive');
      cy.get('[type="submit"]').should('be.disabled');
    })
  })
  it('Leave phone feild empty', () => {
    contact.getContactInfo()
    contact.clickOnAddContactBtn()
    cy.fillContactForm('sondusTesting', 'sondus@gmail.com', '{selectall}{backspace}', 'test');
    contact.clickOnSubmitBtn()
    cy.get('form').should('be.visible').find('div').then(div => {
      cy.wrap(div[2]).find('p').should('be.visible').and('have.text', 'Invalid phone number').and('have.class', 'text-destructive');
      cy.wrap(div[2]).find('label').should('be.visible').and('have.class', 'text-destructive');
      cy.get('[type="submit"]').should('be.disabled');
    })
  })
  it('Add contact with duplicate phone number but different name with cancel', () => {
    contact.getContactInfo()
    contact.clickOnAddContactBtn()
    cy.fillContactForm('sondus test', 'sondus2@gmail.com', '0595122222', 'test');
    contact.clickOnSubmitBtn()
    cy.get('[role="dialog"]').should('be.visible');
    cy.contains('[role="dialog"] button', 'Cancel').click();
    cy.get('[data-testid="close-button-dialog"]').click()
  });

  it('Test Invalid data in the form', () => {
    contact.getContactInfo()
    contact.clickOnAddContactBtn()
    cy.fillContactForm('sondus222', 'sondus2@', '0595122222111', 'test');
    contact.clickOnSubmitBtn()
    cy.get('form').should('be.visible').find('div').then(div => {
      cy.wrap(div[0]).find('p').should('be.visible').and('have.text', 'Invalid').and('have.class', 'text-destructive');
      cy.wrap(div[0]).find('label').should('be.visible').and('have.class', 'text-destructive');
      cy.wrap(div[1]).find('p').should('be.visible').and('have.text', 'Please enter a valid email address').and('have.class', 'text-destructive');
      cy.wrap(div[1]).find('label').should('be.visible').and('have.class', 'text-destructive');
      cy.wrap(div[2]).find('p').should('be.visible').and('have.text', 'Invalid phone number').and('have.class', 'text-destructive');
      cy.wrap(div[2]).find('label').should('be.visible').and('have.class', 'text-destructive');
      cy.get('[type="submit"]').should('be.disabled');
    })
  })
  it('Deletes a contact successfully', () => {
    cy.wait('@GetProjectContactsQuery').then((interception) => {
      const projectContacts = interception.response.body.data.getProjectContacts;
      if (projectContacts && projectContacts.length > 0) {
        contact.getContactInfo().then(() => {
          cy.get('[data-testid="contact-info"]').first().find('.cursor-pointer[type="button"]').click();
          cy.contains('Delete Contact').click();
        });
        cy.contains('Yes, Delete').click();
        contact.checkConfirmatoinMsg('Contact deleted successfully')

      }
    });
  });
});