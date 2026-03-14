import React from "react";
import JourneyTitle from "./JourneyTitle";
import Skeleton from "./ui/skeleton";
import { ImSpinner9 } from "react-icons/im";

export default function LoadingSkeleton() {
  return (
    <div className="rounded-[2rem] border border-slate-800/60 bg-slate-900/60 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex flex-col justify-center gap-2">
          <Skeleton className="h-10 w-64 rounded-xl bg-slate-800" />
          <Skeleton className="h-6 w-48 rounded-lg bg-slate-800/50" />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/50 shadow-inner">
        <div className="relative flex min-h-[300px] flex-col items-center justify-center p-8">
          {/* Animated subtle glow */}
          <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[50px]" />

          <div className="relative flex flex-col items-center justify-center">
            <ImSpinner9 className="size-24 animate-[spin_3s_linear_infinite] text-sky-500/20" />
            <ImSpinner9 className="absolute size-12 animate-[spin_1.5s_linear_infinite_reverse] text-sky-400" />
          </div>

          <div className="mt-8 flex flex-col items-center gap-3">
            <h3 className="animate-pulse bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-xl font-bold text-transparent">
              Generating your journey
            </h3>
            <p className="max-w-xs text-center text-sm text-slate-400">
              AI generation may take up to 1 minute. Please wait while we craft
              your interactive story...
            </p>
          </div>
        </div>

        <div className="flex w-full items-center justify-between border-t border-slate-700/50 bg-slate-800/50 px-6 py-4">
          <Skeleton className="h-8 w-24 rounded-lg bg-slate-700" />
          <Skeleton className="h-8 w-24 rounded-lg bg-slate-700" />
        </div>
      </div>
    </div>
  );
}
