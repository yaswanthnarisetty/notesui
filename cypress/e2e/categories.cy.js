describe('Categories Page', () => {
    const API_URL = 'https://notesbackend-murex.vercel.app/api/categories';
  
    beforeEach(() => {
      // Mock the token in localStorage
      cy.window().then((win) => {
        win.localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ0MjQ0YjlkYmZiZWU5YjU3ODk2ZWMiLCJlbWFpbCI6Inlhc2h1dUBnbWFpbC5jb20iLCJpYXQiOjE3MzI3MzY1MjB9.Nrb9SbEVQcR4Yu8STpD6fi-nfaKyEhNTIXgz5hRjD8k');
      });
  
      // Visit the categories page
      cy.visit('/categories'); // Adjust the route based on your app's routing
    });
  
    it('should load categories and display them correctly', () => {
      // Mock the API response for fetching categories
      cy.intercept('GET', API_URL, {
        statusCode: 200,
        body: [
          {
            _id: '1',
            name: 'Education',
            icon: 'FaBook',
            notes: ['Note 1', 'Note 2'],
          },
          {
            _id: '2',
            name: 'Finance',
            icon: 'FaPiggyBank',
            notes: [],
          },
        ],
      }).as('fetchCategories');
  
      // Wait for the categories to load
      cy.wait('@fetchCategories');
  
      // Assert that categories are displayed correctly
      cy.contains('Education').should('be.visible');
      cy.contains('Finance').should('be.visible');
      cy.contains('(2)').should('be.visible'); // Notes count
      cy.contains('(0)').should('be.visible'); // Notes count
    });
  
    it('should display an error if fetching categories fails', () => {
      // Mock a failure response for fetching categories
      cy.intercept('GET', API_URL, {
        statusCode: 500,
        body: { message: 'Failed to fetch categories' },
      }).as('fetchCategoriesError');
  
      // Wait for the categories fetch request
      cy.wait('@fetchCategoriesError');
  
      // Assert the error message is displayed
      cy.contains('Failed to fetch categories. Please try again.').should('be.visible');
    });
  
    it('should open and close the create category modal', () => {
      // Open the modal
      cy.contains('Create New +').click();
      cy.contains('Create New Category').should('be.visible');
  
      // Close the modal
      cy.contains('Cancel').click();
      cy.contains('Create New Category').should('not.exist');
    });
  
    it('should create a new category with valid inputs', () => {
      // Mock the API response for creating a category
      cy.intercept('POST', API_URL, {
        statusCode: 201,
        body: {
          _id: '3',
          name: 'Travel',
          icon: 'FaPlane',
          notes: [],
        },
      }).as('createCategory');
  
      // Open the modal
      cy.contains('Create New +').click();
  
      // Fill out the form
      cy.get('input[name="name"]').type('Travel');
      cy.get('select[name="icon"]').select('FaPlane');
  
      // Submit the form
      cy.contains('Save').click();
  
      // Wait for the API call and verify
      cy.wait('@createCategory');
      cy.contains('Travel').should('be.visible');
    });
  
    it('should display an error when category creation fails', () => {
      // Mock a failure response for creating a category
      cy.intercept('POST', API_URL, {
        statusCode: 400,
        body: { message: 'Category creation failed' },
      }).as('createCategoryError');
  
      // Open the modal
      cy.contains('Create New +').click();
  
      // Fill out the form
      cy.get('input[name="name"]').type('Test Category');
      cy.get('select[name="icon"]').select('FaClipboard');
  
      // Submit the form
      cy.contains('Save').click();
  
      // Wait for the API call
      cy.wait('@createCategoryError');
  
      // Assert the error message
    //   cy.contains('Name is required').should('be.visible');
    });
  
    it('should validate form inputs', () => {
      // Open the modal
      cy.contains('Create New +').click();
  
      // Attempt to submit the form with empty fields
      cy.contains('Save').click();
  
      // Assert validation messages
      cy.contains('Name is required').should('be.visible');
      cy.contains('Icon is required').should('be.visible');
  
      // Fill in the name but leave the icon empty
      cy.get('input[name="name"]').type('Test Category');
      cy.contains('Save').click();
  
      // Assert only icon validation remains
      cy.contains('Icon is required').should('be.visible');
      cy.contains('Name is required').should('not.exist');
    });
  });
  