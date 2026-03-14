import React from "react";
import HeroCard from "./HeroCard";

export default function HeroCategory() {
  return (
    <div className="relative py-12 sm:py-16 md:py-24">
      {/* Background decoration */}
      <div className="pointer-events-none absolute left-0 top-0 -z-10 h-full w-full overflow-hidden">
        <div className="absolute -left-1/4 top-1/4 h-1/2 w-1/2 rounded-full bg-sky-500/5 blur-[120px]" />
        <div className="absolute -right-1/4 bottom-1/4 h-1/2 w-1/2 rounded-full bg-indigo-500/5 blur-[120px]" />
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="mb-4 inline-flex items-center rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-1.5 backdrop-blur-md">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
            Explore Topics
          </span>
        </div>
        <h2 className="mb-6 text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
          Pick your favourite{" "}
          <span className="bg-gradient-to-r from-sky-400 to-sky-200 bg-clip-text text-transparent">
            Stories
          </span>
        </h2>
        <p className="max-w-2xl text-center text-base text-slate-300 sm:text-lg md:text-xl">
          Dive into our carefully curated categories. Whether you&apos;re a history
          buff or a science enthusiast, there&apos;s a journey waiting for you.
        </p>
      </div>

      <div className="relative mt-12 w-full">
        {/* Fade gradients for scroll edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-slate-950 to-transparent sm:w-24"></div>
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-slate-950 to-transparent sm:w-24"></div>

        <div className="hide-scrollbar flex w-full snap-x snap-mandatory flex-nowrap gap-6 overflow-x-auto px-6 py-4 pb-8 sm:gap-8 sm:px-12 md:px-24">
          {categories.map((el, idx) => {
            return (
              <div
                key={idx}
                className="shrink-0 snap-center first:pl-4 last:pr-4"
              >
                <HeroCard el={el} />
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
    category: "History",
    stories: Array(10).fill("story"),
    ready: true,
  },
  {
    category: "Language",
    stories: Array(10).fill("story"),
    ready: false,
  },
  {
    category: "Science",
    stories: Array(10).fill("story"),
    ready: false,
  },
  {
    category: "Mathematic",
    stories: Array(10).fill("story"),
    ready: false,
  },
  {
    category: "Sport",
    stories: Array(10).fill("story"),
    ready: false,
  },
  {
    category: "Astronomy",
    stories: Array(10).fill("story"),
    ready: false,
  },
  {
    category: "Art",
    stories: Array(10).fill("story"),
    ready: false,
  },
];
