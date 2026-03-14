import React from "react";
import { cn } from "@/utils/cn";

export default function HeroIntro({ className }) {
  return (
    <div
      className={cn(
        "relative mx-auto mt-16 flex w-full flex-col items-center px-4 sm:mt-24 sm:px-6 md:mt-32 md:px-8",
        className,
      )}
    >
      {/* Container with modern card look */}
      <div className="relative flex w-full max-w-6xl flex-col items-center overflow-hidden rounded-[2.5rem] bg-slate-900 px-6 py-16 text-center sm:px-12 sm:py-24 md:px-20 lg:py-32">
        {/* Abstract background shapes */}
        <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-sky-500/20 blur-[80px]" />
        <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-indigo-500/20 blur-[80px]" />

        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative z-10 flex flex-col items-center">
          <h2 className="mb-6 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
            Why Choose Cendekia?
          </h2>
          <p className="mb-16 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg md:text-xl">
            We are an educational platform designed to facilitate learning
            management. It offers a range of features aimed at enhancing the
            teaching and learning experience for both educators and students
            through interactive storytelling.
          </p>

          {/* Stats section */}
          <div className="flex w-full flex-col items-center justify-center gap-12 sm:flex-row sm:gap-20 md:gap-32">
            <div className="group flex flex-col items-center transition-transform hover:-translate-y-2">
              <div className="relative">
                <p className="bg-gradient-to-r from-sky-400 to-sky-200 bg-clip-text text-5xl font-black text-transparent sm:text-6xl md:text-7xl lg:text-8xl">
                  300+
                </p>
                <div className="absolute -inset-4 z-[-1] rounded-full bg-sky-500/20 blur-2xl transition-all group-hover:bg-sky-500/30" />
              </div>
              <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-slate-400 sm:text-base">
                Curated Stories
              </p>
            </div>

            <div className="hidden h-24 w-px bg-gradient-to-b from-transparent via-slate-700 to-transparent sm:block" />

            <div className="group flex flex-col items-center transition-transform hover:-translate-y-2">
              <div className="relative">
                <p className="bg-gradient-to-r from-indigo-400 to-indigo-200 bg-clip-text text-5xl font-black text-transparent sm:text-6xl md:text-7xl lg:text-8xl">
                  10K+
                </p>
                <div className="absolute -inset-4 z-[-1] rounded-full bg-indigo-500/20 blur-2xl transition-all group-hover:bg-indigo-500/30" />
              </div>
              <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-slate-400 sm:text-base">
                Active Learners
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
