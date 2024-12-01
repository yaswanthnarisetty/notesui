"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { loginUser } from "@/utils/api";
import loginImg from "@/assets/loginImg.png"

const Login = () => {
  const router = useRouter();

  // Check if the user is already logged in
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      router.push("/categories"); // Redirect to categories page if logged in
    }
  }, [router]);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await loginUser(values.email, values.password);
        if (response.auth) {
          console.log("resp", response);
          const token = typeof window !== "undefined" ? localStorage.setItem("token", response.auth) : null; // Save the JWT token
          window.location.href = "/categories";
        } else {
          setErrors({ email: response.message || "Login failed" });
        }
      } catch (err: any) {
        setErrors({ email: err.response?.data?.message || "Login failed" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-700 min-h-screen flex items-center justify-center">
       <div className="flex flex-col sm:flex-row items-center justify-around w-full max-w-4xl mx-auto p-6 space-y-8 sm:space-y-0">
        <div className="sm:w-1/2 flex justify-center">
          <img src={loginImg.src} alt="signup" className="w-80 rounded-lg shadow-lg" />
        </div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:max-w-sm max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login to Your Account</h2>
        <p className="text-center text-gray-600 mb-6">
          Welcome back! Please login to continue managing your notes.
        </p>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              {...formik.getFieldProps("email")}
              className={`w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                formik.touched.email && formik.errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-500 text-sm mt-2">{formik.errors.email}</p>
            ) : null}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              {...formik.getFieldProps("password")}
              className={`w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                formik.touched.password && formik.errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-500 text-sm mt-2">{formik.errors.password}</p>
            ) : null}
          </div>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-purple-600 text-white py-3 rounded-md shadow-lg hover:bg-purple-700 disabled:opacity-50"
          >
            {formik.isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <a
              href="/signup"
              className="text-purple-600 hover:underline font-medium"
            >
              Register
            </a>
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Login;
