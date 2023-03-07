import { faker } from '@faker-js/faker';
import * as user from '../fixtures/user.json';

let pass;

user.firstName = faker.name.firstName();
user.lastName = faker.name.lastName();
user.email = faker.internet.email();
user.address = faker.address.streetAddress();
user.city = faker.address.city();
user.postCode = faker.address.zipCode('####');
user.username = faker.internet.userName();
user.password = faker.internet.password(15);

it('Registration', () => {
    cy.log('**Open website home page**');
    cy.visit('/');

    cy.log('**Open website login page**');
    cy.get('.topnavbar [data-id="menu_account"]').click();

    cy.log('**Open website sign up page**');
    cy.get('#accountFrm button').click();

    cy.log('**Fill sign up form**');
    cy.get('#AccountFrm_firstname').type(user.firstName);
    cy.get('#AccountFrm_lastname').type(user.lastName);
    cy.get('#AccountFrm_email').type(user.email);
    cy.get('#AccountFrm_address_1').type(user.address);
    cy.get('#AccountFrm_city').type(user.city);
    cy.get('#AccountFrm_postcode').type(user.postCode);
    cy.get('#AccountFrm_country_id').select('Denmark');
    cy.get('#AccountFrm_loginname').type(user.username);
    cy.get('#AccountFrm_password').type(user.password);
    cy.get('#AccountFrm_confirm').type(user.password);
    cy.get('#AccountFrm_zone_id')
    .select(2, {force:true})
    .invoke('val')
    .should('not.eq', 'FALSE');

    cy.log('**Check checkboxes**');
    cy.get('#AccountFrm_newsletter0').check();
    cy.get('#AccountFrm_agree').check();

    cy.log('**Submit sign up form**');
    cy.get('button[title="Continue"]').click();

    cy.log('**Verify user first name on account page**');
    cy.get('h1 span.subtext', {timeout: 20000}).should('contain', user.firstName);
})

it('Authorization', () => {

    cy.log('Open website login page');
    cy.visit('/index.php?rt=account/login');

    cy.log('Check user is unauthorized');
    cy.getCookie('customer').should('be.null');

    cy.log('Authorize user');
    cy.get('#loginFrm_loginname').type(user.username);
    cy.get('#loginFrm_password').type(user.password);

    cy.get('button[type="submit"]').contains('Login').click();

    cy.get('h1 span.subtext').should('contain', user.firstName);

})


