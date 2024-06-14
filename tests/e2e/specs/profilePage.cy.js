describe('Login Page', () => {
  it('should login user', () => {
    cy.visit('/login');
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password');
    cy.get('form').submit(); 
    cy.url().should('include', '/profile');
    cy.wait(2000);
  });
});

describe('Profile Page', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({ username: 'TestUser', email: 'test@example.com' }));
    localStorage.setItem('token', 'test-token');
  });

  it('should render the profile page content', () => {
    cy.visit('/profile');
    cy.get('h1').should('contain', 'Profile');
    cy.get('p:nth-of-type(1)').should('contain', 'Username: TestUser');
    cy.get('p:nth-of-type(2)').should('contain', 'Email: test@example.com');
    cy.wait(2000);
  });

  it('should log out user and redirect to login page', () => {
    cy.visit('/profile');
    cy.get('button').click();
    cy.url().should('include', '/login');
  });
});
