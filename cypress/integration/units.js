import Overview from '../support/PageObjectModal/Overview.js';
import UnitsPage from '../support/PageObjectModal/UnitsPage.js';


describe('Units Tests', () => {
    const overview = new Overview()
    const unitsPage = new UnitsPage()
    beforeEach(() => {
        cy.login();
        cy.wait(5000)
        cy.intercept('POST', 'https://api.dev.earthforce.io/portal/main-api', (req) => {
            if (req.body && req.body.operationName === "GetProjectUnits") {
                req.alias = 'GetProjectUnitsQuery';
            }
        });
        cy.visit('/overview')
        overview.getMapMArker().eq(0).click();
        cy.get('[data-testid="tab-units"]').click();
    });

    it('Test Units data', () => {
        let unitsNumber = 0;
        cy.wait('@GetProjectUnitsQuery').then((interception) => {
            const projectUnits = interception.response.body.data.getProjectUnits;
            if (projectUnits && projectUnits.length > 0) {
                unitsPage.goToUnits().each(($unit) => {
                    const unitName = $unit.find('[data-testid="unit-name"]').text();
                    const unitData = projectUnits.find(unit => unit.unitName === unitName);
                    if (unitData) {
                        cy.get('[data-testid="unit-total"]').contains(unitsPage.customRound(unitData.unitProgress.totalAcres) + " acres")
                        cy.get('[data-testid="unit-status"]').contains(new RegExp(unitData.status, 'i'));
                        cy.get('[data-testid="unit-project-name"]').contains(unitData.project.projectName);
                        cy.get('[data-testid="unit-card-divider"]').should('be.exist')
                        cy.get('[data-testid="unit-progress"]').should('be.exist')
                        cy.get('[data-testid="unit-menu-button"]').should('be.exist')
                        cy.get('[data-testid="save-unit-button"]').should('be.exist')
                        cy.contains("Completion").should('be.exist')
                        cy.contains("Unit Total").should('be.exist')
                        cy.get($unit).find('[data-testid="unit-completion"]').find('p').then(p => {
                            cy.wrap(p[0]).should('be.visible').and('have.text', parseFloat(unitData.unitProgress.completedAcres.toFixed(2)) + " acres");
                            cy.wrap(p[1]).should('be.visible').and('have.text', "(" + unitsPage.convertToPercentage(unitData.unitProgress.progress) + "%)");

                        });
                        unitsNumber++;
                    } else {
                        cy.log(`Unit data not found for unit: ${unitName}`);
                    }
                });
                unitsPage.goToUnits().should('be.visible').then(($units) => {
                    expect(unitsNumber).to.equal(projectUnits.length);
                });
            }
        });
    });
    it('Test Saved Units', () => {
        let unitName;
        cy.wait('@GetProjectUnitsQuery').then((interception) => {
            const projectUnits = interception.response.body.data.getProjectUnits;
            if (projectUnits && projectUnits.length > 0) {
                const firstUnit = projectUnits[0];
                unitName = firstUnit.unitName;
                cy.intercept('POST', 'https://api.dev.earthforce.io/portal/main-api', (req) => {
                    if (req.body && req.body.operationName === "GetSavedUnits") {
                        req.alias = 'GetSavedUnitsQuery';
                    }
                })
                cy.contains('[data-testid="unit-name"]', unitName).then($unitName => {
                    const button = $unitName.closest('[data-testid="go-to-unit"]').find('[data-testid="save-unit-button"]');
                    cy.wrap(button).click().as('clickedButton');
                });
                cy.visit('/saved');
                cy.wait('@GetSavedUnitsQuery').then((res) => {
                    const savedUnits = res.response.body.data.getSavedUnits;
                    if (savedUnits && savedUnits.length > 0) {
                        cy.contains(unitName).should('be.exist')
                    }
                })
            }
        });
    });
    

});
