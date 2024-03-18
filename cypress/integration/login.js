/// <reference types="Cypress" />
import LoginPage from 'C:/Users/sabughdaib/EarthForceAuto/cypress/support/PageObjectModal/LoginPage.js';
import example from '../fixtures/example.json'


describe('Login Test', () => {
  let testData;
  const loginPage = new LoginPage()
  beforeEach(function () {
    cy.fixture('example.json').then((data) => {
      testData = data;
      loginPage.visit();
    });
  })

  it('should login with valid credentials', () => {
    loginPage.fillEmail(testData.correctEmail);
    loginPage.fillPassword(testData.correctPassword);
    loginPage.clickLoginButton();
    loginPage.getHeaderProject().should('be.visible');
  });

  it('should display an error message with invalid email', () => {
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
});
