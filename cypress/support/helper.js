export function loginViaUI(user){
    cy.log('**Open website login page**');
    cy.visit('/');

    cy.log('**Authorize user**');
    cy.get('#customer_menu_top').click();
    cy.get('#loginFrm_loginname').type(user.username);
    cy.get('#loginFrm_password').type(user.password);
    cy.get('[title="Login"]').click();
    cy.get('h1 span.subtext').should('contain', user.firstName);
}

export function headlessLogin(user){
    let csrfToken;
    let csrfInstance;

    cy.request('GET', '/index.php?rt=account/login').then( response => {
        let htmlResp = document.createElement('html')
        htmlResp.innerHTML = response.body;
        csrfToken = htmlResp.querySelector('#loginFrm [name="csrftoken"]').getAttribute('value');
        csrfInstance = htmlResp.querySelector('#loginFrm [name="csrfinstance"]').getAttribute('value');
    }).then(() => {
        cy.request({
            method: 'POST',
            url: '/index.php?rt=account/login',
            body: {
                loginname: user.username,
                password: user.password,
                csrfinstance: csrfInstance,
                csrftoken: csrfToken
            },
            form: true
        })
    })
}

// export function someLoginViaAPI(){
//     let token;

//     cy.request({
//         method: 'POST',
//         url: '/index.php?rt=account/login',
//         body: {
//             loginname: user.username,
//             password: user.password
//         }
//     }).then( response => {
//         token = response.body.token
//         cy.setCookie('token', response.body.token);
//         window.localStorage.setItem('token', response.body.token);
//         window.sessionStorage.setItem('token', response.body.token);
//     })
// }

export function findProductWithRecursion(productName) {
    cy.get('body').then((body) => {
        if (body.find(`[title="${productName}"]`).length > 0) {
            cy.get(`[title="${productName}"]`).click();
        }
        else {
            cy.get('.pagination li a').contains('>').click();
            findProductWithRecursion(productName);
        }
    })
}

export function findProductWithRecursionWithTestFailing(productName) {
    cy.get('body').then((body) => {
        if (body.find(`[title="${productName}"]`).length > 0) {
            cy.get(`[title="${productName}"]`).click();
        }
        else if(body.find('.pagination li a:contains(">")').length > 0){
            cy.get('.pagination li a').contains('>').click();
            findProductWithRecursionWithTestFailing(productName);
        }else{
            cy.log('Product not found')
            throw new Error('Product not found')
        }
    })
}

export function findItems (search){
    cy.get('input#filter_keyword').clear().type('E').parents('form').submit();
    //cy.get('.fa.fa-search').click();

    const fn = () =>{
        cy.get('.contentpanel').then(() => {
            let  itemFounds = Cypress.$(`a.prdocutname[title="${search}"]`)

            if(itemFounds.length == 0){
               cy.get('.pagination').find('a').eq(-2).should('contain','>').click();
                fn()
            }else{
                cy.get(`a.prdocutname[title="${search}"]`).click()
            }
        
        })
    }
    fn()
}
 
export function findProduct(product_name) {

    //Find needed product among all
    cy.get('.thumbnail').then(products => {
        let neededProduct;
        if ((neededProduct = products.find(`a:contains("${product_name}")`)).length > 0) {
            cy.wrap(neededProduct).click({ force: true })

            //check product page is opened
            cy.get('.bgnone')
                .should('contain.text', product_name)
        }
        else {
            cy.get('.pagination li').then(pages => {

            //until 'next' button is present click on it and search product again
                let neededPage = pages.find('.pagination li a[href]:contains(">")')

                if ((neededPage = pages.find('a[href]:contains(">")')).length > 0) {
                    cy.wrap(neededPage)
                        .first()
                        .click({ force: true })

                    findProduct(product_name)

                } else {
                    cy.log('[There is no such product](http://e.ua)') //link is just to make text blue for visibility
                    throw new Error('Product not found');
                }

            })
        }
    })
}

export const productFinder = (productTitleToFind) => {
    cy.get('.pull-right .pagination').find('li').then(elm => {
        for (let i = 0; i < elm.length - 1; i++) {
            cy.get(".prdocutname").then(($a) => {
                if ($a.text().includes(`${productTitleToFind}`)) {
                    cy.log('**product found**')

                    cy.get(`[title="${productTitleToFind}"]`).click()
                } else {
                    cy.log('[There is no such product](http://e.ua)')
                    cy.visit(`https://automationteststore.com/index.php?rt=product/search&keyword=e%20&category_id=0&sort=date_modified-ASC&limit=20&page=${i}`)
                }
            })
        }
    })
}