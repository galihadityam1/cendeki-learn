import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function HeroCard({ el }) {
  return (
    <>
      {el.ready === true ? (
        <Link href="/lobby" className="group block h-full">
          <div className="relative flex h-[470px] w-[320px] flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 transition-all duration-500 hover:-translate-y-2 hover:border-sky-500/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.2)]">
            {/* Image Container with gradient overlay */}
            <div className="absolute inset-0">
              <Image
                src={`/${el.category}.png`}
                alt={el.category}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                width={320}
                height={470}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-80" />
            </div>

            {/* Content overlay */}
            <div className="relative z-10 flex h-full flex-col justify-end p-6">
              <div className="flex flex-col gap-2">
                <div className="inline-flex items-center self-start rounded-full border border-sky-400/30 bg-sky-500/20 px-3 py-1 backdrop-blur-md">
                  <span className="text-xs font-bold uppercase tracking-widest text-sky-300">
                    Available
                  </span>
                </div>
                <h3 className="text-3xl font-black tracking-tight text-white drop-shadow-md">
                  {el.category}
                </h3>
                <p className="text-sm font-medium text-slate-300">
                  {el.stories?.length || 0} Interactive Stories
                </p>
              </div>

              {/* Hover arrow indicator */}
              <div className="absolute bottom-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:border-sky-400 group-hover:bg-sky-500 group-hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinelinejoin="round"
                  className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                >
                  <line x1="5" y1="19" x2="19" y2="5"></line>
                  <polyline points="10 5 19 5 19 14"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <div className="relative flex h-[470px] w-[320px] flex-col overflow-hidden rounded-3xl border border-slate-800/50 bg-slate-950 opacity-80 grayscale-[0.8]">
          {/* Image Container with heavy gradient overlay */}
          <div className="absolute inset-0">
            <Image
              src={`/${el.category}.png`}
              alt={el.category}
              className="h-full w-full object-cover opacity-40"
              width={320}
              height={470}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-900/60" />
          </div>

          {/* Content overlay */}
          <div className="relative z-10 flex h-full flex-col justify-end p-6">
            <div className="flex flex-col gap-2">
              <div className="inline-flex items-center self-start rounded-full border border-slate-700 bg-slate-800/50 px-3 py-1 backdrop-blur-md">
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-slate-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-slate-500"></span>
                  </span>
                  Coming Soon
                </span>
              </div>
              <h3 className="text-3xl font-black tracking-tight text-slate-300 drop-shadow-md">
                {el.category}
              </h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
