import BasePage from "./BasePage";

class LoginPage extends BasePage{

    constructor(){
        this.loginField = '#loginFrm_loginname';
        this.passwordField = '#loginFrm_loginname';
        this.submitButton = 'button[type="submit"]';
    }

    visit(){
        cy.log('Open website login page');
        cy.visit('/index.php?rt=account/login');
    }

    getLoginField(){
        return  cy.get('#loginFrm_loginname');
    }

    getPasswordField(){
        return  cy.get('#loginFrm_password');
    }

    getSubmitButton(){
        return cy.get('button[type="submit"]').contains('Login');
    }

    assertUserUnauthorized(){
        cy.log('Verify user is unauthorized');
        cy.getCookie('customer').should('be.null');
        cy.log('User is unauthorized ✅');
    }

    submitLoginForm(user){
        cy.log('Trying to login ...');

        this.getLoginField().type(user.username);
        this.getPasswordField().type(user.password);
        this.getSubmitButton().click();
    }


}
export default new LoginPage();