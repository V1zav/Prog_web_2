describe('Login Page', () => {
    it('should call login method on form submit', () => {
      cy.visit('http://127.0.0.1:8080/login');
      cy.get('input[type="email"]').type('test@example.com');
      cy.get('input[type="password"]').type('password');
      cy.get('form').submit();
    });
  });