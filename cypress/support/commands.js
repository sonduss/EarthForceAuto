// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --


Cypress.Commands.add('login', () => {
cy.visit("/")
cy.get('#\\:r0\\:\\-form\\-item').type("muathmoh8+1@gmail.com");
cy.get('#\\:r1\\:-form-item').type("Earth@1234");
cy.get('.inline-flex').click();



})
Cypress.Commands.add('LoginAPITest', () => {
cy.request("https://api.dev.earthforce.io/portal/user-api", {
"query": "\n \n fragment UserPermissionsFragment on User {\n permissions {\n id\n projectId\n projectName\n userId\n role\n unitIds\n }\n }\n\n\n query UserLogin($email: String!, $password: String!) {\n userLogin(email: $email, password: $password) {\n user {\n id\n firstName\n lastName\n email\n type\n status\n token\n trackToken\n ...UserPermissionsFragment\n company {\n id\n logo\n name\n type\n }\n }\n errorMessage\n }\n }\n",
"variables": {
"email": "muathmoh8+1@gmail.com",
"password": "Earth@1234"
},
"operationName": "UserLogin"
}).then(function (response) {
const token=response.body.data.userLogin.user.token;
console.log("Token received:", token);
return token;
});
});

Cypress.Commands.add('getProjectID',() => {
cy.url().then(url => {
const uuidRegex = /[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}/i;
const match = url.match(uuidRegex);
const uuid = match && match[0];
console.log(uuid);
return uuid;
});
})





//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })