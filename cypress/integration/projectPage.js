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
        cy.wait(5000);
        cy.intercept('POST', 'https://api.dev.earthforce.io/portal/main-api', (req) => {
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
                project.totalAcres().should('be.visible');
                project.avgAcres().should('be.visible');
                project.projectHours().should('be.visible');
                project.activeUnits().should('be.visible');
            });
        });

        cy.wait('@getProjectMetricsQuery').then((interception) => {
            const response = interception.response;
            const projectMetrics = response.body.data.getProjectMetrics;
            expect(interception.response.statusCode).to.eq(200);
            const totalAcres = projectMetrics.totalAcres.totalAcres;
            const totalAcressDiff = projectMetrics.totalAcres.totalAcresDiff;
            const acresPerDay = projectMetrics.acresPerDay.avgAcresPerDay;
            const AvgAcresDiff = projectMetrics.acresPerDay.avgAcresDiff;
            const projectHour = projectMetrics.projectHours.totalProjectHours;
            const projectHourLastDay = projectMetrics.projectHours.projectHoursLast7Days;
            const totalActiveUnits = projectMetrics.activeUnits.totalActiveUnits;
            const activeUnitsDiff = projectMetrics.activeUnits.activeUnitsDiff;

          /*  project.getActualtotalAcres().invoke('text').then(actualTotalAcres => {
                const roundedTotalAcres = parseFloat(totalAcres.toFixed(2));
                const textWithoutAC = actualTotalAcres.replace("Ac", "");
                expect(roundedTotalAcres).to.eq(parseFloat(textWithoutAC));
            })

            project.getActualAcresDiff().invoke('text').then(actualAcresDiff => {
                const totalAcressDiffRound = Math.floor(Math.abs(totalAcressDiff))
                expect(totalAcressDiffRound).to.eq(parseFloat(actualAcresDiff));
            });*/
            project.getActualAvgAcres().should('be.visible').find('p').then(p => {
                cy.wrap(p[0]).should('be.visible'). and('have.text',parseFloat(acresPerDay.toFixed(1)))
                cy.wrap(p[1]).should('be.visible'). and('have.text',"Avg Acres Per Day");
            })
            project.getActualProjectHours().should('be.visible').find('p').then(p => {
                cy.wrap(p[0]).should('be.visible')
                cy.wrap(p[0]).invoke('text').then(timeString => {
                    cy.wrap(parseInt(timeString.split(" ")[0])).should('eq', Math.floor(projectHour));
                    cy.wrap(p[1]).should('be.visible'). and('have.text',"Project Hours");
            })
        })
        project.getActualActiveUnits().should('be.visible').find('p').then(p => {
            cy.wrap(p[0]).should('be.visible'). and('have.text',parseFloat(totalActiveUnits))
            cy.wrap(p[1]).should('be.visible'). and('have.text',"Active Units");
        })
         
           
        });
    });
});
