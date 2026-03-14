import React, { useMemo } from "react";
import JourneyTitle from "./JourneyTitle";
import Link from "next/link";
import { FiAward } from "react-icons/fi";
import { cn } from "@/utils/cn";

export default function CompleteJourney({
  journey,
  correctAnswers,
  title,
  finalScore,
  timer,
}) {
  const questions = useMemo(() => {
    if (!journey) return [];

    // Handle both formats: ___1___ and ----
    const hasNumberedBlanks = /___\d+___/.test(journey);

    let parts;

    if (hasNumberedBlanks) {
      // Format: ___1___, ___2___, etc.
      parts = journey.split(/___\d+___/);
    } else {
      // Format: ---- (multiple dashes)
      parts = journey.split(/----+/);
    }

    return parts.map((part, idx) => {
      if (idx < correctAnswers.length) {
        return (
          <React.Fragment key={idx}>
            <span className="leading-loose text-slate-300">{part}</span>
            <span className="correct-answer mx-1 inline-flex items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-bold text-emerald-400">
              {correctAnswers[idx]}
            </span>
          </React.Fragment>
        );
      } else {
        return (
          <span className="leading-loose text-slate-300" key={idx}>
            {part}
          </span>
        );
      }
    });
  }, [journey, correctAnswers]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center justify-between gap-4 border-b border-slate-800/50 pb-6 sm:flex-row">
        <div className="flex flex-col justify-center gap-1 text-center sm:text-left">
          <JourneyTitle title={title} />
          <p className="text-sm font-medium text-emerald-400">
            Journey completed! Here are the correct answers:
          </p>
        </div>
        <Link
          href="/leaderboard"
          className="group flex h-12 items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-6 font-bold text-amber-500 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-amber-500 hover:text-white hover:shadow-amber-500/20 active:scale-95"
        >
          <FiAward className="size-5 transition-transform group-hover:scale-110" />
          <span>View Leaderboard</span>
        </Link>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-slate-900/50 shadow-inner">
        {/* Story Content */}
        <div className="p-6 text-justify indent-8 text-base leading-loose tracking-wide sm:p-8 sm:indent-12 sm:text-lg">
          {questions}
        </div>

        {/* Game Stats Footer */}
        <div className="flex w-full items-center justify-between border-t border-slate-800/80 bg-slate-950/80 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Final Score
            </span>
            <div className="flex h-8 items-center justify-center rounded-lg border border-sky-500/20 bg-sky-500/10 px-3">
              <span className="font-bold text-sky-400">{finalScore}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Time Left
            </span>
            <div className="flex h-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 px-3 font-bold text-white transition-colors">
              {timer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
