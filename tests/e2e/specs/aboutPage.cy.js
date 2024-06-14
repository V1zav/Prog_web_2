describe('About Page', () => {
  it('should render the about page content', () => {
    cy.visit('/about');
    cy.get('h1').should('contain', 'About Page');
    cy.get('p').should('contain', 'This is the about page of our contact management application. Here you can find information about the purpose of the application, its features, and the team behind its development.');
    cy.get('.nav-button').should('contain', 'Home');
  });
});
