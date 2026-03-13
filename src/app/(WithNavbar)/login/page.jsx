"use client";
import { BASE_URL } from "@/db/config/constant";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import { GoogleButton } from "@/components/GoogleButton";

const Page = () => {
  const cookies = new Cookies()
  const router = useRouter();
  
  async function submitAction(formData) {
    const email = formData.get("email");
    const password = formData.get("password");;
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

    let res = await fetch(`${BASE_URL}/api/login`, {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
      mode: 'no-cors'
    });

    const result = await res.json();

    if (!res.ok) {
      return Swal.fire({
        title: "Email/Password is Wrong",
        showConfirmButton: false,
        timer: 1500,
        icon: "warning",
      });
    }

    if(result.errorMsg){
      return Swal.fire({
        title: "Email/Password is Wrong",
        showConfirmButton: false,
        timer: 1500,
        icon: "warning",
      });
    }

    Swal.fire({
      title: "Login Success",
      showConfirmButton: false,
      timer: 1500,
      icon: "success",
    });
    cookies.set("Authorization", `Bearer ${result.accessToken}`)
    return router.push("/profile/details");
  }

  return (
    <>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-screen grid-cols-1 gap-8 py-8 lg:grid-cols-2 lg:gap-16">
          {/* Left Section - Hero/Welcome */}
          <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Cendekia
              <br />
              Learning Platform
            </h1>
            <div className="space-y-2">
              <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
                If you don&apos;t have an account
              </p>
              <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
                You can{" "}
                <Link
                  href="/register"
                  className="text-primary hover:text-primary font-semibold transition-all duration-200 hover:font-bold hover:underline"
                >
                  register here
                </Link>
              </p>
            </div>
          </div>

          {/* Right Section - Login Form */}
          <div className="flex flex-col justify-center space-y-6 lg:space-y-8">
            <div className="mx-auto w-full max-w-md space-y-6 lg:space-y-8">
              <h2 className="text-center text-2xl font-semibold lg:text-left lg:text-3xl">
                Sign in
              </h2>
              
              <form action={submitAction} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Enter email"
                    name="email"
                    className="bg-accent h-12 w-full rounded-lg border border-gray-200 px-4 text-sm transition-all duration-200 placeholder:text-sky-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:text-base"
                  />
                </div>
                
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="bg-accent h-12 w-full rounded-lg border border-gray-200 px-4 text-sm transition-all duration-200 placeholder:text-sky-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:text-base"
                  />
                </div>
                
                <div className="text-right">
                  <button type="button" className="text-sm text-gray-500 transition-colors duration-200 hover:text-gray-700">
                    Forgot password?
                  </button>
                </div>
                
                <button 
                  type="submit"
                  className="bg-primary h-12 w-full rounded-lg px-4 font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  Login
                </button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-4 text-gray-500">or continue with</span>
                </div>
              </div>

              <div className="flex justify-center">
                <GoogleButton/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;