class Overview {
  
  visit() {
    cy.visit('https://portal.dev.earthforce.io/portal/overview');
  }
  getZoomIn() {
    return cy.get('button[title="Zoom in"]');
  }
  getZoomOut() {
    return cy.get('button[title="Zoom out"]')
  }
  getMapMArker() {
    return cy.get('.maplibregl-marker');
  }
  getAllProjectsDiv() {
    return cy.get('#radix-\\:rd\\:');
  }
  getAllProjectCheckbox() {
    return cy.get('#checkbox_select_all_Projects');
  }
  getProjectsList() {
    return cy.get('div[data-side="bottom"][data-align="end"][role="menu"]');
  }
  getClearProjects() {
    return cy.get('.z-10 > .inline-flex')
  }
  getProjectName() {
    return cy.get('.text-white.text-xl');
  }
}



export default Overview;
