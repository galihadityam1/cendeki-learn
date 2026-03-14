"use client";

import React, { useEffect, useState } from "react";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

export default function Teaser({ animationData }) {
  const journey = {
    fullStory:
      "In 1945, Indonesia was under Dutch colonial rule, which had lasted for over three centuries. The Indonesian people had been striving for independence and had formed various nationalist movements to resist colonial domination. One of the key figures in the struggle for independence was Sukarno, who played a pivotal role in uniting different factions under the banner of nationalism. On August 17, 1945, Sukarno and Mohammad Hatta proclaimed Indonesia's independence, marking the beginning of the nation's journey as a sovereign state. However, the road to independence was not easy, as it was met with resistance from the Dutch colonial authorities and internal conflicts among different political groups. Despite these challenges, the spirit of nationalism and the desire for self-determination drove the Indonesian people towards achieving their independence.",
    story:
      "In 1945, Indonesia was under ---- colonial rule, which had lasted for over ---- centuries. The Indonesian people had been striving for ---- and had formed various ---- movements to resist colonial domination. One of the key figures in the struggle for independence was ----, who played a pivotal role in uniting different ---- under the banner of nationalism. On August 17, 1945, ---- and Mohammad Hatta proclaimed Indonesia's ----, marking the beginning of the nation's journey as a sovereign state. However, the road to independence was met with ---- from the Dutch colonial authorities and internal ---- among different political groups. Despite these challenges, the spirit of ---- and the desire for ---- drove the Indonesian people towards achieving their independence.",
    answer: [
      "Dutch",
      "three",
      "independence",
      "nationalist",
      "Sukarno",
      "factions",
      "Sukarno",
      "independence",
      "resistance",
      "conflicts",
      "nationalism",
      "self-determination",
    ],
    references: [
      "https://www.history.com/topics/southeast-asia/indonesia",
      "https://www.britannica.com/place/Indonesia/The-Revolutionary-Period",
    ],
  };

  const [answers, setAnswers] = useState(Array(journey.answer.length).fill(""));
  const [feedback, setFeedback] = useState(
    Array(journey.answer.length).fill(""),
  );
  const [border, setBorder] = useState(Array(journey.answer.length).fill(""));
  const [scores, setScores] = useState(Array(journey.answer.length).fill(0));
  const [finalScore, setFinalScore] = useState(0);

  useEffect(() => {
    const sum = scores.reduce((acc, score) => acc + score, 0);
    setFinalScore(sum);
  }, [scores]);

  function handleSubmit(e) {
    if (e.key == "Enter") {
      const newFeedback = answers.map((answer, idx) => {
        const res =
          answer?.toLowerCase().trim() ===
          journey.answer[idx]?.toLowerCase().trim()
            ? "Correct"
            : "Incorrect";

        setFeedback((prev) => {
          const updatedFeedback = [...prev];
          updatedFeedback[idx] = res;
          return updatedFeedback;
        });

        let borderClass = "";
        if (res === "Correct") {
          borderClass = "border-sky-500 bg-sky-500/10 text-sky-300";
        } else if (res == "Incorrect" && answer && answer.length !== 0) {
          borderClass = "border-rose-500 bg-rose-500/10 text-rose-300";
        } else {
          borderClass = "";
        }
        setBorder((prev) => {
          const updatedBorder = [...prev];
          updatedBorder[idx] = borderClass;
          return updatedBorder;
        });

        let score = 0;
        if (res === "Correct") {
          score = 100;
        } else if (res === "Incorrect" && answer && answer.length !== 0) {
          score = 0;
        } else {
          score = 0;
        }
        setScores((prev) => {
          const updateScore = [...prev];
          updateScore[idx] = score;
          return updateScore;
        });

        return res;
      });
    }
  }

  const questions = journey.story.split("----").map((question, idx) => {
    if (idx !== journey.story.split("----").length - 1) {
      return (
        <React.Fragment key={idx}>
          <span className="text-slate-300">{question}</span>
          <span className="relative mx-1 inline-block align-middle">
            <input
              type="text"
              placeholder={idx === 0 ? journey.answer[0] : ""}
              value={answers[idx] || ""}
              onKeyDown={handleSubmit}
              onChange={(e) => {
                const newAnswers = [...answers];
                newAnswers[idx] = e.target.value;
                setAnswers(newAnswers);
              }}
              className={
                "inline-block h-8 w-24 rounded-lg border border-slate-600 bg-slate-800/50 px-2 text-center text-sm font-semibold text-white outline-none transition-all placeholder:text-slate-500 focus:border-sky-400 focus:bg-slate-800 focus:ring-1 focus:ring-sky-400/50 sm:w-28 sm:text-base md:w-32 " +
                (border[idx] !== "" ? border[idx] : "")
              }
            />
            {feedback[idx] == "Correct" && (
              <div className="absolute -right-2 -top-3 flex items-center gap-1">
                <span className="text-xs font-bold text-sky-400 drop-shadow-md">
                  +{scores[idx]}
                </span>
                <FaCircleCheck className="size-4 text-sky-400 drop-shadow-md" />
              </div>
            )}
            {border[idx] == "border-rose-500 bg-rose-500/10 text-rose-300" && (
              <div className="absolute -right-2 -top-3 flex items-center gap-1">
                <span className="text-xs font-bold text-rose-500 drop-shadow-md">
                  {scores[idx]}
                </span>
                <FaCircleXmark className="size-4 text-rose-500 drop-shadow-md" />
              </div>
            )}
          </span>
        </React.Fragment>
      );
    } else {
      return (
        <span className="text-slate-300" key={idx}>
          {question}
        </span>
      );
    }
  });

  return (
    <div
      id="teaser"
      className="relative mx-auto mt-16 flex w-full max-w-7xl flex-col items-center px-4 sm:mt-24 sm:px-6 md:mt-32 md:px-8"
    >
      <div className="mb-12 flex flex-col gap-4 text-center">
        <h2 className="bg-gradient-to-br from-white to-slate-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
          Test Your Knowledge
        </h2>
        <p className="mx-auto max-w-2xl text-base text-slate-400 sm:text-lg">
          Try a demo of our interactive learning experience. Read the story and
          fill in the blanks to test your comprehension. Press Enter to check
          your answers.
        </p>
      </div>

      <div className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-slate-700/50 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-xl sm:p-8 md:p-12">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-sky-500/10 blur-[100px]" />

        <div className="relative z-10 flex flex-col gap-2 border-b border-slate-700/50 pb-6">
          <div className="inline-flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500/20 text-xs font-bold text-sky-400">
              1
            </span>
            <span className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              History Demo
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white sm:text-3xl">
            Indonesian Independence
          </h3>
        </div>

        <div className="relative z-10 mt-6">
          <div className="rounded-2xl border border-slate-700/50 bg-slate-950/50 p-6 shadow-inner sm:p-8 md:p-10">
            <p className="text-justify text-base leading-loose tracking-wide text-slate-300 sm:text-lg sm:leading-loose md:text-xl md:leading-relaxed">
              {questions}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between rounded-2xl border border-sky-500/30 bg-sky-500/10 px-6 py-4 backdrop-blur-sm sm:px-8">
            <p className="text-lg font-bold text-white sm:text-xl">
              Total Score
            </p>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-black text-sky-400 sm:text-4xl">
                {finalScore}
              </span>
              <span className="mt-2 text-sm font-medium text-slate-400">
                / {journey.answer.length * 100}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
