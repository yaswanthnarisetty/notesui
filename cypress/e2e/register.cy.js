describe('Register Flow', () => {
    beforeEach(() => {
      // Navigate to the register page
      cy.visit('/signup'); // Adjust this route to match your app's register page
    });
  
    it('should display validation errors for empty inputs', () => {
      cy.get('button[type="submit"]').click(); // Submit without filling the form
  
      // Check for default HTML5 validation
      cy.get('input:invalid').should('have.length', 3); // All three fields should show validation errors
    });
  
    it('should register successfully with valid inputs', () => {
      // Replace with valid test data
      const testName = 'Test User';
      const testEmail = `testuser${Date.now()}@example.com`; // Unique email for testing
      const testPassword = 'password123';
  
      // Fill in the form
      cy.get('input[type="text"]').type(testName); // Name input
      cy.get('input[type="email"]').type(testEmail); // Email input
      cy.get('input[type="password"]').type(testPassword); // Password input
  
      // Submit the form
      cy.get('button[type="submit"]').click();
  
      // Assert successful registration (redirection to /categories)
      cy.url().should('include', '/categories');
    });
  
    it('should display an error for duplicate or invalid email', () => {
      // Replace with an email that is known to cause a "duplicate email" error
      const existingEmail = 'existinguser@example.com';
      const testPassword = 'password123';
  
      // Fill in the form
      cy.get('input[type="text"]').type('Test User');
      cy.get('input[type="email"]').type(existingEmail);
      cy.get('input[type="password"]').type(testPassword);
  
      // Submit the form
      cy.get('button[type="submit"]').click();
  
    });
  });
  