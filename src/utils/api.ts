import axios from "axios";

const API_URL = "https://notesbackend-murex.vercel.app";

// Create an Axios instance with default configuration
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Login user function
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post("/login", { email, password });
    return response.data; // Return successful response data
  } catch (error: any) {
    // Handle and throw meaningful errors
    throw new Error(
      error.response?.data?.message || "Failed to log in. Please try again."
    );
  }
};

// Register user function
export const registerUser = async (data: { name: string; email: string; password: string }) => {
  try {
    const response = await api.post("/register", data);
    return response.data; // Return successful response data
  } catch (error: any) {
    // Handle and throw meaningful errors
    throw new Error(
      error.response?.data?.message || "Failed to register. Please try again."
    );
  }
};
