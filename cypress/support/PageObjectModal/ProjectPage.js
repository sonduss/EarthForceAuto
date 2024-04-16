class ProjectPage {
  
 
    getProjectHeader() {
      return cy.get('#radix-\\:ri\\:');
    }
    getProjectName(){
        return cy.get('[data-testid="project-name"]')
    }
    progressCard(){
        return cy.get('[data-testid="progress-card"]')
    }
    getActualtotalAcres(){
        return cy.get('[data-testid="total-acres"]')
    }
    getActualAvgAcres(){
       return cy.get('[data-testid="average-acres"]')
    }
    getActualProjectHours(){
        return cy.get('[data-testid="project-hours"]')
    }

    getActualActiveUnits(){
        return cy.get('[data-testid="active-units"]')
    }
}

    export default ProjectPage;
