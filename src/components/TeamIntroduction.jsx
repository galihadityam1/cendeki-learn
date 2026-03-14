import Image from "next/image";
import React from "react";

export default function TeamIntroduction() {
  return (
    <div
      id="about"
      className="relative mx-auto mt-16 flex w-full flex-col items-center justify-center px-4 sm:mt-24 sm:px-6 md:mt-32 md:px-8"
    >
      <div className="mb-12 flex flex-col gap-4 text-center">
        <h2 className="bg-gradient-to-br from-white to-slate-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
          About This Project
        </h2>
        <p className="mx-auto max-w-2xl text-base text-slate-400 sm:text-lg">
          An interactive learning platform that generates educational stories
          with fill-in-the-blank questions to make learning History and English
          more engaging and fun.
        </p>
      </div>

      <div className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-slate-700/50 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl sm:p-12 md:p-16">
        {/* Glow effect behind the profile picture */}
        <div className="pointer-events-none absolute left-1/2 top-16 h-64 w-64 -translate-x-1/2 rounded-full bg-sky-500/20 blur-[80px]" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="relative mb-6 sm:mb-8">
            <Image
              src="https://images.pexels.com/photos/279360/pexels-photo-279360.jpeg"
              width={380}
              height={380}
              alt="Developer"
              className="relative z-10 size-32 rounded-full border-4 border-slate-800 object-cover shadow-2xl sm:size-40 md:size-48"
            />
            {/* Animated rings around profile */}
            <div className="absolute inset-[-10px] animate-[spin_10s_linear_infinite] rounded-full border-2 border-sky-500/30 opacity-50" />
            <div className="absolute inset-[-20px] animate-[spin_15s_linear_infinite_reverse] rounded-full border border-indigo-500/20 opacity-30" />
          </div>

          <div className="flex flex-col items-center gap-2">
            <h3 className="text-center text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Galih Aditya Mohammad
            </h3>
            <div className="inline-flex items-center rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1">
              <p className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-sm font-bold uppercase tracking-widest text-transparent sm:text-base">
                Full-stack Developer
              </p>
            </div>
            <p className="mt-4 max-w-md text-center text-base leading-relaxed text-slate-300 sm:text-lg">
              Passionate about creating educational technology that makes
              learning interactive and enjoyable
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
