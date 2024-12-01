"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface Note {
  _id: string;
  name: string;
  content: string;
  isFavorite: boolean;
}

interface Category {
  _id: string;
  name: string;
}

const NotesPage = ({ params }: { params: { categoryId: string } }) => {
  const { categoryId } = use(params);
  const [notes, setNotes] = useState<Note[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [singleCategory, setSingleCategory] = useState<Category>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);
  const router = useRouter();

  const fetchNotes = async () => {
    setLoading(true);
    setError(null);

    const API_URL = `https://notesbackend-murex.vercel.app/api/notes/category/${categoryId}`;
             const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

    const singleCategory = categories.find((category) => category._id === categoryId);
    setSingleCategory(singleCategory);

    if (!token) {
      setError("Authorization token is missing.");
      router.push("/login")
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(data);
    } catch (err) {
      console.error("Error fetching notes:", err);
      setError("Failed to fetch notes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    const API_URL = `https://notesbackend-murex.vercel.app/api/categories`;
             const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;


    try {
      const { data } = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
    fetchCategories();
  }, [categoryId]);

  const handleCreateNote = async (values: any, { resetForm }: any) => {
    const API_URL = `https://notesbackend-murex.vercel.app/api/notes`;
             const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;


    const content = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );

    const noteData = {
      name: values.name,
      content,
      categoryId: values.categoryId,
      isFavorite: values.isFavorite,
    };

    try {
      await axios.post(API_URL, noteData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotes(); // Refresh notes
      setPopupOpen(false);
      resetForm();
    } catch (err) {
      console.error("Error creating note:", err);
    }
  };

  const handleDeleteNote = async () => {
    if (!noteToDelete) return;

    const API_URL = `https://notesbackend-murex.vercel.app/api/notes/${noteToDelete._id}`;
             const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;


    try {
      await axios.delete(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotes(); // Refresh notes
      setDeletePopupOpen(false);
      setNoteToDelete(null);
    } catch (err) {
      console.error("Error deleting note:", err);
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
      <header className="flex justify-between items-center mb-6">
        <button
          onClick={() => router.back()}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Back
        </button>
        <h2 className="text-xl font-semibold">Notes</h2>
        <div className="flex gap-4">
          <button
            onClick={() => router.push(`/categories/notes/${categoryId}/edit`)}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Edit Category
          </button>
          <button
            onClick={() => setPopupOpen(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Create New +
          </button>
        </div>
      </header>
      <div className="border-b-2 border-purple-300 mb-6"></div>
      <main>
        {notes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div
                key={note._id}
                className="bg-white p-4 rounded-md shadow-md hover:shadow-lg cursor-pointer"
              >
                <h3 className="text-lg font-semibold text-purple-700 mb-2">
                  {note.name}
                </h3>
                {note.isFavorite && (
                  <p className="text-yellow-500 font-semibold mt-2">
                    ★ Favorite
                  </p>
                )}
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => router.push(`/notes/${note._id}`)}
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      setDeletePopupOpen(true);
                      setNoteToDelete(note);
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">No notes available.</div>
        )}
      </main>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md w-full max-w-fit">
            <h3 className="text-lg font-semibold mb-4">Create New Note</h3>
            <Formik
              initialValues={{
                name: "",
                categoryId: categoryId || "",
                isFavorite: false,
              }}
              validationSchema={Yup.object({
                name: Yup.string().required("Name is required"),
                categoryId: Yup.string().required("Category is required"),
              })}
              onSubmit={handleCreateNote}
            >
              {({ values, handleChange }) => (
                <Form>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <Field
                      type="text"
                      name="name"
                      className="w-full border rounded p-2"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Content
                    </label>
                    <Editor
                      editorState={editorState}
                      onEditorStateChange={setEditorState}
                      wrapperClassName="border rounded"
                      editorClassName="p-2"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Category
                    </label>
                    <Field
                      as="select"
                      name="categoryId"
                      className="w-full border rounded p-2"
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <div className="mb-4 flex items-center">
                    <Field
                      type="checkbox"
                      name="isFavorite"
                      className="mr-2"
                    />
                    <label>Mark as Favorite</label>
                  </div>
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setPopupOpen(false)}
                      className="bg-gray-300 px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                    >
                      Save
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}

      {isDeletePopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md w-full max-w-sm text-center">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this note?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeletePopupOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteNote}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesPage;
