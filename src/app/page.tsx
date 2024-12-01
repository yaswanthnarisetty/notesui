import React from "react";
import pin from "@/assets/pin.png"
import pin2 from "@/assets/pin2.png"
import location from "@/assets/location.png"
import accept from "@/assets/accept.png"


const HomePage: React.FC = () => {
  return (
    <div className="bg-[#E7E4F1]">
      {/* Navbar */}
      {/* <header className="bg-green-500 text-white p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">SSnote</h1>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:underline">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Login
              </a>
            </li>
          </ul>
        </nav>
      </header> */}

      {/* Hero Section */}
      <section className="bg-[#E7E4F1] py-36">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Organize Your Notes, Tasks, and Ideas
          </h2>
          <p className="text-lg mb-6">
            Capture your thoughts and access them anywhere, on any device.
          </p>
          <a href="/login">
          <button className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">
            Get Started for Free
          </button>
          </a>
        </div>
      </section>
      <section className="bg-[#f0eef8] py-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="mb-4">
              <img
                src={location.src}
                width="50px"
                alt="Work Anywhere Icon"
                className="mx-auto"
              />
            </div>
            <h3 className="font-bold text-xl mb-2">Work Anywhere</h3>
            <p className="text-gray-700">
              Keep important info handy—your notes sync automatically to all
              your devices.
            </p>
          </div>
          <div className="text-center">
            <div className="mb-4">
              <img
                src={pin.src}
                width="50px"
                alt="Remember Everything Icon"
                className="mx-auto"
              />
            </div>
            <h3 className="font-bold text-xl mb-2">Remember Everything</h3>
            <p className="text-gray-700">
              Make notes more useful by adding text, images, audio, scans,
              PDFs, and documents.
            </p>
          </div>
          <div className="text-center">
            <div className="mb-4">
              <img
             src={accept.src}
                width="50px"
                alt="Turn To-Do into Done Icon"
                className="mx-auto"
              />
            </div>
            <h3 className="font-bold text-xl mb-2">Turn To-Do into Done</h3>
            <p className="text-gray-700">
              Bring your notes, tasks, and schedules together to get things
              done more easily.
            </p>
          </div>
          <div className="text-center">
            <div className="mb-4">
              <img
                src={pin2.src}
                width="50px"
                alt="Find Things Fast Icon"
                className="mx-auto"
              />
            </div>
            <h3 className="font-bold text-xl mb-2">Find Things Fast</h3>
            <p className="text-gray-700">
              Get what you need, when you need it with powerful and flexible
              search capabilities.
            </p>
          </div>
        </div>
      </section>
      {/* Hero Section */}
<section className="relative bg-purple-700 text-white py-16 overflow-hidden ">
  {/* Background Shapes */}
  <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-purple-600 rounded-full opacity-80"></div>
  <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-pink-300 rounded-full opacity-80"></div>
  
  {/* Content */}
  <div className="container mx-auto text-center relative z-10">
    <h1 className="text-4xl font-bold mb-4">
      Tame your work, organize your life
    </h1>
    <p className="text-lg mb-6">
      Remember everything and tackle any project with your notes, tasks, 
      and schedule all in one place.
    </p>

    <a href="/login">
    <button className="bg-white text-purple-700 px-6 py-3 rounded-lg font-semibold hover:bg-[#E7E4F1]">
      Get SSnote Free
    </button>
    </a>

  </div>
</section>
{/* Testimonials Section */}
<section className="bg-[#E7E4F1] py-16">
  <div className="container mx-auto text-center">
    <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-gray-700 mb-4">
          "SSnote has completely transformed the way I organize my life.
          It's my go-to app for everything!"
        </p>
        <h4 className="font-bold text-lg">— Sarah J., Freelancer</h4>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-gray-700 mb-4">
          "I love how easy it is to sync my notes across all devices. Never
          lose a thought again!"
        </p>
        <h4 className="font-bold text-lg">— Mike R., Project Manager</h4>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-gray-700 mb-4">
          "The powerful search feature has been a lifesaver for my busy
          schedule."
        </p>
        <h4 className="font-bold text-lg">— Lisa T., Entrepreneur</h4>
      </div>
    </div>
  </div>
</section>



      {/* Features Section */}
      <section className="container mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 border rounded-lg shadow">
            <h3 className="text-2xl font-bold mb-4">Capture Ideas</h3>
            <p>Write, collect, and save anything with powerful note-taking tools.</p>
          </div>
          <div className="text-center p-6 border rounded-lg shadow">
            <h3 className="text-2xl font-bold mb-4">Organize Notes</h3>
            <p>Easily categorize and find your notes using tags and notebooks.</p>
          </div>
          <div className="text-center p-6 border rounded-lg shadow">
            <h3 className="text-2xl font-bold mb-4">Stay in Sync</h3>
            <p>Access your notes anywhere, anytime, on all your devices.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
<section className="bg-[#f0eef8] py-16">
  <div className="container mx-auto">
    <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="p-6 border rounded-lg shadow">
        <h3 className="font-bold text-xl mb-2">Is SSnote free to use?</h3>
        <p className="text-gray-700">
          Yes, SSnote offers a free plan that includes essential features. You
          can also upgrade to premium plans for more advanced tools.
        </p>
      </div>
   
      <div className="p-6 border rounded-lg shadow">
        <h3 className="font-bold text-xl mb-2">Which devices are supported?</h3>
        <p className="text-gray-700">
          SSnote is available on web, Windows, Mac.
        </p>
      </div>
      <div className="p-6 border rounded-lg shadow">
        <h3 className="font-bold text-xl mb-2">How secure is my data?</h3>
        <p className="text-gray-700">
          SSnote prioritizes your data security with encryption and other
          advanced safety measures.
        </p>
      </div>
    </div>
  </div>
</section>
{/* Newsletter Subscription Section */}
<section className="bg-purple-700 text-white py-16">
  <div className="container mx-auto text-center">
    <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
    <p className="text-lg mb-8">
      Sign up for our newsletter to get the latest updates, tips, and exclusive
      offers delivered straight to your inbox.
    </p>
    <form className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
      <input
        type="email"
        placeholder="Enter your email"
        className="px-4 py-2 rounded-md text-gray-700 w-full md:w-1/3"
      />
      <button
        type="submit"
        className="bg-white text-purple-700 px-6 py-2 rounded-md font-semibold hover:bg-[#E7E4F1]"
      >
        Subscribe
      </button>
    </form>
  </div>
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

export default HomePage;
