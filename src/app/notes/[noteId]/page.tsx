"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useFormik } from "formik";
import * as Yup from "yup";

interface NoteDetails {
  _id: string;
  name: string;
  content: string; // Stored as raw draft-js JSON string
  isFavorite: boolean;
  category?: { _id: string; name: string };
}

const NoteDetailsPage = ({ params }: { params: { noteId: string } }) => {
  const { noteId } = use(params);
  const [note, setNote] = useState<NoteDetails | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [editorState, setEditorState] = useState<EditorState | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchCategories = async () => {
    const API_URL = `https://notesbackend-murex.vercel.app/api/categories`;
    const token = localStorage.getItem("token");

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
    fetchCategories();
  }, [noteId]);

  // Fetch note details
  useEffect(() => {
    let isMounted = true; // Flag to track if component is mounted
  
    const fetchNoteDetails = async () => {
      setLoading(true);
      setError(null);
  
      const API_URL = `https://notesbackend-murex.vercel.app/notes/${noteId}`;
      const token = localStorage.getItem("token");
  
      if (!token) {
        if (isMounted) {
          setError("Authorization token is missing.");
          setLoading(false);
        }
        return;
      }
  
      try {
        const { data } = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (isMounted) {
          setNote(data);
          const initialContent = data.content
            ? EditorState.createWithContent(
                convertFromRaw(JSON.parse(data.content))
              )
            : EditorState.createEmpty();
          setEditorState(initialContent);
        }
      } catch (err) {
        console.error("Error fetching note details:", err);
        if (isMounted) setError("Failed to fetch note details. Please try again.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
  
    fetchNoteDetails();
  
    return () => {
      isMounted = false; // Cleanup: mark component as unmounted
    };
  }, [noteId]);
  

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: note?.name || "",
      categoryId: note?.category?._id || "",
      isFavorite: note?.isFavorite || false,
      content: note?.content || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required."),
    }),
    onSubmit: async (values) => {
      const API_URL = `https://notesbackend-murex.vercel.app/api/notes/${noteId}`;
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Authorization token is missing.");
        return;
      }

      try {
        const updatedContent = JSON.stringify(
          convertToRaw(editorState!.getCurrentContent())
        );

        const payload = {
          ...values,
          content: updatedContent,
        };

        await axios.put(API_URL, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        setNote({ ...note, ...payload });
        setIsEditModalOpen(false);
      } catch (err) {
        console.error("Error updating note:", err);
        setError("Failed to update note. Please try again.");
      }
    },
  });

  const handleEditorStateChange = (state: EditorState) => {
    setEditorState(state);
    formik.setFieldValue("content", JSON.stringify(convertToRaw(state.getCurrentContent())));
  };

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 py-20">{error}</div>;
  }

  if (!note) {
    return (
      <div className="text-center text-gray-500 py-20">Note not found.</div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E7E4F1] py-10 px-6">
      <header className="flex justify-between items-center mb-6">
        <button
          onClick={() => router.push("/categories")}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Back
        </button>
        <h2 className="text-xl font-semibold">{note.name}</h2>
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          onClick={() => router.push(`/notes/edit/${noteId}`)}
        >
          Edit Note
        </button>
      </header>
      <div className="border-b-2 border-purple-300 mb-6"></div>
      <main>
        <div className="bg-white p-6 rounded-md shadow-md">
          <h3 className="text-2xl font-bold text-purple-700 mb-4">{note.name}</h3>
          <div className="mb-4">
            {editorState ? (
              <Editor
                editorState={editorState}
                toolbarHidden
                readOnly
                wrapperClassName="border-none"
                editorClassName="p-2 bg-gray-100 rounded"
              />
            ) : (
              <p className="text-gray-700">No content available.</p>
            )}
          </div>
          {note.isFavorite && (
            <p className="text-yellow-500 font-semibold">★ Marked as Favorite</p>
          )}
        </div>
      </main>

      {/* Edit Modal */}
      {/* {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-[90%] max-w-fit">
            <h2 className="text-xl font-semibold mb-4">Edit Note</h2>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full p-2 border rounded"
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-600">{formik.errors.name}</div>
                )}
              </div>
              <div>
                <label className="block mb-2">Content:</label>
                {editorState && (
                  <Editor
                    editorState={editorState}
                    onEditorStateChange={handleEditorStateChange}
                    wrapperClassName="border p-2 rounded"
                    editorClassName="p-2"
                  />
                )}
              </div>
              <div>
                <label className="block mb-2">Category:</label>
                <select
                  name="categoryId"
                  value={formik.values.categoryId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>
                  <input
                    type="checkbox"
                    name="isFavorite"
                    checked={formik.values.isFavorite}
                    onChange={formik.handleChange}
                  />{" "}
                  Mark as Favorite
                </label>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                  onClick={() => setIsEditModalOpen(false)}
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
            </form>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default NoteDetailsPage;
