"use client";
import React from "react";
import Link from "next/link";
import { SparklesCore } from "@/components/ui/sparkles";
import { FiPlus, FiList } from "react-icons/fi";

export default function Page() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 px-4 py-12 text-slate-100 sm:px-8">
      {/* Background Sparkles */}
      <div className="pointer-events-none absolute inset-0 z-0 h-screen w-full">
        <SparklesCore
          id="tsparticleslobby"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={50}
          className="h-full w-full"
          particleColor="#38bdf8"
        />
        <div className="absolute inset-0 bg-slate-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-full w-full max-w-7xl flex-col items-center justify-start pt-8">
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <div className="inline-flex items-center rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-1.5 backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
              Interactive Journeys
            </span>
          </div>
          <h1 className="bg-gradient-to-br from-white to-slate-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">
            Choose Your Category
          </h1>
          <p className="max-w-2xl text-base text-slate-400 sm:text-lg">
            Select a subject to explore. Start a new generated story or browse
            curated classics.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 place-items-center gap-8 md:grid-cols-2 lg:gap-12">
          {categories.map((el, idx) => {
            const category = el.name.toLowerCase();
            return (
              <div
                key={idx}
                className={`group relative flex w-full max-w-md flex-col overflow-hidden rounded-[2rem] border ${
                  el.soon
                    ? "border-slate-800 bg-slate-900/50 opacity-70 grayscale-[0.8]"
                    : "border-slate-700/50 bg-slate-900 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-sky-500/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.2)]"
                }`}
              >
                <div className="relative h-64 w-full overflow-hidden bg-cover">
                  <img
                    src={`/${el.name}.png`}
                    alt={el.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />

                  {el.soon && (
                    <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-slate-950/80 backdrop-blur-sm">
                      <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/80 px-4 py-2">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-slate-400 opacity-75"></span>
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-slate-500"></span>
                        </span>
                        <span className="text-sm font-bold uppercase tracking-wider text-slate-300">
                          Coming Soon
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative z-10 flex flex-col gap-6 p-6 sm:p-8">
                  <h2 className="text-center text-3xl font-black tracking-tight text-white drop-shadow-md">
                    {el.name}
                  </h2>

                  {el.soon ? (
                    <div className="flex w-full justify-center gap-4">
                      <div className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 py-3 text-sm font-semibold text-slate-500">
                        <FiPlus /> New Story
                      </div>
                      <div className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 py-3 text-sm font-semibold text-slate-500">
                        <FiList /> All Stories
                      </div>
                    </div>
                  ) : (
                    <div className="flex w-full justify-center gap-4">
                      <Link
                        href={`/${category}/new`}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 py-3 text-sm font-bold text-white shadow-lg shadow-sky-500/20 transition-all hover:bg-sky-400 hover:shadow-sky-400/40 active:scale-95"
                      >
                        <FiPlus className="size-5" /> Generate New
                      </Link>
                      <Link
                        href={`/${category}/curated`}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-600 bg-slate-800/50 py-3 text-sm font-bold text-slate-300 transition-all hover:border-sky-500/50 hover:bg-slate-800 hover:text-white active:scale-95"
                      >
                        <FiList className="size-5" /> Browse Curated
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const categories = [
  {
    name: "History",
  },
  {
    name: "Language",
    soon: "Coming Soon",
  },
  {
    name: "Science",
    soon: "Coming Soon",
  },
  {
    name: "Art",
    soon: "Coming Soon",
  },
];
