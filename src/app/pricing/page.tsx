import React from "react";

const PricingPage: React.FC = () => {
  return (
    <div className="bg-[#F8F9FA]">
      {/* Hero Section */}
      <section className="bg-[#E7E4F1] py-36 text-center">
        <h1 className="text-5xl font-bold mb-4">Affordable for Everyone</h1>
        <p className="text-xl mb-6">
          SSnote is absolutely <span className="font-bold text-purple-600">FREE</span> to use. No hidden costs. No subscription fees. 
          Take full advantage of our powerful features to stay organized and productive without any financial commitment.
        </p>
        <a href="/signup">
          <button className="bg-purple-600 text-white px-8 py-3 rounded hover:bg-purple-700">
            Get Started for Free
          </button>
        </a>
      </section>

      {/* Pricing Section */}
      <section className="py-16 text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-8">Why Pay When It's Free?</h2>
          <p className="text-lg mb-6">
            All of the features you need to organize your notes are completely free. No premium plans or hidden charges. 
            With SSnote, you get:
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs mx-auto">
              <h3 className="text-2xl font-semibold mb-4">Unlimited Notes</h3>
              <p className="text-gray-700">
                Capture as many notes as you need—whether for work, study, or personal use. 
                No limits, no restrictions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs mx-auto">
              <h3 className="text-2xl font-semibold mb-4">Access Anywhere</h3>
              <p className="text-gray-700">
                SSnote is accessible across devices—whether you’re on a phone, tablet, or desktop. 
                Your notes are always within reach.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs mx-auto">
              <h3 className="text-2xl font-semibold mb-4">No Ads</h3>
              <p className="text-gray-700">
                Enjoy a clean, ad-free experience while you work and organize your thoughts.
                Focus on what matters most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Benefits Section */}
      <section className="py-16 bg-[#F0EEF8]">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">More Features, More Benefits</h2>
          <p className="text-lg mb-6">
            Even though SSnote is completely free, we still pack in powerful features to enhance your productivity:
          </p>
          <div className="flex justify-center space-x-8">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs">
              <h3 className="text-2xl font-semibold mb-4">Task Management</h3>
              <p className="text-gray-700">
                Turn your notes into actionable tasks with checklists and reminders.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs">
              <h3 className="text-2xl font-semibold mb-4">Collaboration</h3>
              <p className="text-gray-700">
                Share and collaborate with your friends or teammates in real-time.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs">
              <h3 className="text-2xl font-semibold mb-4">Search & Tags</h3>
              <p className="text-gray-700">
                Use tags to quickly search and categorize your notes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Why Choose SSnote?</h2>
          <p className="text-lg mb-6">
            Our mission is simple: make note-taking, organizing, and collaborating effortless for everyone. 
            With SSnote, you’re in control. Here’s why you should start using SSnote today:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Free Forever</h3>
              <p className="text-gray-700">
                Never worry about subscription fees or premium plans. SSnote is here for everyone.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Simple & Intuitive</h3>
              <p className="text-gray-700">
                We’ve designed SSnote to be easy to use, even for beginners. No steep learning curve.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Your Privacy Matters</h3>
              <p className="text-gray-700">
                We respect your privacy. All your notes are kept secure and private with us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-purple-700 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Get Started for Free</h2>
        <p className="text-lg mb-6">
          Unlock all the powerful features of SSnote without any cost. Sign up today and start organizing your notes.
        </p>
        <a href="/signup">
          <button className="bg-white text-purple-700 px-8 py-3 rounded-lg hover:bg-[#E7E4F1]">
            Create Your Free Account
          </button>
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} SSnote. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PricingPage;
