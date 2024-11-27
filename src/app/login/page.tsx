"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { loginUser } from "@/utils/api";


const Login = () => {
  const router = useRouter();

  // Check if the user is already logged in
 useEffect(() => {
           const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
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
          const token = typeof window !== 'undefined' ? localStorage.setItem("token", response.auth) : null; // Save the JWT token
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...formik.getFieldProps("email")}
              className={`w-full border p-2 rounded ${
                formik.touched.email && formik.errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...formik.getFieldProps("password")}
              className={`w-full border p-2 rounded ${
                formik.touched.password && formik.errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
            ) : null}
          </div>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-blue-500 text-white py-2 rounded disabled:opacity-50"
          >
            {formik.isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm">
            Don&apos;t have an account?{" "}
            <a
              href="/register"
              className="text-blue-500 hover:underline font-medium"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
