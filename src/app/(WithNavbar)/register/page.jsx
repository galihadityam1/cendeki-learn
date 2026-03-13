"use client";
import { BASE_URL } from "@/db/config/constant";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";
import { GoogleButton } from "@/components/GoogleButton";

const Page = () => {
  const router = useRouter();
  
  async function submitAction(formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    const fullname = formData.get("fullname");
    const age = formData.get("age");
    
    if (!email) {
      return Swal.fire({
        title: "email required",
        showConfirmButton: false,
        timer: 1500,
        icon: "warning",
      });
    }
    if (!password) {
      return Swal.fire({
        title: "password required",
        showConfirmButton: false,
        timer: 1500,
        icon: "warning",
      });
    }

    let res = await fetch(`${BASE_URL}/api/register`, {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify({ email, password, fullname, age }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return Swal.fire({
        title: "Email sudah digunakan",
        showConfirmButton: false,
        timer: 1500,
        icon: "warning",
      });
    }

    Swal.fire({
      title: "berhasil register",
      showConfirmButton: false,
      timer: 1500,
      icon: "success",
    });
    return router.push("/login");
  }

  return (
    <>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-screen grid-cols-1 gap-8 py-8 lg:grid-cols-2 lg:gap-16">
          {/* Left Section - Hero/Welcome */}
          <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Join
              <br />
              Cendekia
            </h1>
            <div className="space-y-2">
              <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
                Start your learning journey today
              </p>
              <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary hover:text-primary font-semibold transition-all duration-200 hover:font-bold hover:underline"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>

          {/* Right Section - Registration Form */}
          <div className="flex flex-col justify-center space-y-6 lg:space-y-8">
            <div className="mx-auto w-full max-w-md space-y-6 lg:space-y-8">
              <h2 className="text-center text-2xl font-semibold lg:text-left lg:text-3xl">
                Create Account
              </h2>
              
              <form action={submitAction} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Full name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    name="fullname"
                    className="bg-accent h-12 w-full rounded-lg border border-gray-200 px-4 text-sm transition-all duration-200 placeholder:text-sky-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:text-base"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    className="bg-accent h-12 w-full rounded-lg border border-gray-200 px-4 text-sm transition-all duration-200 placeholder:text-sky-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:text-base"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Age
                  </label>
                  <input
                    type="number"
                    placeholder="Enter your age"
                    name="age"
                    className="bg-accent h-12 w-full rounded-lg border border-gray-200 px-4 text-sm transition-all duration-200 placeholder:text-sky-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:text-base"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Create a password"
                    name="password"
                    className="bg-accent h-12 w-full rounded-lg border border-gray-200 px-4 text-sm transition-all duration-200 placeholder:text-sky-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:text-base"
                  />
                </div>

                <div className="space-y-3 py-2">
                  <div className="flex items-start space-x-2">
                    <input 
                      type="checkbox" 
                      id="privacy-policy"
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="privacy-policy" className="text-sm text-gray-600">
                      You agree to our friendly{" "}
                      <button type="button" className="text-blue-500 underline transition-colors duration-200 hover:text-blue-700 hover:font-semibold">
                        privacy policy
                      </button>
                    </label>
                  </div>
                  
                  <div className="text-center text-sm text-gray-600 lg:text-left">
                    Already have an account?{" "}
                    <Link 
                      href="/login" 
                      className="text-blue-500 underline transition-colors duration-200 hover:text-blue-700 hover:font-semibold"
                    >
                      Back to Login
                    </Link>
                  </div>
                </div>
                
                <button 
                  type="submit"
                  className="bg-primary h-12 w-full rounded-lg px-4 font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  Create Account
                </button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-4 text-gray-500">or register with</span>
                </div>
              </div>

              <div className="flex justify-center">
                <GoogleButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;