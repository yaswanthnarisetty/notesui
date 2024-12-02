"use client";
import { useState } from "react";
import { registerUser } from "../../utils/api";
import { useRouter } from "next/navigation";
import homeAv from "@/assets/homeAv.png"; // Assuming you have an image for the avatar

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await registerUser({ name, email, password });
     // const token = typeof window !== "undefined" ? localStorage.setItem("token", response.auth) : null; // Save the JWT token
      if(response.auth){
        alert("Registration successful!");
        router.push("/login"); // Redirect to dashboard or home
      }
      else{
        alert(response.message)
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-700 min-h-screen flex items-center justify-center">
      <div className="flex flex-col sm:flex-row items-center justify-around w-full max-w-4xl mx-auto p-6 space-y-8 sm:space-y-0">
        <div className="sm:w-1/2 flex justify-center">
          <img src={homeAv.src} alt="signup" className="w-80 rounded-lg shadow-lg" />
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-1/2 max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Join Our Community!</h2>
          <p className="text-center text-lg text-gray-600 mb-6">
            Sign up now to get started with managing your notes seamlessly. It's quick and easy!
          </p>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <button type="submit" className="w-full bg-purple-600 text-white py-3 rounded-lg shadow-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500">
              Register
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-purple-600 hover:underline font-medium">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
