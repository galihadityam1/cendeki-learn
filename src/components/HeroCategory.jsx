import React from "react";
import HeroCard from "./HeroCard";

export default function HeroCategory() {
  return (
    <>
      <div className="mx-auto mt-16 sm:mt-24 md:mt-32 flex w-full justify-center max-w-[95%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-[60%] px-4">
        <p className="flex w-full text-wrap justify-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center leading-tight">
          Pick your favourite Stories
        </p>
      </div>
      <div className="mx-auto mt-8 sm:mt-12 md:mt-16 flex max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[80%] flex-nowrap gap-4 sm:gap-6 md:gap-8 overflow-x-auto py-2 px-4 sm:px-0">
        {categories.map((el, idx) => {
          return <HeroCard el={el} key={idx} />;
        })}
      </div>
    </>
  );
}

const categories = [
  {
    category: "History",
    stories: Array(10).fill("story"),
    ready: true
  },
  {
    category: "Language",
    stories: Array(10).fill("story"),
    ready: false
  },
  {
    category: "Science",
    stories: Array(10).fill("story"),
    ready: false
  },
  {
    category: "Mathematic",
    stories: Array(10).fill("story"),
    ready: false
  },
  {
    category: "Sport",
    stories: Array(10).fill("story"),
    ready: false
  },
  {
    category: "Astronomy",
    stories: Array(10).fill("story"),
    ready: false
  },
  {
    category: "Art",
    stories: Array(10).fill("story"),
    ready: false
  },
];