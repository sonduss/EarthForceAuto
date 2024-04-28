import Overview from '../support/PageObjectModal/Overview.js';

describe('Contacts Tests', () => {
  const overview = new Overview()
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


 it('Add Contacts Design tests', () => {
    cy.contains('button', 'Add Contact').should('be.visible').click();
    cy.wait(2000) 
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
    cy.wait(1000)
    cy.wait('@GetProjectContactsQuery').then((interception) => {
      const projectContacts = interception.response.body.data.getProjectContacts;
      if (projectContacts && projectContacts.length == 0) {

        cy.contains('button', 'Add Contact').click();
        cy.fillContactForm('sondus Moh', 'sondus@gmail.com', '0595122222', 'test');
        cy.get('[type="submit"]').click();
        cy.get('[role="status"]').each(($status) => {
          cy.wrap($status).within(() => {
            cy.contains('Contact added successfully').should('be.visible');
          });
        });         
        cy.get('[data-testid="contact-info"]').eq(0).should('be.visible').within(() => {
          cy.contains('sondus Moh').should('be.visible');
          cy.contains('sondus@gmail.com').should('be.visible');
          cy.contains('0595122222').should('be.visible');
          cy.contains('test').should('be.visible');
        });
      }
    }) 
    });
    it('Add contact with duplicate name and phone number', () => {
      cy.contains('button', 'Add Contact').click();
      cy.fillContactForm('sondus Moh', 'sondus@gmail.com', '0595122222', 'test');
      cy.get('[type="submit"]').click();
      cy.get('[role="status"]').each(($status) => {
        cy.wrap($status).within(() => {
          cy.contains("The contact your trying to add already exists").should('be.visible');
        });     
    });
  });
    it('Add contact with duplicate phone number but different name', () => {
      cy.contains('button', 'Add Contact').click();
      cy.fillContactForm('sondus test', 'sondus2@gmail.com', '0595122222', 'test');
      cy.get('[type="submit"]').click();
      cy.wait(1000)
      cy.get('[role="dialog"]').should('be.visible');
      cy.contains('[role="dialog"] button', 'Add Contact').click();
      cy.get('[role="status"]').each(($status) => {
        cy.wrap($status).within(() => {
          cy.contains('Contact added successfully').should('be.visible');
        });
      });
    });
  it('Add a contact by filling just the required feilds and leave the optional feilds as empty', () => {
    cy.contains('button', 'Add Contact').click();
    cy.fillContactForm('sondus Mohtest', '{selectall}{backspace}', '0595122211', '{selectall}{backspace}');
    cy.get('[type="submit"]').click();
    cy.get('[role="status"]').each(($status) => {
      cy.wrap($status).within(() => {
        cy.contains('Contact added successfully').should('be.visible');
      });
    });
  });
 
  it('Leave all the feilds empty',()=>{
    cy.contains('button', 'Add Contact').click();
    cy.get('[type="submit"]').click();
    cy.get('form').should('be.visible').find('div').then(div => {
    cy.wrap(div[0]).find('p').should('be.visible').and('have.text','first name must be at least 3 characters').and('have.class','text-destructive');
    cy.wrap(div[0]).find('label').should('be.visible').and('have.class','text-destructive');
    cy.wrap(div[2]).find('p').should('be.visible').and('have.text','Invalid phone number').and('have.class','text-destructive');
    cy.wrap(div[2]).find('label').should('be.visible').and('have.class','text-destructive');
    cy.get('[type="submit"]').should('be.disabled');
    })

  })
   it('Leave name feilds empty',()=>{
    cy.contains('button', 'Add Contact').click();
    cy.fillContactForm('{selectall}{backspace}', 'sondus@gmail.com', '0595122222', 'test');
    cy.get('[type="submit"]').click();
    cy.get('form').should('be.visible').find('div').then(div => {
    cy.wrap(div[0]).find('p').should('be.visible').and('have.text','first name must be at least 3 characters').and('have.class','text-destructive');
    cy.wrap(div[0]).find('label').should('be.visible').and('have.class','text-destructive');
    cy.get('[type="submit"]').should('be.disabled');
    })
  })
  it('Leave phone feild empty',()=>{
    cy.contains('button', 'Add Contact').click();
    cy.fillContactForm('sondusTesting', 'sondus@gmail.com', '{selectall}{backspace}', 'test');
    cy.get('[type="submit"]').click();
    cy.get('form').should('be.visible').find('div').then(div => {
      cy.wrap(div[2]).find('p').should('be.visible').and('have.text','Invalid phone number').and('have.class','text-destructive');
      cy.wrap(div[2]).find('label').should('be.visible').and('have.class','text-destructive');
      cy.get('[type="submit"]').should('be.disabled');
    })
  })
it('Add contact with duplicate phone number but different name with cancel', () => {
    cy.contains('button', 'Add Contact').click();
    cy.fillContactForm('sondus test', 'sondus2@gmail.com', '0595122222', 'test');
    cy.get('[type="submit"]').click();
    cy.get('[role="dialog"]').should('be.visible');
    cy.contains('[role="dialog"] button', 'Cancel').click();
    cy.get('[data-testid="close-button-dialog"]').click()
  });
  it('Test Invalid data in the form',()=>{
    cy.contains('button', 'Add Contact').click();
    cy.fillContactForm('sondus222', 'sondus2@', '0595122222111', 'test');
    cy.get('[type="submit"]').click();
    cy.get('form').should('be.visible').find('div').then(div => {
      cy.wait(1000)
      cy.wrap(div[0]).find('p').should('be.visible').and('have.text','Invalid').and('have.class','text-destructive');
      cy.wrap(div[0]).find('label').should('be.visible').and('have.class','text-destructive');  
      cy.wrap(div[1]).find('p').should('be.visible').and('have.text','Please enter a valid email address').and('have.class','text-destructive');
      cy.wrap(div[1]).find('label').should('be.visible').and('have.class','text-destructive');  
    cy.wrap(div[2]).find('p').should('be.visible').and('have.text','Invalid phone number').and('have.class','text-destructive');
    cy.wrap(div[2]).find('label').should('be.visible').and('have.class','text-destructive');
    cy.get('[type="submit"]').should('be.disabled');
  })
})
  it('Deletes a contact successfully', () => {
    cy.wait(1000)
    cy.wait('@GetProjectContactsQuery').then((interception) => {
      const projectContacts = interception.response.body.data.getProjectContacts;
      if (projectContacts && projectContacts.length > 0) {
        cy.get('[data-testid="contact-info"]').should('exist').then(() => {
      cy.get('[data-testid="contact-info"]').first().find('.cursor-pointer[type="button"]').click();
      cy.contains('Delete Contact').click();
    });
    cy.contains('Yes, Delete').click();
    cy.get('[role="status"]').each(($status) => {
      cy.wrap($status).within(() => {
        cy.contains('Contact deleted successfully').should('be.visible');
      });
    });
  }
});
});
});