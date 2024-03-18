class LoginPage
{
    setData(data) {
        this.data = data;
      }

    visit() {
        cy.visit('https://portal.dev.earthforce.io/portal/overview');
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
       return cy.get('.text-white.text-xl');
      }
      getErrorMsg(){
        return cy.get('.ml-4')
      }
    }

export default LoginPage;
