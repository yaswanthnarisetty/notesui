describe("HomePage Component Tests", () => {
    beforeEach(() => {
      cy.visit("/"); // Adjust this path if your app uses a different route for the homepage
    });
  
    // Test 1: Hero Section
    it("renders the Hero section with heading, description, and button", () => {
      cy.contains("Organize Your Notes, Tasks, and Ideas").should("be.visible");
      cy.contains("Capture your thoughts and access them anywhere, on any device.").should(
        "be.visible"
      );
      cy.get("button").contains("Get Started for Free").should("be.visible");
    });
  
    // Test 2: Features Section
    it("renders the Features section with correct content", () => {
      const featureTitles = [
        "Work Anywhere",
        "Remember Everything",
        "Turn To-Do into Done",
        "Find Things Fast",
      ];
  
      featureTitles.forEach((title) => {
        cy.contains(title).should("be.visible");
      });
  
      const featureDescriptions = [
        "Keep important info handy—your notes sync automatically to all your devices.",
        "Make notes more useful by adding text, images, audio, scans, PDFs, and documents.",
        "Bring your notes, tasks, and schedules together to get things done more easily.",
        "Get what you need, when you need it with powerful and flexible search capabilities.",
      ];
  
      featureDescriptions.forEach((description) => {
        cy.contains(description).should("be.visible");
      });
    });
  
    // Test 3: Testimonials Section
    it("renders the Testimonials section with user feedback", () => {
      cy.contains("What Our Users Say").should("be.visible");
      cy.contains("SSnote has completely transformed the way I organize my life.").should(
        "be.visible"
      );
      cy.contains("— Sarah J., Freelancer").should("be.visible");
      cy.contains("I love how easy it is to sync my notes across all devices.").should(
        "be.visible"
      );
      cy.contains("— Mike R., Project Manager").should("be.visible");
      cy.contains("The powerful search feature has been a lifesaver for my busy schedule.").should(
        "be.visible"
      );
      cy.contains("— Lisa T., Entrepreneur").should("be.visible");
    });
  
    // Test 4: FAQ Section
    it("renders the FAQ section with questions and answers", () => {
      cy.contains("Frequently Asked Questions").should("be.visible");
  
      const faqData = [
        {
          question: "Is SSnote free to use?",
          answer:
            "Yes, SSnote offers a free plan that includes essential features. You can also upgrade to premium plans for more advanced tools.",
        },
        {
          question: "Which devices are supported?",
          answer: "SSnote is available on web, Windows, Mac.",
        },
        {
          question: "How secure is my data?",
          answer:
            "SSnote prioritizes your data security with encryption and other advanced safety measures.",
        },
      ];
  
      faqData.forEach(({ question, answer }) => {
        cy.contains(question).should("be.visible");
        cy.contains(answer).should("be.visible");
      });
    });
  

    // Test 6: Footer Section
    it("renders the Footer section with copyright text", () => {
      const currentYear = new Date().getFullYear();
      cy.contains(`© ${currentYear} SSnote. All rights reserved.`).should("be.visible");
    });
  });
  