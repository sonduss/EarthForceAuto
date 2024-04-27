import Overview from '../support/PageObjectModal/Overview.js';
import ProjectPage from '../support/PageObjectModal/ProjectPage.js';

describe('Project Page Tests', () => {
    const overview = new Overview();
    const project = new ProjectPage();

    beforeEach(() => {
        cy.viewport(1024, 768);
        cy.login();
    });
    it('Project Metrics Page', () => {
        cy.wait(1000);
        cy.intercept('POST', Cypress.env('CYPRESS_ENVIRONMENT') === 'production' ? Cypress.env('baseUrlProd') : Cypress.env('baseUrlDev'), (req) => {
            if (req.body && req.body.operationName === "GetProjectMetrics") {
                req.alias = 'getProjectMetricsQuery';
            }
        })
        overview.getMapMArker().should('exist').then(marker => {
            cy.wrap(marker).find('p').eq(0).should('exist').then(paragraph => {
                const markerText = paragraph.text();
                overview.getMapMArker().eq(0).click();
                project.getProjectHeader().invoke('text').then(text => {
                    expect(text).to.equal(markerText);
                });
                project.getProjectName().invoke('text').then(projectName => {
                    expect(projectName).to.equal(markerText);
                });
                project.progressCard().should('be.visible');          
            });
        });
        cy.wait('@getProjectMetricsQuery').then((interception) => {
            const projectMetrics = interception.response.body.data.getProjectMetrics;
            expect(interception.response.statusCode).to.eq(200);
            cy.wait(5000)
            project.getActualtotalAcres().should('be.visible').find('p').then(p => {
                cy.wrap(p[0]).should('be.visible').and('have.text', parseInt(projectMetrics.totalAcres.totalAcres))
                cy.wrap(p[1]).should('be.visible').and('have.text', "Total Acres");
                if (parseFloat(projectMetrics.totalAcres.totalAcresDiff) != 0.0) {
                    cy.wrap(p[2]).should('be.visible').and('have.text', Math.trunc(Math.abs(projectMetrics.totalAcres.totalAcresDiff))).and('have.class', parseFloat(projectMetrics.totalAcres.totalAcresDiff) < 0.0 ? 'text-destructive' : 'text-green');
                    cy.wrap(p[3]).should('be.visible').and('have.text', "Lst Week");
                }
            })
            project.getActualAvgAcres().should('be.visible').find('p').then(p => {
                cy.wrap(p[0]).should('be.visible').and('have.text', parseFloat(projectMetrics.acresPerDay.avgAcresPerDay.toFixed(1)))
                cy.wrap(p[1]).should('be.visible').and('have.text', "Avg Acres Per Day");
                if (parseFloat(projectMetrics.acresPerDay.avgAcresDiff) != 0.0) {
                    cy.wrap(p[2]).should('be.visible').and('have.text', Math.abs(projectMetrics.acresPerDay.avgAcresDiff.toFixed(1))).and('have.class', parseFloat(projectMetrics.acresPerDay.avgAcresDiff) < 0.0 ? 'text-destructive' : 'text-green');
                    cy.wrap(p[3]).should('be.visible').and('have.text', "Lst Week");
                }
            })
            project.getActualProjectHours().should('be.visible').find('p').then(p => {
                cy.wrap(p[0]).invoke('text').then(timeString => {
                    cy.wrap(parseInt(timeString.split(" ")[0])).should('eq', Math.floor(projectMetrics.projectHours.totalProjectHours));
                    cy.wrap(parseInt(timeString.split(" ")[1])).should('eq', Math.abs(parseInt(projectMetrics.projectHours.totalProjectHours) - parseFloat(projectMetrics.projectHours.totalProjectHours)) * 60);

                    cy.wrap(p[1]).should('be.visible').and('have.text', "Project Hours");
                    if (parseFloat(projectMetrics.projectHours.projectHoursLast7Days) != 0.0) {
                        cy.wrap(p[2]).invoke('text').then(timeString => {
                            cy.wrap(p[2]).should('have.class', 'text-green');
                            cy.wrap(parseInt(timeString.split(" ")[0])).should('eq', Math.floor(projectMetrics.projectHours.projectHoursLast7Days))
                            cy.wrap(parseInt(timeString.split(" ")[1])).should('eq', parseInt((projectMetrics.projectHours.projectHoursLast7Days - Math.floor(projectMetrics.projectHours.projectHoursLast7Days)) * 60));
                            cy.wrap(p[3]).should('be.visible').and('have.text', "Lst Week");
                        })
                    }
                })
            })
            project.getActualActiveUnits().should('be.visible').find('p').then(p => {
                cy.wrap(p[0]).should('be.visible').and('have.text', parseInt(projectMetrics.activeUnits.totalActiveUnits))
                cy.wrap(p[1]).should('be.visible').and('have.text', "Active Units");
                if (parseInt(projectMetrics.activeUnits.activeUnitsDiff) != 0) {
                    cy.wrap(p[2]).should('be.visible').and('have.text', Math.abs(projectMetrics.activeUnits.activeUnitsDiff)).and('have.class', 'text-green');
                    cy.wrap(p[3]).should('be.visible').and('have.text', "Lst Week");
                }
            })
        });
    });
});