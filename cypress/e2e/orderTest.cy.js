import * as user from '../fixtures/user.json';
import {loginViaUI, findProductWithRecursion, searchAndClickProduct, findProduct, productFinder, findProductWithRecursionWithTestFailing, findItems} from '../support/helper';

it('Order', () => {

    loginViaUI();

    cy.log('**Choose product**');
    cy.get('.nav-pills.categorymenu').children('li').eq(2).click();
    cy.get('.thumbnails.row').children('li').eq(0).click();
    cy.get('.col-md-3.col-sm-6.col-xs-12').children('.thumbnail').eq(0).click();
    cy.get('.productpagecart').children('li').eq(0).click();
    cy.get('#cart_quantity50').clear().type('2');
    cy.get('a.btn.btn-default.mr10.mb10').click();
    cy.get('.nav-pills.categorymenu').children('li').eq(4).click();
    cy.get('.thumbnails.row').children('li').last().click();
    cy.get('#sort').select('Price Low > High');
    cy.get('.pricetag.jumbotron').children('.productcart').eq(6).click();

    cy.log('**Order products**');
    cy.get('.productpagecart').children('li').eq(0).click();
    cy.get('#cart_checkout1').click();
    cy.get('#checkout_btn').click();

    cy.get('.maintext').should('contain', ' Your Order Has Been Processed!');

})

it.only('Order', () => {

    loginViaUI(user);

    cy.get('#filter_keyword')
        .type('e')
        .closest("form")
        .submit();

    //findProductWithRecursion('Bene1fit Bella Bamba');

    //findProductWithRecursionWithTestFailing('Benefit Bella Bamba');

    //searchAndClickProduct('Benefit Bella Bamba')

    findProduct('Benefit Bella Bamba5');

    //productFinder('Benefit Bella Bamba');

    //findItems('Benefit Bella Bamba')

    cy.log('**Order products**');
    cy.get('.productpagecart').children('li').eq(0).click();
    cy.get('#cart_checkout1').click();
    cy.get('#checkout_btn').click();

    cy.get('.maintext').should('contain', ' Your Order Has Been Processed!');

})