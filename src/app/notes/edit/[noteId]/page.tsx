"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useFormik } from "formik";
import * as Yup from "yup";

const EditNotePage = ({ params }: { params: { noteId: string } }) => {
  const { noteId } = use(params);
  const [note, setNote] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [editorState, setEditorState] = useState<EditorState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchNoteDetails = async () => {
      setLoading(true);
      setError(null);

      const API_URL = `https://notesbackend-murex.vercel.app/notes/${noteId}`;
           const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;


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
        setNote(data);
        const initialContent = data.content
          ? EditorState.createWithContent(
              convertFromRaw(JSON.parse(data.content))
            )
          : EditorState.createEmpty();
        setEditorState(initialContent);
      } catch (err) {
        console.error("Error fetching note details:", err);
        setError("Failed to fetch note details. Please try again.");
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

    fetchNoteDetails();
    fetchCategories();
  }, [noteId]);

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
        console.log("🚀 ~ onSubmit: ~ values:", values)
        
      const API_URL = `https://notesbackend-murex.vercel.app/api/notes/${noteId}`;
           const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;


      if (!token) {
        setError("Authorization token is missing.");
        router.push("/login")
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
        console.log("🚀 ~ onSubmit: ~ payload:", payload)

        await axios.put(API_URL, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        router.push(`/notes/${noteId}`);
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

  return (
    <div className="min-h-screen bg-[#E7E4F1] py-10 px-6">
      <h2 className="text-xl font-semibold mb-6">Edit Note</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4 bg-white p-4">
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
            onClick={() => router.push(`/notes/${noteId}`)}
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
  );
};

export default EditNotePage;
