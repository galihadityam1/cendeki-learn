"use client";
import { BASE_URL } from "@/db/config/constant";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import { GoogleButton } from "@/components/GoogleButton";

import { SparklesCore } from "@/components/ui/sparkles";

const Page = () => {
  const cookies = new Cookies();
  const router = useRouter();

  async function submitAction(formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    if (!email) {
      return Swal.fire({
        title: "email required",
        showConfirmButton: false,
        timer: 1500,
        icon: "warning",
        background: "#0f172a",
        color: "#f8fafc",
      });
    }
    if (!password) {
      return Swal.fire({
        title: "password required",
        showConfirmButton: false,
        timer: 1500,
        icon: "warning",
        background: "#0f172a",
        color: "#f8fafc",
      });
    }

    let res = await fetch(`${BASE_URL}/api/login`, {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
    });

    const result = await res.json();

    if (!res.ok) {
      return Swal.fire({
        title: "Email/Password is Wrong",
        showConfirmButton: false,
        timer: 1500,
        icon: "warning",
        background: "#0f172a",
        color: "#f8fafc",
      });
    }

    if (result.errorMsg) {
      return Swal.fire({
        title: "Email/Password is Wrong",
        showConfirmButton: false,
        timer: 1500,
        icon: "warning",
        background: "#0f172a",
        color: "#f8fafc",
      });
    }

    Swal.fire({
      title: "Login Success",
      showConfirmButton: false,
      timer: 1500,
      icon: "success",
      background: "#0f172a",
      color: "#f8fafc",
    });
    cookies.set("Authorization", `Bearer ${result.accessToken}`);
    return router.push("/profile/details");
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-950 px-4 py-12 text-slate-100 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 z-0 h-screen w-full">
        <SparklesCore
          id="tsparticleslogin"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={50}
          className="h-full w-full"
          particleColor="#38bdf8"
        />
        <div className="absolute inset-0 bg-slate-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="absolute -left-1/4 top-1/4 h-1/2 w-1/2 rounded-full bg-sky-500/10 blur-[120px]" />
        <div className="absolute -right-1/4 bottom-1/4 h-1/2 w-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl pt-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Section - Hero/Welcome */}
          <div className="flex flex-col justify-center space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center self-center rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-1.5 backdrop-blur-md lg:self-start">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
                Welcome Back
              </span>
            </div>
            <h1 className="bg-gradient-to-br from-white to-slate-400 bg-clip-text text-5xl font-extrabold leading-tight tracking-tight text-transparent sm:text-6xl lg:text-7xl">
              Cendekia
              <br />
              <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
                Learning Platform
              </span>
            </h1>
            <div className="mt-4 space-y-2">
              <p className="text-lg leading-relaxed text-slate-400">
                Don&apos;t have an account yet?
              </p>
              <p className="text-lg leading-relaxed text-slate-400">
                Join us today and{" "}
                <Link
                  href="/register"
                  className="font-bold text-sky-400 decoration-2 underline-offset-4 transition-all duration-200 hover:text-sky-300 hover:underline"
                >
                  register here
                </Link>
              </p>
            </div>
          </div>

          {/* Right Section - Login Form */}
          <div className="mx-auto flex w-full max-w-md flex-col justify-center">
            <div className="w-full rounded-[2rem] border border-slate-700/50 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
              <h2 className="mb-8 text-center text-3xl font-bold text-white">
                Sign in to continue
              </h2>

              <form action={submitAction} className="space-y-5">
                <div className="space-y-1">
                  <label className="ml-1 text-sm font-semibold text-slate-300">
                    Email Address
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your email"
                    name="email"
                    className="h-14 w-full rounded-xl border border-slate-700 bg-slate-950/50 px-5 text-sm text-white shadow-inner transition-all duration-200 placeholder:text-slate-500 focus:border-sky-500 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-base"
                  />
                </div>

                <div className="space-y-1">
                  <label className="ml-1 text-sm font-semibold text-slate-300">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    className="h-14 w-full rounded-xl border border-slate-700 bg-slate-950/50 px-5 text-sm text-white shadow-inner transition-all duration-200 placeholder:text-slate-500 focus:border-sky-500 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-base"
                  />
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    className="text-sm font-medium text-sky-400 underline-offset-2 transition-colors duration-200 hover:text-sky-300 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="mt-4 h-14 w-full rounded-xl bg-sky-500 px-4 text-lg font-bold text-white shadow-lg shadow-sky-500/20 transition-all duration-300 hover:bg-sky-400 hover:shadow-sky-400/40 active:scale-[0.98]"
                >
                  Login to your account
                </button>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700/50"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-slate-900 px-4 font-medium text-slate-400">
                    or continue with
                  </span>
                </div>
              </div>

              <div className="flex w-full justify-center">
                <div className="w-full [&>button]:h-14 [&>button]:w-full [&>button]:rounded-xl [&>button]:border [&>button]:border-slate-700 [&>button]:bg-slate-800 [&>button]:transition-all [&>button]:duration-300 hover:[&>button]:bg-slate-700">
                  <GoogleButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
