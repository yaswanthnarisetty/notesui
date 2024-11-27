"use client"
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Modal from "react-modal";
import { FaBook, FaPiggyBank, FaBriefcase, FaLock, FaClipboard, FaHeartbeat, FaGlobe, FaPlane, FaTools, FaShoppingCart } from "react-icons/fa";
import axios from "axios";

import { IconContext } from "react-icons";
import CategoryCard from "@/components/CategoryCard";

interface Category {
  _id: string;
  name: string;
  icon: string;
  notes: string[];
}
const iconOptions = [
    { label: <FaBook />, value: "education", icon: "FaBook" }, // Education
    { label: <FaPiggyBank />, value: "finance", icon: "FaPiggyBank" }, // Finance
    { label: <FaBriefcase />, value: "work", icon: "FaBriefcase" }, // Work
    { label: <FaLock />, value: "personal", icon: "FaLock" }, // Personal
    { label: <FaClipboard />, value: "tasks", icon: "FaClipboard" }, // Tasks/To-Do
    { label: <FaHeartbeat />, value: "health", icon: "FaHeartbeat" }, // Health/Wellness
    { label: <FaGlobe />, value: "general", icon: "FaGlobe" }, // General
    { label: <FaPlane />, value: "travel", icon: "FaPlane" }, // Travel
    { label: <FaTools />, value: "projects", icon: "FaTools" }, // Projects
    { label: <FaShoppingCart />, value: "shopping", icon: "FaShoppingCart" }, // Shopping
    { label: <FaClipboard />, value: "others", icon: "FaClipboard" }, // Others

  ];
  
const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      const API_URL = "https://notesbackend-murex.vercel.app/api/categories";
           const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
 // Retrieve token from localStorage

      if (!token) {
        setError("Authorization token is missing.");
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to fetch categories. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Form validation schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .max(50, "Name must be 50 characters or less"),
    icon: Yup.string().required("Icon is required"),
  });

  // Handle form submission for new category
  const handleSubmit = async (
    values: { name: string; icon: string },
    { resetForm }: any
  ) => {
    setLoading(true);
    setError(null);

    try {
           const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

      if (!token) {
        setError("Authorization token is missing.");
        setLoading(false);
        return;
      }

      const API_URL = "https://notesbackend-murex.vercel.app/api/categories";
      const { data } = await axios.post(
        API_URL,
        { name: values.name, icon: values.icon },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Add the new category to the local state
      setCategories([...categories, data]);
      setIsModalOpen(false); // Close modal
      resetForm(); // Reset form
    } catch (err) {
      console.error("Error creating category:", err);
      setError(
        err.response?.data?.message || "Failed to create category. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 py-20">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#E7E4F1] py-10 px-6">
      <main>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Categories</h2>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Create New +
          </button>
        </div>
        <div className="border-b-2 border-purple-300 mb-6"></div>

        {/* Render Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            // <div
            //   key={category._id}
            //   className="bg-purple-200 text-center rounded-lg p-4 hover:bg-purple-300"
            // >
            //   <div className="text-4xl mb-2">
            //     {React.createElement(require("react-icons/fa")[category.icon])}
            //   </div>
            //   <h3 className="font-medium text-lg">
            //     {category.name} ({category.notes.length})
            //   </h3>
            // </div>
            <CategoryCard
            key={category._id}
            id={category._id}
            icon={category.icon}
            name={category.name}
            count={category.notes.length}
            />
          ))}
        </div>
      </main>

      {/* Modal for Create New */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Create Category"
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto"
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-lg font-semibold mb-4">Create New Category</h2>
        <Formik
          initialValues={{ name: "", icon: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="mb-4">
                <label className="block font-medium mb-2">Name</label>
                <Field
                  name="name"
                  type="text"
                  placeholder="Enter category name"
                  className="w-full px-3 py-2 border rounded"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block font-medium mb-2">Category type</label>
                <select
                  name="icon"
                  value={values.icon}
                  onChange={(e) => setFieldValue("icon", e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="" label="Select an icon" />
                  {iconOptions.map((icon) => (
                    <option key={icon.value} value={icon.icon}>
                      {icon.value}
                    </option>
                  ))}
                </select>
                <ErrorMessage
                  name="icon"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* <div className="mb-4">
                {values.icon && (
                  <div className="flex items-center">
                    <IconContext.Provider value={{ size: "2rem" }}>
                    {
  iconOptions.find((icon) => icon.icon === values.icon)?.label || (
    <span className="text-gray-500">No icon selected</span>
  )
}
                    </IconContext.Provider>
                    <span className="ml-2">Selected Icon</span>
                  </div>
                )}
              </div> */}

              {error && (
                <div className="text-red-500 text-sm mb-4">{error}</div>
              )}

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default CategoriesPage;
