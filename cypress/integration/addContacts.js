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
    cy.wait('@GetProjectContactsQuery').then((interception) => {
      contact.getContactInfo().should('be.visible')
    })
    contact.clickOnAddContactBtn()
    cy.get('h2').should('be.visible').and('have.text', 'Create Contact');
    cy.get('form').should('be.visible').find('div').then(div => {
      cy.wrap(div[0]).should('be.visible').and('have.text', 'Contact Name');
      cy.wrap(div[0]).find('input').should('have.attr', 'placeholder', 'Contact Name').and('have.value', '');
      cy.wrap(div[1]).should('be.visible').and('have.text', 'Email');
      cy.wrap(div[1]).find('input').should('have.attr', 'placeholder', 'Email').and('have.value', '');
      cy.wrap(div[2]).should('be.visible').and('have.text', 'Phone Number');
      cy.wrap(div[2]).find('input').should('have.attr', 'placeholder', 'Phone Number').and('have.value', '');
      cy.wrap(div[3]).should('be.visible').and('have.text', 'Position');
      cy.wrap(div[3]).find('input').should('have.attr', 'placeholder', 'Position').and('have.value', '');
    })
    cy.get('[type="submit"]').should('be.visible').and('have.text', 'Create New Contact');
  })

  it('Add initial contacts successfully', () => {
    cy.wait('@GetProjectContactsQuery').then((interception) => {
      contact.getContactInfo().should('be.visible')
    })
    contact.clickOnAddContactBtn()
    contact.fillContactForm('sondus test', 'sondus@gmail.com', '0595120666', 'test');
    contact.clickOnSubmitBtn()
    contact.checkConfirmatoinMsg('Contact added successfully')
    contact.checkContactCardInfo('sondus test', 'sondus@gmail.com', '0595120666', 'test','be.exist')

  });

  it('Add contact with duplicate name and phone number', () => {
    cy.wait('@GetProjectContactsQuery').then((interception) => {
      contact.getContactInfo().should('be.visible')
    });
    contact.clickOnAddContactBtn()
    contact.fillContactForm('sondus test', 'sondus@gmail.com', '0595120666', 'test');
    contact.clickOnSubmitBtn()
    contact.checkConfirmatoinMsg('The contact your trying to add already exists')

  })

  it('Add contact with duplicate phone number but different name', () => {
    cy.wait('@GetProjectContactsQuery').then((interception) => {
      contact.getContactInfo().should('be.visible')
    })
    contact.clickOnAddContactBtn()
    contact.fillContactForm('dup test', 'duptest@gmail.com', '0595120666', 'test');
    contact.clickOnSubmitBtn()
    cy.get('[role="dialog"]').should('be.visible');
    cy.contains('[role="dialog"] button', 'Add Contact').click();
    contact.checkConfirmatoinMsg('Contact added successfully')
    contact.checkContactCardInfo('dup test', 'duptest@gmail.com', '0595120666', 'test','be.exist')

  });

  it('Add a contact by filling just the required feilds and leave the optional feilds as empty', () => {
    cy.wait('@GetProjectContactsQuery').then((interception) => {
      contact.getContactInfo().should('be.visible')

    })
    contact.clickOnAddContactBtn()
    contact.fillContactForm('sondus Mohtest', '{selectall}{backspace}', '0595122211', '{selectall}{backspace}');
    contact.clickOnSubmitBtn()
    contact.checkConfirmatoinMsg('Contact added successfully')
    contact.checkContactCardInfo('sondus Mohtest',null, '0595122211', null,'be.exist')
  });
    it('Leave all the feilds empty', () => {
      cy.wait('@GetProjectContactsQuery').then((interception) => {
        contact.getContactInfo().should('be.visible')
      })
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
    
    it('Add contact with duplicate phone number but different name with cancel', () => {
      cy.wait('@GetProjectContactsQuery').then((interception) => {
      });
        contact.clickOnAddContactBtn()
      contact.fillContactForm('NotExist test', 'sondus2@gmail.com', '0595120666', 'test');
      contact.clickOnSubmitBtn()
      cy.get('[role="dialog"]').should('be.visible');
      cy.contains('[role="dialog"] button', 'Cancel').click();
      cy.get('[data-testid="close-button-dialog"]').click()
      cy.contains('NotExist test').should('not.exist');

    
    })

    it('Test Invalid data in the form', () => {
      cy.wait('@GetProjectContactsQuery').then((interception) => {
      })
        contact.clickOnAddContactBtn()
      contact.fillContactForm('sondus222', 'sondus2@', '0595122222111', 'test');
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
    let flag;
    cy.wait('@GetProjectContactsQuery').then((interception) => {
      contact.getContactInfo().should('be.visible')
      const projectContacts = interception.response.body.data.getProjectContacts;
      if (projectContacts && projectContacts.length > 0) {
        contact.clickOnAddContactBtn()
        contact.fillContactForm('Delete test', 'deletest@gmail.com', '0595124414', 'testDel');
          contact.clickOnSubmitBtn()
          contact.checkConfirmatoinMsg('Contact added successfully')
          contact.checkContactCardInfo('Delete test', 'deletest@gmail.com', '0595124414', 'testDel','be.exist')
          contact.getContactInfo().should('be.exist').each(($e1, index, $list) => {
            const text = $e1.text();
            if (text.includes("Delete test")) {
              cy.wrap($e1).find('.cursor-pointer[type="button"]').should('be.visible').click();
              $e1.find('.cursor-pointer[type="button"]').trigger('click');
              cy.contains('Delete Contact').click();
              cy.contains('Yes, Delete').click();
              flag=true;
            }
          });
      }
    })
    if(flag==true){
    contact.checkConfirmatoinMsg('Contact deleted successfully');
    contact.checkContactCardInfo('Delete test', 'deletest@gmail.com', '0595124414', 'testDel','not.exist')
    }
  });
});