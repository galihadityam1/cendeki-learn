import React, { useMemo } from "react";
import JourneyTitle from "./JourneyTitle";
import Link from "next/link";

export default function CompleteJourney({
  journey,
  correctAnswers,
  title,
  finalScore,
  timer,
}) {
  const questions = useMemo(() => {
    if (!journey) return [];

    const parts = journey.split(/___\d+___/);

    return parts.map((part, idx) => {
      if (idx < correctAnswers.length) {
        return (
          <React.Fragment key={idx}>
            <span className="">{part}</span>
            <span className="correct-answer relative font-bold italic text-green-600">
              {correctAnswers[idx]}
            </span>
          </React.Fragment>
        );
      } else {
        return (
          <span className="" key={idx}>
            {part}
          </span>
        );
      }
    });
  }, [journey, correctAnswers]);

  return (
    <div className="border-primary mx-auto max-w-[80dvw] rounded-lg border p-4 md:max-w-[60dvw]">
      <div className="flex items-center justify-between">
        <div className="flex flex-col justify-center gap-1">
          <JourneyTitle title={title} />
          <p>Here are the correct answers:</p>
        </div>
        <Link
          href="/leaderboard"
          className="border-primary h-12 w-48 content-center rounded-xl border text-center hover:shadow hover:shadow-sky-400"
        >
          To Leaderboard
        </Link>
      </div>
      <div className="border-primary mt-4 rounded-lg border">
        <p className="p-4 text-justify indent-10 leading-loose tracking-tight">
          {questions}
        </p>
        <div className="bg-primary flex w-full justify-between">
          <p className="px-4 py-2 font-bold text-white">Score: {finalScore}</p>
          <p className="px-4 py-2 font-bold text-white">Time: {timer}</p>
        </div>
      </div>
    </div>
  );
}
