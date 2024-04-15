class ProjectPage {
  
 
    getProjectHeader() {
      return cy.get('#radix-\\:ri\\: > p');
    }
    getProjectName(){
        return cy.get('[data-testid="project-name"]')
    }
    progressCard(){
        return cy.get('[data-testid="progress-card"]')
    }
    totalAcres(){
        return cy.get('[data-testid="total-acres"]')
    }
    avgAcres(){
        return cy.get('[data-testid="average-acres"]')
    }
    projectHours(){
        return cy.get('[data-testid="project-hours"]')
    }
    activeUnits(){
        return cy.get('[data-testid="active-units"]')
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
    getActualProjectHourLast(){
        return cy.get('[data-testid="project-hours"]')
    }
    getActualActiveUnits(){
        return cy.get('[data-testid="active-units"]')
    }
}

    export default ProjectPage;
