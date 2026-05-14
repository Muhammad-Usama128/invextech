"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useApi from "@/lib/useApi";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const response = await useApi.get("/check-auth");
        console.log(response.data.message);
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    })();
  }, [router]);

  const validate = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await useApi.post("/login");
        console.log(response.data.message);
        toast.success("Login Successfully!");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } catch (error) {
        toast.error("Something went wrong.");
        console.log(error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-500 to-purple-600 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-indigo-50 rounded-full">
            <svg
              className="w-8 h-8 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              ></path>
            </svg>
          </div>
        </div>
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:ring-indigo-500"} bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 transition-all duration-200`}
              placeholder="name@example.com"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-500 font-medium">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:ring-indigo-500"} bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 transition-all duration-200`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-500 font-medium">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-linear-to-r from-indigo-600 to-purple-600 text-white font-bold py-3.5 px-4 rounded-xl hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-300 transform hover:-translate-y-1"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
