"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useMemo } from "react";
import Cookies from "universal-cookie";

export default function HeroBanner() {
  const cookies = useMemo(() => new Cookies(), []);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before checking cookies
  useEffect(() => {
    setMounted(true);
    setIsLoggedIn(!!cookies.get("Authorization"));
  }, [cookies]);

  const goToLogin = async () => {
    let data = await cookies.get("Authorization");
    if (!data) {
      return router.push("/login");
    }
    if (data) {
      const token = data.split(" ")[1];
      if (token) {
        return router.push("/lobby");
      }
    }
  };
  return (
    <div className="relative mx-auto mt-8 flex h-[400px] w-full max-w-[95%] flex-col items-center justify-center overflow-hidden rounded-3xl px-4 sm:mt-12 sm:h-[450px] sm:max-w-[90%] md:mt-16 md:h-[500px] md:max-w-[85%] lg:max-w-[1200px]">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
        style={{ backgroundImage: "url(/Learn.png)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-950/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 text-center drop-shadow-lg">
        <div className="inline-flex items-center rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-1.5 backdrop-blur-md">
          <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-xs font-bold uppercase tracking-widest text-transparent sm:text-sm">
            Welcome to Cendekia
          </span>
        </div>

        <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Where{" "}
          <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
            Education
          </span>{" "}
          Meets Entertainment
        </h1>

        <p className="max-w-2xl text-base text-slate-300 sm:text-lg md:text-xl">
          Discover a new way to learn through interactive stories and engaging
          challenges. Master new subjects while having fun.
        </p>

        {mounted && (
          <div className="mt-4 flex w-full max-w-sm flex-col items-center justify-center gap-4 sm:max-w-none sm:flex-row md:gap-6">
            {!isLoggedIn && (
              <button
                onClick={() => goToLogin()}
                className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-white px-8 py-3.5 font-bold text-slate-900 transition-all hover:scale-105 hover:bg-slate-50 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] sm:w-auto"
              >
                <span className="relative z-10">Log In</span>
              </button>
            )}
            <Link
              href={isLoggedIn ? "/lobby" : "#teaser"}
              className="group flex w-full items-center justify-center rounded-xl border border-sky-400/50 bg-sky-500/20 px-8 py-3.5 font-bold text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-sky-500/30 hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] sm:w-auto"
            >
              {isLoggedIn ? "Browse Categories" : "Try it for free"}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
