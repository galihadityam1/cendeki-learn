import React from "react";
import { FiCpu, FiSearch } from "react-icons/fi";

export default function PromptAPI({
  category,
  generatePrompt,
  setQuestion,
  generating,
}) {
  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-6 rounded-[2rem] border border-slate-800/60 bg-slate-900/40 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1">
          <FiCpu className="size-4 text-sky-400" />
          <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
            Subject: {category}
          </span>
        </div>
        <p className="mt-2 max-w-md text-sm text-slate-400">
          Create your unique learning path for this subject using AI-generated
          stories.
        </p>
      </div>

      <div className="flex w-full flex-col items-center gap-3 sm:flex-row">
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <FiSearch className="size-5 text-slate-500" />
          </div>
          <input
            type="text"
            className={`h-14 w-full rounded-xl border pl-11 pr-4 text-sm shadow-inner transition-all duration-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 ${
              generating
                ? "cursor-not-allowed border-slate-700 bg-slate-950/80 text-slate-500"
                : "border-slate-700 bg-slate-950/50 text-white focus:border-sky-500 focus:bg-slate-900 focus:ring-sky-500"
            }`}
            onKeyDown={generatePrompt}
            placeholder={
              generating
                ? "Generating story..."
                : `Ask any topic about ${category.toLowerCase()}...`
            }
            onChange={(e) => setQuestion(e.target.value)}
            disabled={generating}
          />
        </div>
        <button
          className={`h-14 w-full shrink-0 rounded-xl px-8 font-bold transition-all duration-300 active:scale-95 sm:w-auto ${
            generating
              ? "cursor-not-allowed border border-slate-600 bg-slate-700 text-slate-500"
              : "border border-sky-500 bg-sky-500 text-white shadow-lg shadow-sky-500/20 hover:bg-sky-400 hover:shadow-sky-400/40"
          }`}
          onClick={generatePrompt}
          disabled={generating}
        >
          {generating ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-sky-400 border-t-transparent"></div>
              <span>Generating...</span>
            </div>
          ) : (
            "Generate Story"
          )}
        </button>
      </div>
    </div>
  );
}
