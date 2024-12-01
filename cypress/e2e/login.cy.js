describe('Login Flow', () => {
    beforeEach(() => {
      cy.visit('/login'); // Replace with the route to your Login component
    });
  
    it('should show validation errors for invalid inputs', () => {
      // Attempt to submit empty form
      cy.get('button[type="submit"]').click();
  
      // Check for validation messages
      cy.contains('Email is required').should('be.visible');
      cy.contains('Password is required').should('be.visible');
    });
  
    it('should login successfully with valid credentials', () => {
      // Fill in valid credentials
      cy.get('#email').type('yashuu@gmail.com');
      cy.get('#password').type('Yash');
  
      // Submit the form
      cy.get('button[type="submit"]').click();
  
      // Verify redirection to categories page
      cy.url().should('include', '/categories');
    });
  
    it('should display error message for invalid credentials', () => {
      // Fill in invalid credentials
      cy.get('#email').type('invaliduser@example.com');
      cy.get('#password').type('wrongpassword');
  
      // Submit the form
      cy.get('button[type="submit"]').click();
  
      // Check for error message
      cy.contains('you are not registered').should('be.visible');
    });
  });
  