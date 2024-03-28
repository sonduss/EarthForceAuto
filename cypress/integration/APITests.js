import Overview from '../support/PageObjectModal/Overview.js';

describe('API Test', () => {
    const overview = new Overview()
    let UUID;
    let token;
    let marketText=[];
    it('Login API Test', () => {
        cy.login().then(function(){
            overview.getMapMArker().each(($marker, index, $markers) => {
                const name = $marker.find('p').eq(0).text(); // Assuming you extract the name from the marker
                marketText.push(name);
              });});
        cy.request("https://api.dev.earthforce.io/portal/user-api", {
            "query": "\n  \n  fragment UserPermissionsFragment on User {\n    permissions {\n      id\n      projectId\n      projectName\n      userId\n      role\n      unitIds\n    }\n  }\n\n\n  query UserLogin($email: String!, $password: String!) {\n    userLogin(email: $email, password: $password) {\n      user {\n        id\n        firstName\n        lastName\n        email\n        type\n        status\n        token\n        trackToken\n        ...UserPermissionsFragment\n        company {\n          id\n          logo\n          name\n          type\n        }\n      }\n      errorMessage\n    }\n  }\n",
            "variables": {
                "email": "muathmoh8+1@gmail.com",
                "password": "Earth@1234"
            },
            "operationName": "UserLogin"
        }).then(function (response) {
            UUID=response.body.data.userLogin.user.id;
            token=response.body.data.userLogin.user.token;
            expect(response.status).to.eq(200)
            expect(response.body.data.userLogin.user.email).to.equal('muathmoh8+1@gmail.com');
            expect(response.body.data.userLogin.user.status).to.equal('ACTIVE');
            expect(response.body.data.userLogin.user.token).to.not.be.null;
            expect(response.body.data.userLogin.user.id).to.not.be.null;
        });
    });
    it('Get All Overview API Test', () => {
        const query = `
        query GetAllOverview($userUUID: String!) {
          getAllOverview(userUUID: $userUUID) {
            id
            projectName
            status
            startDate
            endDate
          }
        }
      `;
    const variables = {
        userUUID: UUID
      };
      cy.request({
        method: 'POST',
        url: 'https://api.dev.earthforce.io/portal/main-api',
        body: {
          query,
          variables
        }, 
        headers: {
          Authorization: token
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.have.property('getAllOverview');
            response.body.data.getAllOverview.forEach((project) => {
                if (project.status === 'ACTIVE') {
                    const projectName = project.projectName;
                    cy.wrap(marketText).should('include', projectName);         
                }
      });
    });
  });
});

