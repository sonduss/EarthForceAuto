/// <reference types="Cypress" />
import Overview from '../support/PageObjectModal/Overview.js';


describe('Overview Test', () => {
  const overview = new Overview()
  beforeEach(() => {
    cy.login();
  });


 it('should zoom in', () => {
    const numZoomClicks = 15;
    cy.wait(2000)
    for (let i = 0; i < numZoomClicks; i++) {
      overview.getZoomIn().click();
    }
  });

  it('should zoom out', () => {
    const numZoomClicks = 4;
    cy.wait(2000)
    for (let i = 0; i < numZoomClicks; i++) {
      overview.getZoomOut().click();
    }
  });

  it('Should display and display all Projects actions', () => {
    overview.getMapMArker().each(($marker, index, $markers) => {
      cy.wrap($marker).should('be.visible');
    });
    overview.getAllProjectsDiv().click()
    overview.getAllProjectCheckbox().click()
    overview.getMapMArker().should('not.exist');
  });

  it('Should display and hide specific project', () => {
    overview.getAllProjectsDiv().click()
    overview.getProjectsList().each(($menuDiv) => {
      cy.wrap($menuDiv).children('div').each(($childDiv) => {
        cy.wrap($childDiv).find('label').each(($label) => {
          const labelValue = $label.text();
          overview.getAllProjectsDiv().each(($marker) => {
            const markerText = $marker.find('p').eq(0).text();
            if (labelValue === markerText) {
              const $button = $childDiv.find('button[data-state="checked"]');
              cy.wrap($button).click();
              cy.get($marker.find('p').eq(0)).should('not.exist');
            }
          });
        });
      });
    });

  });
  it('Should clear all projects', () => {
    overview.getClearProjects().click()
    overview.getAllProjectsDiv().should('not.exist');
  })
  /*
  it('Background color hover test', () => {
     cy.visit('https://portal.dev.earthforce.io/portal/overview');
     cy.get('#radix-\\:rd\\:')
         .then(($button) => {
             // Trigger hover event
             cy.wrap($button).trigger('mouseover');
             // Check the background color after hovering
             cy.get('#radix-\\:rd\\:')
                 .should('have.css', 'background-color', 'hsl(var(--primary))');
         });
 });*/
  it('Should click on the project and verify the link', () => {
    overview.getMapMArker().each(($marker, index, $markers) => {
      const markerText = $marker.find('p').eq(0).text();
      overview.getMapMArker().eq(0).click()
      overview.getProjectName().should('be.visible').wait(1000).should('have.text', markerText);
    });
    });
  });








