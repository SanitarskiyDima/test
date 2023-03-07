import * as user from '../fixtures/user.json';
import { headlessLogin } from '../support/helper';

it('open account page', () => {

    headlessLogin(user);

    cy.visit('/index.php?rt=account/account');

    cy.log('**Verify user first name on account page**');
    cy.get('h1 span.subtext', {timeout: 20000}).should('contain', user.firstName);
})

it('open order history page', () => {

    headlessLogin(user);

    cy.visit('/index.php?rt=account/history');

    cy.log('**Verify user first name on account page**');
    cy.get('h1 span.maintext', {timeout: 20000}).should('contain', ' My Order History');
})