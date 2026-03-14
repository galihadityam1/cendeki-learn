"use client";

import React from "react";
import { profile } from "@/actions/actions";
import ButtonTryAgain from "@/components/ButtonTryAgain";
import { SparklesCore } from "@/components/ui/sparkles";

export default function Page() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const result = await profile();
        setData(result);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  let histories = data?.history;

  if (loading) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 px-4 py-12 text-slate-100 sm:px-6 lg:px-8">
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-sky-400"></div>
            <p className="mt-4 text-slate-400">Loading history...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 px-4 py-12 text-slate-100 sm:px-6 lg:px-8">
      {/* Background Sparkles */}
      <div className="pointer-events-none absolute inset-0 z-0 h-screen w-full">
        <SparklesCore
          id="tsparticleshistory"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={30}
          className="h-full w-full"
          particleColor="#38bdf8"
        />
        <div className="absolute inset-0 bg-slate-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl pt-8">
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <div className="inline-flex items-center rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-1.5 backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
              Learning History
            </span>
          </div>
          <h1 className="bg-gradient-to-br from-white to-slate-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
            Previous Journeys
          </h1>
        </div>

        <div className="mx-auto w-full max-w-4xl">
          <div className="rounded-[2rem] border border-slate-800/60 bg-slate-900/40 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            <div className="flex w-full flex-col gap-6">
              {histories && histories.length > 0 ? (
                histories.map((el, idx) => {
                  return (
                    <div
                      key={idx}
                      className="group relative flex flex-col gap-6 overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/30 hover:shadow-[0_0_20px_rgba(56,189,248,0.1)]"
                    >
                      <div
                        className="absolute inset-0 opacity-20 transition-transform duration-700 group-hover:scale-105"
                        style={{
                          backgroundImage: 'url("/roman-style.png")',
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent" />

                      <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="rounded-lg border border-sky-500/30 bg-sky-500/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-sky-400">
                              {el.category}
                            </span>
                            <span className="text-sm font-medium text-slate-400">
                              {el.playDate.split("T")[0]}
                            </span>
                          </div>
                          <h2 className="text-xl font-bold text-white transition-colors group-hover:text-sky-300 sm:text-2xl">
                            {el.title}
                          </h2>
                        </div>

                        <div className="flex flex-col gap-3 sm:items-end">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium uppercase tracking-widest text-slate-400">
                              Score
                            </span>
                            <span className="text-2xl font-black text-white drop-shadow-md">
                              {el.score}
                            </span>
                          </div>
                          <ButtonTryAgain id={el.storyId} />
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 rounded-full bg-slate-800 p-4 text-slate-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-white">
                    No history found
                  </h3>
                  <p className="text-slate-400">
                    You haven&apos;t completed any learning journeys yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
