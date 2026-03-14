import React, { useMemo, useCallback } from "react";
import { CorrectFeedback, IncorrectFeedback } from "./Feedback";
import JourneyTitle from "./JourneyTitle";
import { FiPlay } from "react-icons/fi";
import { cn } from "@/utils/cn";

export default function IncompleteJourney({
  journey,
  answers,
  title,
  border,
  scores,
  timer,
  finalScore,
  setAnswers,
  onClickStart,
  feedback,
  handleSubmit,
  gameStart,
}) {
  const questions = useMemo(() => {
    if (!journey) return [];

    const parts = journey.split(/___\d+___/);
    const blanks = journey.match(/___\d+___/g) || [];

    return parts.map((part, idx) => {
      if (idx < blanks.length) {
        return (
          <React.Fragment key={idx}>
            <span className="leading-loose text-slate-300">{part}</span>
            <span className="relative mx-1 inline-flex items-center font-bold">
              <input
                type="text"
                disabled={!gameStart}
                placeholder={gameStart ? "Type here..." : "Start to play"}
                value={answers[idx] || ""}
                onKeyDown={handleSubmit}
                onChange={(e) => {
                  const newAnswers = [...answers];
                  newAnswers[idx] = e.target.value;
                  setAnswers(newAnswers);
                }}
                className={cn(
                  "inline h-8 w-32 rounded-lg px-3 text-center text-sm text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500 sm:w-40",
                  !gameStart &&
                    "cursor-not-allowed border border-slate-700/50 bg-slate-800/50 text-slate-500 placeholder-slate-600",
                  gameStart &&
                    border[idx] === "" &&
                    "border border-slate-600 bg-slate-900 text-white placeholder-slate-500 hover:border-sky-400/50",
                  border[idx] !== "" && border[idx],
                )}
              />
              {feedback[idx] === "Correct" && (
                <span className="absolute -top-6 left-1/2 -translate-x-1/2">
                  <CorrectFeedback scores={scores[idx]} />
                </span>
              )}
              {feedback[idx] === "Incorrect" && (
                <span className="absolute -top-6 left-1/2 -translate-x-1/2">
                  <IncorrectFeedback scores={scores[idx]} />
                </span>
              )}
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
  }, [
    journey,
    answers,
    border,
    scores,
    feedback,
    gameStart,
    handleSubmit,
    setAnswers,
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center justify-between gap-4 border-b border-slate-800/50 pb-6 sm:flex-row">
        <div className="flex flex-col justify-center gap-1 text-center sm:text-left">
          <JourneyTitle title={title} />
          <p className="text-sm text-slate-400">
            Read carefully and fill in the missing blanks below
          </p>
        </div>
        {!gameStart && (
          <button
            onClick={onClickStart}
            className="group flex h-12 items-center gap-2 rounded-xl bg-sky-500 px-6 font-bold text-white shadow-lg shadow-sky-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-sky-400 hover:shadow-sky-400/40 active:scale-95"
          >
            <FiPlay className="size-5 transition-transform group-hover:scale-110" />
            <span>Start Journey</span>
          </button>
        )}
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/50 shadow-inner">
        {/* Story Content */}
        <div className="p-6 text-justify indent-8 text-base leading-loose tracking-wide sm:p-8 sm:indent-12 sm:text-lg">
          {questions}
        </div>

        {/* Game Stats Footer */}
        <div className="flex w-full items-center justify-between border-t border-slate-800/80 bg-slate-950/80 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Score
            </span>
            <div className="flex h-8 items-center justify-center rounded-lg border border-sky-500/20 bg-sky-500/10 px-3">
              <span className="font-bold text-sky-400">{finalScore}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Time Left
            </span>
            <div
              className={cn(
                "flex h-8 items-center justify-center rounded-lg border px-3 font-bold transition-colors",
                timer.startsWith("00:0") && parseInt(timer.split(":")[1]) < 10
                  ? "animate-pulse border-rose-500/30 bg-rose-500/10 text-rose-400"
                  : "border-slate-700 bg-slate-800 text-white",
              )}
            >
              {timer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
