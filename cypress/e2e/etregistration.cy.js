// cypress/e2e/registration.cy.js

describe('DP World Tour Registration', () => {
  it('should allow a user to register with valid credentials', () => {
    // 1. Visit the DP World Tour homepage
    cy.visit('https://www.europeantour.com/dpworld-tour/');

    // --- Handle Cookie Consent ---
    cy.get('button#onetrust-accept-btn-handler').click(); // Accept cookies

    // 2. Click "My Tour" link
    cy.get('a[href="/dpworld-tour/my-tour/"][data-cms-content-type="Navigation Link"]').click();

    // 3. Click "Sign up now" button.
    cy.get('a[data-cms-content-type="Navigation Link"]').contains('Sign Up').click()

    //Get the iframe and interact with elements inside it.
    cy.get('iframe[title="Iframe"]').then(($iframe) => {
      const $body = $iframe.contents().find('body')

      cy.wrap($body).find('input[name="firstName"]').type('Test');
      cy.wrap($body).find('input[name="lastName"]').type('User');
      cy.wrap($body).find('input[name="email"]').type(`testuser+${Date.now()}@example.com`); // Use a unique email
      cy.wrap($body).find('input[name="password"]').type('Password123!');
      cy.wrap($body).find('input[name="confirmPassword"]').type('Password123!');
      cy.wrap($body).find('select[name="country"]').select('US'); // Select a country (United States)
      //Agree the Terms and conditions
      cy.wrap($body).find('label[class="checkbox col-sm-12 form-group"]').click();
      //Submit regitration
      cy.wrap($body).find('button[type="submit"]').click();
      //Verify you are logged in
      cy.get('span[data-cms-content-type="User Dropdown"]').should('contain.text', 'Test');
       //Logout
      cy.get('a[data-cms-content-type="Navigation Link"]').contains('Log Out').click()
    })
  });
    it('should not allow registration with mismatched passwords', () => {
        cy.visit('https://www.europeantour.com/dpworld-tour/')
        cy.get('button#onetrust-accept-btn-handler').click(); // Accept cookies
        cy.get('a[href="/dpworld-tour/my-tour/"][data-cms-content-type="Navigation Link"]').click();
        cy.get('a[data-cms-content-type="Navigation Link"]').contains('Sign Up').click()

        cy.get('iframe[title="Iframe"]').then(($iframe) => {
            const $body = $iframe.contents().find('body')
            cy.wrap($body).find('input[name="firstName"]').type('Test');
            cy.wrap($body).find('input[name="lastName"]').type('User');
            cy.wrap($body).find('input[name="email"]').type(`testuser+${Date.now()}@example.com`);
            cy.wrap($body).find('input[name="password"]').type('Password123!');
            cy.wrap($body).find('input[name="confirmPassword"]').type('Password123'); // Mismatched password
            cy.wrap($body).find('select[name="country"]').select('US');
            cy.wrap($body).find('label[class="checkbox col-sm-12 form-group"]').click();
            cy.wrap($body).find('button[type="submit"]').click();
            cy.wrap($body).find('span.Msg').should('be.visible');
            cy.wrap($body).find('span.Msg').should('contain.text', 'does not match');
        })

    })
    it('should not allow registration without agreeing Terms and conditions', () => {
        cy.visit('https://www.europeantour.com/dpworld-tour/')
        cy.get('button#onetrust-accept-btn-handler').click(); // Accept cookies
        cy.get('a[href="/dpworld-tour/my-tour/"][data-cms-content-type="Navigation Link"]').click();
        cy.get('a[data-cms-content-type="Navigation Link"]').contains('Sign Up').click()
        cy.get('iframe[title="Iframe"]').then(($iframe) => {
            const $body = $iframe.contents().find('body')
            cy.wrap($body).find('input[name="firstName"]').type('Test');
            cy.wrap($body).find('input[name="lastName"]').type('User');
            cy.wrap($body).find('input[name="email"]').type(`testuser+${Date.now()}@example.com`);
            cy.wrap($body).find('input[name="password"]').type('Password123!');
            cy.wrap($body).find('input[name="confirmPassword"]').type('Password123!');
            cy.wrap($body).find('select[name="country"]').select('US');
            //cy.wrap($body).find('label[class="checkbox col-sm-12 form-group"]').click(); // Don't agree terms and conditions
            cy.wrap($body).find('button[type="submit"]').click();
            cy.wrap($body).find('span.Msg').should('be.visible');
            cy.wrap($body).find('span.Msg').should('contain.text', 'You must agree');

        })
    })
});