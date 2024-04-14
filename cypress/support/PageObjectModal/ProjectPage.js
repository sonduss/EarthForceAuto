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
        return cy.get('[data-testid="project-hours"] > .justify-between')
    }
    activeUnits(){
        return cy.get('[data-testid="active-units"]')
    }
    getActualtotalAcres(){
        return cy.get('[data-testid="progress-card"] > .mt-4 > :nth-child(1) > .flex > .mr-1')
    }
    getActualAcresDiff(){
        return cy.get('[data-testid="total-acres"] > .justify-between > .mt-5 > .flex')
    }
    getActualAvgAcres(){
       return cy.get('[data-testid="average-acres"] > .justify-between > .py-7 > .font-medium')
    }
    getActualAvgAcresDiff(){
        return cy.get('[data-testid="average-acres"] > .justify-between > .mt-5 > .flex')
    }
    getActualProjectHours(){
        return cy.get('[data-testid="project-hours"] > .justify-between > .py-7 > .font-medium')
    }
    getActualProjectHourLast(){
        return cy.get('[data-testid="project-hours"] > .justify-between > .mt-5 > .flex')
    }
    getActualActiveUnits(){
        return cy.get('[data-testid="active-units"] > .justify-between > .py-7 > .font-medium')
    }
    getActualActiveUnitsDiff(){
        return cy.get('[data-testid="active-units"] > .justify-between > .items-end > .flex')
    }
}

    export default ProjectPage;
