export default class BasePage {

    getSearchField(){
        return cy.get('#filter_keyword');
    }

}
