import LoginPage from '../support/PageObjectModal/LoginPage.js';
describe('Login Test', () => {
  let testData;
  const loginPage = new LoginPage()
  beforeEach(function () {
    cy.fixture('example.json').then((data) => {
      testData = data;
      loginPage.visit();
      cy.viewport(1024, 768)
        });
  })

  it('should login with valid credentials', () => {
    loginPage.fillEmail(testData.correctEmail);
    loginPage.fillPassword(testData.correctPassword);
    loginPage.clickLoginButton();
    loginPage.getHeaderProject().should('be.visible');
  });

 it("should display an error message when the email doesn't exist in the system", () => {
    loginPage.fillEmail(testData.incorrectEmail);
    loginPage.fillPassword(testData.correctPassword);
    loginPage.clickLoginButton();
    loginPage.getErrorMsg().should('be.visible')
  });

  it('should display an error message with invalid password', () => {
    loginPage.fillEmail(testData.correctEmail);
    loginPage.fillPassword(testData.incorrectPassword);
    loginPage.clickLoginButton();
    loginPage.getErrorMsg().should('be.visible') 
  });
  it('should display an error message when entering empty email', () => {
    loginPage.fillPassword(testData.incorrectPassword);
    loginPage.clickLoginButton();
    loginPage.getErrorMsgForEmail().should('be.visible') 
    loginPage.getErrorMsgForEmail().should('have.text',"Required field is empty")
    loginPage.getEmailLabel().should('have.css', 'color', 'rgb(201, 8, 8)');
    loginPage.getLoginButton().should('be.disabled');

  });
  it('should display an error message when entering empty password', () => {
    loginPage.fillEmail(testData.correctEmail);
    loginPage.clickLoginButton();
    loginPage.getErrorMsgForPassword().should('be.visible') 
    loginPage.getErrorMsgForPassword().should('have.text',"Required field is empty")
   loginPage.getPasswordLabel().should('have.css', 'color', 'rgb(201, 8, 8)');
   loginPage.getLoginButton().should('be.disabled');
  });
  it('should display an error message when entering empty password and email', () => {
    loginPage.clickLoginButton();
    loginPage.getErrorMsgForPassword().should('be.visible') 
    loginPage.getErrorMsgForPassword().should('have.text',"Required field is empty")
   loginPage.getPasswordLabel().should('have.css', 'color', 'rgb(201, 8, 8)');
   loginPage.getErrorMsgForEmail().should('be.visible') 
   loginPage.getErrorMsgForEmail().should('have.text',"Required field is empty")
   loginPage.getEmailLabel().should('have.css', 'color', 'rgb(201, 8, 8)');
   loginPage.getLoginButton().should('be.disabled');
  });
  it('Test UI features', () => {
   loginPage.getLogoText().should('have.text', 'Earth force');
   loginPage.getLoginImage().should('exist');
   loginPage.getLoginTxt().should('have.text', 'Log In');
   loginPage.getForestImage().should('exist') .and('not.have.css', 'display', 'none') .and('be.visible');
  loginPage.getGreenBackgroundImg().should('have.css', 'background-color', 'rgb(44, 99, 65)');
  });
  it('Forget password with valid email', () => {
    loginPage.getForgetPasswordBtn().click()
    loginPage.getEmailForForgetPassFeild().type(testData.correctEmail);
    loginPage.getSendResetPassBtn().click();
    cy.contains('p.first-letter\\:capitalize', 'Reset password email has been sent');
  });
  it('Forget password with empty email', () => {
    loginPage.getForgetPasswordBtn().click()
    loginPage.getSendResetPassBtn().click();
    loginPage.getErrorMsgForgetPass().should('be.visible'). and('have.text', 'Please enter a valid email address')
    .and ('have.css', 'color', 'rgb(201, 8, 8)');
    loginPage.getSendResetPassBtn().should('be.disabled');
    loginPage.getEmailLabelForgetPass().should('have.css', 'color', 'rgb(201, 8, 8)');
  });
  it('Forget password with invalid email', () => {
    let isFirstIteration = true;
    loginPage.getForgetPasswordBtn().click()
    testData.invalidEmails.forEach(function(element) {
      loginPage.getEmailForForgetPassFeild().clear();
      loginPage.getEmailForForgetPassFeild().type(element);
      if (isFirstIteration) {
        loginPage.getSendResetPassBtn().click();
        isFirstIteration = false;
      }
      loginPage.getErrorMsgForgetPass().should('be.visible').and('have.text', 'Please enter a valid email address');
        });
  });

  it('Forget password with email that does not exist in the system', () => {
    loginPage.getForgetPasswordBtn().click()
    loginPage.getEmailForForgetPassFeild().type(testData.incorrectEmail);
    loginPage.getSendResetPassBtn().click();
    cy.contains('p.first-letter\\:capitalize', 'Something went wrong while sending the link, please check your email and try again later');
  });
  it('Entering invalid emails for a valid password', () => {
    loginPage.fillPassword(testData.correctPassword);
    let isFirstIteration = true;
    testData.invalidEmails.forEach(function(element) {
      loginPage.getEmailFeild().clear();
      loginPage.fillEmail(element);
      if (isFirstIteration) {
        loginPage.clickLoginButton();
        isFirstIteration = false;
      }
      loginPage.getErrorMsgForEmail().should('be.visible');
    });

});

});