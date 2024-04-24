import Overview from '../support/PageObjectModal/Overview.js';

describe('Contacts Tests', () => {
  const overview = new Overview()
  beforeEach(() => {
    cy.login();
    cy.wait(5000)
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
     // cy.wrap(div[0]).find('input').find('placeholder').should('be.visible').and('eq', 'Contact Name');
    })
  })
  /*
  it('Successfully adds a new contact by filling all the fields', () => {
    cy.contains('button', 'Add Contact').click();
    cy.fillContactForm('sondus Moh', 'sondus@gmail.com', '0595122222', 'test');
    cy.get('[type="submit"]').click();
    cy.wait(3000)
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain("Contact Added Successfully");
    });
  
    cy.get('[data-testid="contact-info"]').eq(0).should('be.visible').within(() => {
      cy.contains('sondus Moh').should('be.visible');
      cy.contains('sondus@gmail.com').should('be.visible');
      cy.contains('0595122222').should('be.visible');
      cy.contains('test').should('be.visible');
    });
  });
  it('Successfully adds a new contact by filling just the required feilds and leave the optional feilds as empty', () => {
    cy.contains('button', 'Add Contact').click();
    cy.fillContactForm('sondus Mohtest', '{selectall}{backspace}', '0595122211', '{selectall}{backspace}');
    cy.get('[type="submit"]').click();
    cy.wait(3000)
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain("Contact Addeggggd Successfully");
    });
    cy.get('[data-testid="contact-info"]').eq(0).should('be.visible').within(() => {
      cy.contains('sondus Mohtest').should('be.visible');
      cy.contains('0595122211').should('be.visible');
    });
  });
  /*
  it('Leave all the feilds empty',()=>{
    cy.wait(3000)
    cy.contains('button', 'Add Contact').click();
    cy.get('[type="submit"]').click();
    cy.wait(3000)
    cy.get('form').should('be.visible').find('div').then(div => {
    cy.wrap(div[0]).find('p').should('be.visible').and('have.text','first name must be at least 3 characters').and('have.class','text-destructive');
    cy.wrap(div[0]).find('label').should('be.visible').and('have.class','text-destructive');
    cy.wrap(div[2]).find('p').should('be.visible').and('have.text','Invalid phone number').and('have.class','text-destructive');
    cy.wrap(div[2]).find('label').should('be.visible').and('have.class','text-destructive');
    cy.get('[type="submit"]').should('be.disabled');
    })

  })
   it('Leave name feilds empty',()=>{
    cy.wait(3000)
    cy.contains('button', 'Add Contact').click();
    cy.fillContactForm('{selectall}{backspace}', 'sondus@gmail.com', '0595122222', 'test');
    cy.get('[type="submit"]').click();
    cy.wait(3000)
    cy.get('form').should('be.visible').find('div').then(div => {
    cy.wrap(div[0]).find('p').should('be.visible').and('have.text','first name must be at least 3 characters').and('have.class','text-destructive');
    cy.wrap(div[0]).find('label').should('be.visible').and('have.class','text-destructive');
    cy.get('[type="submit"]').should('be.disabled');
    })

  })
  it('Leave phone feild empty',()=>{
    cy.wait(3000)
    cy.contains('button', 'Add Contact').click();
    cy.fillContactForm('sondusTesting', 'sondus@gmail.com', '{selectall}{backspace}', 'test');
    cy.get('[type="submit"]').click();
    cy.wait(3000)
    cy.get('form').should('be.visible').find('div').then(div => {
      cy.wrap(div[2]).find('p').should('be.visible').and('have.text','Invalid phone number').and('have.class','text-destructive');
      cy.wrap(div[2]).find('label').should('be.visible').and('have.class','text-destructive');
      cy.get('[type="submit"]').should('be.disabled');
    })

  })*/


  /*it('Tries to add a contact with duplicate name and phone number', () => {
    cy.contains('button', 'Add Contact').click();
    cy.fillContactForm('sondus Moh', 'sondus2@gmail.com', '0595122222', 'test');
    cy.get('[type="submit"]').click();
    cy.wait(3000)
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain("The contact you're trying to add already exists");
    });
  });

  it('Tries to add a contact with duplicate phone number but different name', () => {
    cy.wait(4000)
    cy.contains('button', 'Add Contact').click();
    cy.fillContactForm('sondus test', 'sondus2@gmail.com', '0595122222', 'test');
    cy.get('[type="submit"]').click();
    cy.wait(3000)
    cy.get('[role="dialog"]').should('be.visible');
    cy.contains('[role="dialog"] button', 'Add Contact').click();
    cy.wait(3000)
        cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain("Contact Added Successfully");
    });
  });
it('Tries to add a contact with duplicate phone number but different name with cancel', () => {
    cy.wait(4000)
    cy.contains('button', 'Add Contact').click();
    cy.fillContactForm('sondus test', 'sondus2@gmail.com', '0595122222', 'test');
    cy.get('[type="submit"]').click();
    cy.wait(3000)
    cy.get('[role="dialog"]').should('be.visible');
    cy.contains('[role="dialog"] button', 'Cancel').click();
    cy.get('[data-testid="close-button-dialog"]').click()
  });
  
  it('Test Invalid data in the form',()=>{
    cy.wait(4000)
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
})*/




  /*it('Deletes a contact successfully', () => {
    cy.get('[data-testid="contact-info"]').should('exist').then(() => {
      cy.get('[data-testid="contact-info"]').first().find('.cursor-pointer[type="button"]').click();
      cy.contains('Delete Contact').click();
    });
    cy.contains('Yes, Delete').click();
  });*/

  
});
