class LoginPage
{
    setData(data) {
        this.data = data;
      }

    visit() {
        cy.visit('/');
      }
    
      fillEmail(email) {
        cy.get('#\\:r0\\:\\-form\\-item').type(email);
      }
    
      fillPassword(password) {
        cy.get('#\\:r1\\:-form-item').type(password);
      }
    
      clickLoginButton() {
        cy.get('.inline-flex').click();
      }
      getHeaderProject() {
       return cy.get('.uppercase');
      }
      getErrorMsg(){
        return cy.get('.ml-4')
      }
      getEmailFeild(){
        return cy.get('#\\:r0\\:\\-form\\-item')
      }
      getErrorMsgForEmail(){
        return cy.get('#\\:r0\\:-form-item-message');
      }
      getEmailLabel(){
        return cy.get(':nth-child(2) > .leading-none')
      }
      getLoginButton(){
        return cy.get('.inline-flex');
      }
      getErrorMsgForPassword(){
        return cy.get('#\\:r1\\:-form-item-message');
      }
      getPasswordLabel(){
        return cy.get(':nth-child(3) > .leading-none')
      }
      getLogoText(){
        return cy.get('div.flex > img.w-7[src="/assets/earthforce-logo-white-05f857cf.svg"] + p.uppercase.text-lg.ml-2.font-bold.tracking-wide')
      }
      getLoginImage(){
        return cy.get('div.flex > img.w-7[src="/assets/earthforce-logo-white-05f857cf.svg"]')
      }
      getLoginTxt(){
        return cy.get('.text-2xl')
      }
      getForestImage(){
        return cy.get('div.hidden.lg\\:flex.lg\\:w-\\[50\\%\\] img[src="/assets/forest_img-21644cfb.png"]')
      }
      getGreenBackgroundImg(){
        return cy.get('.bg-secondary')
      }
      getForgetPasswordBtn(){
        return cy.get('.underline')
      }
      getEmailForForgetPassFeild(){
        return cy.get('[data-testid="email-input-reset-pass"]');
      }
      getSendResetPassBtn(){
        return cy.get('button[data-testid="send-btn-reset-pass"]');
      }
      getErrorMsgForgetPass(){
        return cy.get('#\\:r5\\:-form-item-message')
      }
      getEmailLabelForgetPass(){
        return cy.get('[data-testid="email-label-reset-pass"]')
      }
    }

export default LoginPage;
