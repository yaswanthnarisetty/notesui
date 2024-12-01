import React from "react";
import { FaEdit, FaTrash, FaStar, FaFolder, FaCheckCircle } from 'react-icons/fa';

const FeaturesPage: React.FC = () => {
  return (
    <div className="bg-[#F8F9FA]">
      {/* Hero Section */}
      <section className="bg-[#E7E4F1] py-36 text-center">
        <h1 className="text-5xl font-bold mb-4">Discover the Features of SSnote</h1>
        <p className="text-xl mb-6">
          Unlock the full potential of organizing, capturing, and managing your thoughts with SSnote.
        </p>
        <a href="/signup">
          <button className="bg-purple-600 text-white px-8 py-3 rounded hover:bg-purple-700">
            Start Exploring
          </button>
        </a>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Organize Your Notes with Categories</h2>
          <p className="text-lg mb-6">
            Create custom categories to neatly organize your notes. Whether it’s for work, personal projects, or study, SSnote has you covered.
          </p>
          <div className="flex justify-center space-x-6">
            <div className="bg-white p-6 rounded-lg shadow-lg w-72">
              <FaFolder size={50} className="text-purple-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Create Categories</h3>
              <p className="text-gray-700">
                Keep everything in its place by creating as many categories as you need.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-72">
              <FaFolder size={50} className="text-purple-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Manage Categories</h3>
              <p className="text-gray-700">
                Easily edit, remove, or reorder categories to match your workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Notes Management Section */}
      <section className="py-16 bg-[#F0EEF8]">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Manage Your Notes Like a Pro</h2>
          <div className="flex justify-center space-x-6">
            <div className="bg-white p-6 rounded-lg shadow-lg w-72">
              <FaEdit size={50} className="text-purple-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Add and Edit Notes</h3>
              <p className="text-gray-700">
                Easily add new notes and edit them later to keep track of important information.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-72">
              <FaTrash size={50} className="text-purple-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Delete Notes</h3>
              <p className="text-gray-700">
                Delete unwanted notes to keep your workspace clutter-free and organized.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Favorites Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Never Lose Your Favorite Notes</h2>
          <div className="flex justify-center space-x-6">
            <div className="bg-white p-6 rounded-lg shadow-lg w-72">
              <FaStar size={50} className="text-purple-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Mark Notes as Favorites</h3>
              <p className="text-gray-700">
                Mark your most important notes with a star to easily access them later.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section className="py-16 bg-[#F0EEF8]">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Advanced Features to Boost Productivity</h2>
          <div className="flex justify-center space-x-6">
            <div className="bg-white p-6 rounded-lg shadow-lg w-72">
              <FaCheckCircle size={50} className="text-purple-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Task Lists & Checkboxes</h3>
              <p className="text-gray-700">
                Turn your notes into action items with checkboxes and task lists.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-72">
              <FaFolder size={50} className="text-purple-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Organize with Tags</h3>
              <p className="text-gray-700">
                Use tags to quickly categorize and search your notes with ease.
              </p>
            </div>
          </div>
        </div>
      </section>

   
      {/* Call-to-Action Section */}
      <section className="bg-purple-700 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-lg mb-6">
          Unlock the power of SSnote and take your organization skills to the next level.
        </p>
        <a href="/signup">
          <button className="bg-white text-purple-700 px-8 py-3 rounded-lg hover:bg-[#E7E4F1]">
            Start Using SSnote
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

export default FeaturesPage;
