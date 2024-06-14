describe('Register Page', () => {
    it('should call register method on form submit', () => {
      cy.visit('http://127.0.0.1:8080/register');
      cy.wait(2000);
      cy.get('input[id="username"]').type('testuser');
      cy.get('input[id="email"]').type('test@example.com');
      cy.get('input[id="password"]').type('password');
      cy.get('form').submit();
    });
  });