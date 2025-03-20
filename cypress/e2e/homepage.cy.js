// Prevent Cypress from failing the test due to third-party script errors
Cypress.on('uncaught:exception', () => false);

describe('DP World Tour Homepage', () => {
  beforeEach(() => {
    cy.visit('https://www.europeantour.com/dpworld-tour/');

    // Handle cookie consent popup if it appears
    cy.contains('I Accept', { timeout: 5000 }).click().should('not.exist');
  });

  it('should load the homepage successfully', () => {
    cy.url().should('include', 'europeantour.com');
    cy.get('body').should('be.visible');
  });

  it('should have a visible main navigation', () => {
    cy.get('nav').should('be.visible');
  });

  it('should allow searching for a player', () => {
    cy.get('input[placeholder="Search"]').type('Rory McIlroy{enter}');
    cy.url().should('include', 'search');
  });
});
