import React from "react";

export default function TechStack() {
  return (
    <div className="mx-auto mt-16 sm:mt-24 md:mt-32 flex max-w-[95%] sm:max-w-[90%] md:max-w-[80%] flex-col items-center justify-center gap-8 sm:gap-12 md:gap-16 px-4 sm:px-0">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center">
        Our Tech Stack
      </h2>
      <div className="flex flex-col sm:flex-row w-full sm:w-[90%] md:w-[80%] items-center justify-center gap-8 sm:gap-10 md:gap-12 lg:gap-16">
        <div className="flex flex-col items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            className="size-12 sm:size-14 md:size-16 lg:size-20"
            alt="React"
          />
          <p className="mt-2 text-sm sm:text-base font-medium">React</p>
        </div>
        <div className="flex flex-col items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg"
            alt="Next.js"
            className="w-20 sm:w-24 md:w-28 lg:w-32 h-auto"
          />
          <p className="mt-2 text-sm sm:text-base font-medium">Next.js</p>
        </div>
        <div className="flex flex-col items-center">
          <img
            className="w-24 sm:w-28 md:w-32 lg:w-36 h-auto"
            src="https://upload.wikimedia.org/wikipedia/commons/9/95/Tailwind_CSS_logo.svg"
            alt="Tailwind CSS"
          />
          <p className="mt-2 text-sm sm:text-base font-medium">Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}