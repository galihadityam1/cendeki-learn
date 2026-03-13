import React from "react";
import { cn } from "@/utils/cn";

export default function HeroIntro({ className }) {
  return (
    <>
      {/* Hero Intro */}
      <div
        className={cn(
          "mx-auto mt-16 sm:mt-24 md:mt-32 flex max-w-[95%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-[60%] flex-col items-center gap-4 sm:gap-6 md:gap-8 px-4 sm:px-0",
          className,
        )}
      >
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-center leading-tight">
          Why Cendekia?
        </h1>
        <p className="text-center text-sm sm:text-base md:text-lg leading-relaxed max-w-4xl">
          We are an educational platform designed to facilitate learning management. It offers a range of features aimed at enhancing the teaching and learning experience for both educators and students.
        </p>
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 md:gap-16 items-center w-full justify-center">
          <div className="text-center">
            <p className="text-primary text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold">
              300+
            </p>
            <p className="text-primary text-center text-sm sm:text-base md:text-lg mt-1 sm:mt-2">
              Variety of Stories
            </p>
          </div>
          <div className="text-center">
            <p className="text-primary text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold">
              10.000
            </p>
            <p className="text-primary text-center text-sm sm:text-base md:text-lg mt-1 sm:mt-2">
              Monthly Users
            </p>
          </div>
        </div>
      </div>
    </>
  );
}