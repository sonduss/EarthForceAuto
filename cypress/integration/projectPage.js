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
      console.log("This is for testing1")
      console.log("Intercepted request body:", req.body);
      console.log("The operation name is", req.body.operationName)
      if (req.body && req.body.operationName === "GetProjectMetrics") {
        req.alias = 'getProjectMetricsQuery'; 
        console.log("This is for testing3333")
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
        console.log("This is for testing222")
        console.log("Intercepted request:", interception.request)
        console.log("Intercepted response:", interception.response)
        console.log("This is response",interception.response.statusCode)
        const response = interception.response;
        const projectMetrics = response.body.data.getProjectMetrics;        
      expect(interception.response.statusCode).to.eq(200);
      const totalAcres = projectMetrics.totalAcres.totalAcres;
const totalAcressDiff=projectMetrics.totalAcres.totalAcresDiff;
const acresPerDay = projectMetrics.acresPerDay.avgAcresPerDay;
const AvgAcresDiff = projectMetrics.acresPerDay.avgAcresDiff;
const projectHour = projectMetrics.projectHours.totalProjectHours;
const projectHourLastDay = projectMetrics.projectHours.projectHoursLast7Days;
const totalActiveUnits = projectMetrics.activeUnits.totalActiveUnits;
const activeUnitsDiff = projectMetrics.activeUnits.activeUnitsDiff;

project.getActualtotalAcres().invoke('text').then(actualTotalAcres => {
const roundedTotalAcres = parseFloat(totalAcres.toFixed(2));
const textWithoutAC = actualTotalAcres.replace("Ac", "");
console.log("Actual",textWithoutAC)
console.log("expected",roundedTotalAcres)
expect(roundedTotalAcres).to.eq(parseFloat(textWithoutAC));
})

project.getActualAcresDiff().invoke('text').then(actualAcresDiff => {
const totalAcressDiffRound=Math.floor(Math.abs(totalAcressDiff))
expect(totalAcressDiffRound).to.eq(parseFloat(actualAcresDiff));
});
project.getActualAvgAcres().invoke('text').then(actualAcresPerDay => {
const roundedAcresPerDay = parseFloat(acresPerDay.toFixed(1));
expect(roundedAcresPerDay).to.eq(parseFloat(actualAcresPerDay));
})
project.getActualAvgAcresDiff().invoke('text').then(actualAvgAcresDiff => {
const avgAcresDiffNumber = parseFloat(AvgAcresDiff);
const positiveAvgAcresDiff = Math.ceil(Math.abs(avgAcresDiffNumber));
expect(positiveAvgAcresDiff).to.eq(parseFloat(actualAvgAcresDiff));
});
project.getActualProjectHours().invoke('text').then(actualProjectHour => {
const roundedProjectHour = Math.floor(projectHour);
expect(roundedProjectHour).to.eq(parseFloat(actualProjectHour));
});
project.getActualProjectHourLast().invoke('text').then(actualProjectHourLastDay => {
const roundedProjectHourLst = Math.floor(projectHourLastDay);
expect(roundedProjectHourLst).to.eq(parseFloat(actualProjectHourLastDay));
});
project.getActualActiveUnits().invoke('text').then(actualActiveUnits => {
expect(totalActiveUnits).to.eq(parseFloat(actualActiveUnits));
});
project.getActualActiveUnitsDiff().invoke('text').then(actualActiveUnitsDiff => {
expect(activeUnitsDiff).to.eq(parseFloat(actualActiveUnitsDiff));
});
});
});
});
