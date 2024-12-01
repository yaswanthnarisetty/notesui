"use client";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IconContext } from "react-icons";
import { FaBook, FaPiggyBank, FaBriefcase, FaLock, FaClipboard, FaHeartbeat, FaGlobe, FaPlane, FaTools, FaShoppingCart, FaGlobeAsia } from "react-icons/fa";
import axios from "axios";

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
    { label: <FaGlobeAsia />, value: "others", icon: "FaGlobeAsia" }, // Others

  ];
  

interface Category {
  _id: string;
  name: string;
  icon: string;
}

const EditCategoryPage = ({ params }: { params: { categoryId: string } }) => {
  const { categoryId } = use (params);
  const router = useRouter();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      const API_URL = `https://notesbackend-murex.vercel.app/api/categories/${categoryId}`;
           const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;


      try {
        const { data } = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategory(data);
      } catch (err) {
        console.error("Error fetching category:", err);
        setError("Failed to fetch category.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .max(50, "Name must be 50 characters or less"),
    icon: Yup.string().required("Icon is required"),
  });

  const handleSubmit = async (
    values: { name: string; icon: string },
    { resetForm }: any
  ) => {
    const API_URL = `https://notesbackend-murex.vercel.app/api/categories/${categoryId}`;
         const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;


    try {
      await axios.put(
        API_URL,
        { name: values.name, icon: values.icon },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      router.push("/categories");
    } catch (err) {
      console.error("Error updating category:", err);
      setError("Failed to update category.");
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (error || !category) {
    return <div className="text-center text-red-600 py-20">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#E7E4F1] py-10 px-6">
      <h2 className="text-xl font-semibold mb-6">Edit Category</h2>

      <Formik
        initialValues={{
          name: category.name || "",
          icon: category.icon || "",
          
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
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
              <label className="block font-medium mb-2">Category Type</label>
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
                onClick={() => router.back()}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditCategoryPage;
