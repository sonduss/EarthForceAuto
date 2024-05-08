
class UnitsPage {

goToUnits(){
    return cy.get('[data-testid="go-to-unit"]');
}

    customRound(number) {
        if (number === 0) {
            return 0;
        }
        else {
            if (Math.floor(number) === number) {
                return number.toFixed(1);
            } else {
                const rounded = number.toFixed(2);
                return parseFloat(rounded).toString();
            }
        }
    }
    convertToPercentage(decimal) {
        let decimalPlaces;
        if (decimal === 0) {
            return "0";
        }
        if (decimal < 1) {
            decimalPlaces = 2;
        } else {
            decimalPlaces = 1;
        }
        const percentage = (decimal * 100).toFixed(decimalPlaces);
        const percentageString = percentage.toString();
        if (percentageString.charAt(percentageString.length - 1) === '0') {
            return percentageString.slice(0, -1);
        }
        return percentageString;
    }
    getUnsavedUnitName(projectUnits) {
        return new Cypress.Promise(resolve => {
            for (let i = 0; i < projectUnits.length; i++) {
                const unit = projectUnits[i];
                cy.contains('[data-testid="unit-name"]', unit.unitName).then($unitName => {
                    const button = $unitName.closest('[data-testid="go-to-unit"]').find('[data-testid="save-unit-button"]');
                    cy.wrap(button).invoke('css', 'background-color').then(bgColor => {
                        if (bgColor !== 'rgb(255, 95, 20)') {
                            resolve(unit.unitName);
                        }
                    });
                });
            }
        });
    }
}
export default UnitsPage;
