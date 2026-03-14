import React, { useState } from "react";
import { HighestScore, HighestScorer } from "./Highest";
import { BASE_URL } from "@/db/config/constant";

export function JourneyCard({
  el,
  setJourneyList,
  setGenerating,
  setLoading,
  setStoryId,
  setJourney,
  setCorrectAnswers,
  setAnswers,
  setScores,
  setTitle,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const getStoryById = async (storyId) => {
    if (isLoading) return; // Prevent multiple clicks

    setIsLoading(true);
    setJourneyList([]);
    setGenerating(true);
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/journey/collect`, {
        method: "POST",
        cache: "no-store",
        body: JSON.stringify(storyId),
      });

      if (!res.ok) {
        console.error("Failed to fetch story");
        return;
      }

      const { data } = await res.json();

      setJourney(data.story);
      setStoryId(data._id);
      setCorrectAnswers(data.answer);
      setAnswers(Array(data.answer.length).fill(""));
      setScores(Array(data.answer.length).fill(0));
      setTitle(data.title);
    } catch (error) {
      console.error("Error fetching story:", error);
    } finally {
      setGenerating(false);
      setLoading(false);
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: 'url("/roman-style.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="group relative flex h-[24rem] w-full max-w-[300px] flex-col justify-between overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/80 shadow-xl backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-sky-500/30 hover:shadow-[0_20px_40px_rgba(56,189,248,0.15)]"
    >
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/80 transition-opacity duration-300 group-hover:from-slate-900/70 group-hover:to-slate-900/90" />

      {/* Content wrapper */}
      <div className="relative z-10 flex h-full flex-col justify-between p-6">
        {/* Header with title and category */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1.5 backdrop-blur-sm">
            <div className="h-2 w-2 animate-pulse rounded-full bg-sky-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
              {el.category || "Adventure"}
            </span>
          </div>

          <h3 className="text-2xl font-black tracking-tight text-white drop-shadow-lg transition-colors duration-300 group-hover:text-sky-100">
            {el.title}
          </h3>
        </div>

        {/* Stats Card */}
        <div className="mt-auto rounded-2xl border border-slate-700/50 bg-slate-800/60 p-5 backdrop-blur-md transition-all duration-300 group-hover:border-slate-600/50 group-hover:bg-slate-800/80">
          <div className="space-y-4">
            {/* High Score Display */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 p-1">
                  <svg
                    className="h-full w-full text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                  High Score
                </span>
              </div>
              <div className="text-right">
                {el.highestScore ? (
                  <div className="flex items-center gap-2">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-2xl font-black text-transparent">
                      {el.highestScore}
                    </span>
                    <span className="text-sm text-slate-400">pts</span>
                  </div>
                ) : (
                  <span className="text-sm italic text-slate-500">
                    No record yet
                  </span>
                )}
              </div>
            </div>

            {/* Champion Display */}
            {el.highestScorer && (
              <div className="flex items-center justify-between border-t border-slate-700/50 pt-3">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-sky-400 to-blue-500 p-1">
                    <svg
                      className="h-full w-full text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                    Champion
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-sky-400" />
                  <span className="text-sm font-medium text-sky-300">
                    {el.highestScorer}
                  </span>
                </div>
              </div>
            )}

            {/* Action Button */}
            <button
              onClick={() => getStoryById(el._id)}
              disabled={isLoading}
              className={`w-full rounded-xl border px-6 py-3 font-bold transition-all duration-300 active:scale-95 ${
                isLoading
                  ? "cursor-not-allowed border-slate-600 bg-slate-700/50 text-slate-400"
                  : "border-sky-500/50 bg-sky-500/20 text-sky-300 hover:border-sky-400 hover:bg-sky-500/30 hover:text-sky-200 hover:shadow-lg hover:shadow-sky-500/20"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-sky-400 border-t-transparent" />
                  <span>Loading...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>Start Journey</span>
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Decorative corner accent */}
      <div className="absolute right-4 top-4 h-8 w-8 rounded-full border-2 border-sky-500/30 bg-sky-500/10 transition-all duration-300 group-hover:border-sky-400/50 group-hover:bg-sky-400/20" />
    </div>
  );
}
