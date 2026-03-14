"use client";
import { BASE_URL } from "@/db/config/constant";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { GoogleButton } from "@/components/GoogleButton";
import { SparklesCore } from "@/components/ui/sparkles";

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
        background: "#0f172a",
        color: "#f8fafc",
      });
    }

    Swal.fire({
      title: "berhasil register",
      showConfirmButton: false,
      timer: 1500,
      icon: "success",
      background: "#0f172a",
      color: "#f8fafc",
    });
    return router.push("/login");
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-950 px-4 py-12 text-slate-100 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 z-0 h-screen w-full">
        <SparklesCore
          id="tsparticlesregister"
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

      <div className="relative z-10 mx-auto w-full max-w-6xl pt-16">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Section - Hero/Welcome */}
          <div className="flex flex-col justify-center space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center self-center rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-1.5 backdrop-blur-md lg:self-start">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
                Join the Journey
              </span>
            </div>
            <h1 className="bg-gradient-to-br from-white to-slate-400 bg-clip-text text-5xl font-extrabold leading-tight tracking-tight text-transparent sm:text-6xl lg:text-7xl">
              Start Learning
              <br />
              <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
                With Cendekia
              </span>
            </h1>
            <div className="mt-4 space-y-2">
              <p className="text-lg leading-relaxed text-slate-400">
                Already have an account?
              </p>
              <p className="text-lg leading-relaxed text-slate-400">
                Welcome back,{" "}
                <Link
                  href="/login"
                  className="font-bold text-sky-400 decoration-2 underline-offset-4 transition-all duration-200 hover:text-sky-300 hover:underline"
                >
                  sign in here
                </Link>
              </p>
            </div>
          </div>

          {/* Right Section - Registration Form */}
          <div className="mx-auto flex w-full max-w-md flex-col justify-center">
            <div className="w-full rounded-[2rem] border border-slate-700/50 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
              <h2 className="mb-8 text-center text-3xl font-bold text-white">
                Create Account
              </h2>

              <form action={submitAction} className="space-y-5">
                <div className="space-y-1">
                  <label className="ml-1 text-sm font-semibold text-slate-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    name="fullname"
                    className="h-12 w-full rounded-xl border border-slate-700 bg-slate-950/50 px-5 text-sm text-white shadow-inner transition-all duration-200 placeholder:text-slate-500 focus:border-sky-500 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-base"
                  />
                </div>

                <div className="space-y-1">
                  <label className="ml-1 text-sm font-semibold text-slate-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    className="h-12 w-full rounded-xl border border-slate-700 bg-slate-950/50 px-5 text-sm text-white shadow-inner transition-all duration-200 placeholder:text-slate-500 focus:border-sky-500 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-base"
                  />
                </div>

                <div className="space-y-1">
                  <label className="ml-1 text-sm font-semibold text-slate-300">
                    Age
                  </label>
                  <input
                    type="number"
                    placeholder="Enter your age"
                    name="age"
                    className="h-12 w-full rounded-xl border border-slate-700 bg-slate-950/50 px-5 text-sm text-white shadow-inner transition-all duration-200 placeholder:text-slate-500 focus:border-sky-500 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-base"
                  />
                </div>

                <div className="space-y-1">
                  <label className="ml-1 text-sm font-semibold text-slate-300">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Create a password"
                    name="password"
                    className="h-12 w-full rounded-xl border border-slate-700 bg-slate-950/50 px-5 text-sm text-white shadow-inner transition-all duration-200 placeholder:text-slate-500 focus:border-sky-500 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-base"
                  />
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="privacy-policy"
                      className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-900 text-sky-500 focus:ring-sky-500 focus:ring-offset-slate-900"
                    />
                    <label
                      htmlFor="privacy-policy"
                      className="text-sm leading-tight text-slate-400"
                    >
                      I agree to the{" "}
                      <button
                        type="button"
                        className="font-medium text-sky-400 transition-colors hover:text-sky-300 hover:underline"
                      >
                        privacy policy
                      </button>{" "}
                      and terms of service.
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-2 h-14 w-full rounded-xl bg-sky-500 px-4 text-lg font-bold text-white shadow-lg shadow-sky-500/20 transition-all duration-300 hover:bg-sky-400 hover:shadow-sky-400/40 active:scale-[0.98]"
                >
                  Create Account
                </button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700/50"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-slate-900 px-4 font-medium text-slate-400">
                    or register with
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
