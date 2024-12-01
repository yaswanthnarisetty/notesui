describe('Pricing Page Tests', () => {
    beforeEach(() => {
      // Replace with your actual URL
      cy.visit('/pricing');
    });
  
    it('should display the hero section correctly', () => {
      // Verify hero section heading
      cy.get('h1').contains('Affordable for Everyone').should('be.visible');
  
      // Verify hero section paragraph
      cy.get('p').contains('SSnote is absolutely FREE to use').should('be.visible');
  
      // Verify the "Get Started for Free" button
      cy.get('button').contains('Get Started for Free')
        .should('be.visible')
        .and('have.css', 'background-color', 'rgb(147, 51, 234)') // Check purple color
        .click();
  
      // Verify navigation to signup page
      cy.url().should('include', '/signup');
    });
  
    it('should display the pricing section correctly', () => {
      // Verify pricing section heading
      cy.get('h2').contains('Why Pay When It\'s Free?').should('be.visible');
  
      // Verify the feature cards
      const features = [
        'Unlimited Notes',
        'Access Anywhere',
        'No Ads',
      ];
  
      features.forEach((feature) => {
        cy.get('h3').contains(feature).should('be.visible');
      });
    });
  
    it('should display the call-to-action section correctly', () => {
      // Verify CTA heading
      cy.get('h2').contains('Get Started for Free').should('be.visible');
  
      // Verify CTA button
      cy.get('button').contains('Create Your Free Account')
        .should('be.visible')
        .and('have.css', 'background-color', 'rgb(255, 255, 255)') // Check white color
        .click();
  
      // Verify navigation to signup page
      cy.url().should('include', '/signup');
    });
  
    it('should display footer with current year', () => {
      // Verify footer text
      const currentYear = new Date().getFullYear();
      cy.get('footer').contains(`© ${currentYear} SSnote. All rights reserved.`).should('be.visible');
    });
  });
  