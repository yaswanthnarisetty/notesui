describe("Features Page Tests", () => {
    beforeEach(() => {
      cy.visit("/features"); // Adjust this path if your app uses a different route for the features page
    });
  
    // Test 1: Hero Section
    it("renders the Hero section correctly", () => {
      cy.contains("Discover the Features of SSnote").should("be.visible");
      cy.contains(
        "Unlock the full potential of organizing, capturing, and managing your thoughts with SSnote."
      ).should("be.visible");
      cy.get("button").contains("Start Exploring").should("be.visible");
    });
  
    // Test 2: Categories Section
    it("renders the Categories section with content and icons", () => {
      cy.contains("Organize Your Notes with Categories").should("be.visible");
      cy.contains(
        "Create custom categories to neatly organize your notes. Whether it’s for work, personal projects, or study, SSnote has you covered."
      ).should("be.visible");
      cy.contains("Create Categories").should("be.visible");
      cy.contains("Manage Categories").should("be.visible");
      cy.get("svg").should("have.length.greaterThan", 0); // Verifies icons are rendered
    });
  
    // Test 3: Notes Management Section
    it("renders the Notes Management section correctly", () => {
      cy.contains("Manage Your Notes Like a Pro").should("be.visible");
      cy.contains("Add and Edit Notes").should("be.visible");
      cy.contains(
        "Easily add new notes and edit them later to keep track of important information."
      ).should("be.visible");
      cy.contains("Delete Notes").should("be.visible");
      cy.contains(
        "Delete unwanted notes to keep your workspace clutter-free and organized."
      ).should("be.visible");
    });
  
    // Test 4: Favorites Section
    it("renders the Favorites section with content", () => {
      cy.contains("Never Lose Your Favorite Notes").should("be.visible");
      cy.contains("Mark Notes as Favorites").should("be.visible");
      cy.contains(
        "Mark your most important notes with a star to easily access them later."
      ).should("be.visible");
    });
  
    // Test 5: Advanced Features Section
    it("renders the Advanced Features section with content and icons", () => {
      cy.contains("Advanced Features to Boost Productivity").should("be.visible");
      cy.contains("Task Lists & Checkboxes").should("be.visible");
      cy.contains(
        "Turn your notes into action items with checkboxes and task lists."
      ).should("be.visible");
      cy.contains("Organize with Tags").should("be.visible");
      cy.contains(
        "Use tags to quickly categorize and search your notes with ease."
      ).should("be.visible");
    });
  
    // Test 6: Call-to-Action Section
    it("renders the Call-to-Action section with a button", () => {
      cy.contains("Ready to Get Started?").should("be.visible");
      cy.contains(
        "Unlock the power of SSnote and take your organization skills to the next level."
      ).should("be.visible");
      cy.get("button").contains("Start Using SSnote").should("be.visible");
    });
  
    // Test 7: Footer Section
    it("renders the Footer with copyright text", () => {
      const currentYear = new Date().getFullYear();
      cy.contains(`© ${currentYear} SSnote. All rights reserved.`).should("be.visible");
    });
  });
  