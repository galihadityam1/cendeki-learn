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

  const [answers, setAnswers] = useState(Array(journey.answer.length));
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
    // e.preventDefault();
    if (e.key == "Enter") {
      const newFeedback = answers.map((answer, idx) => {
        const res =
          answer?.toLowerCase() === journey.answer[idx]?.toLowerCase()
            ? "Correct"
            : "Incorrect";

        setFeedback((prev) => {
          const updatedFeedback = [...prev];
          updatedFeedback[idx] = res;
          return updatedFeedback;
        });

        let borderClass = "";
        if (res === "Correct") {
          borderClass = "border-b-2 border-teal-400 placeholder:invert";
        } else if (res == "Incorrect" && answer && answer.length !== 0) {
          borderClass = "border-b-2 border-rose-400 placeholder:invert";
          console.log(borderClass, idx);
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
          <span className="">{question}</span>
          <span className="relative inline-block">
            <input
              type="text"
              placeholder={idx === 0 ? journey.answer[0] : "- - - -"}
              value={answers[idx]}
              onKeyDown={handleSubmit}
              onChange={(e) => {
                const newAnswers = [...answers];
                newAnswers[idx] = e.target.value;
                setAnswers(newAnswers);
              }}
              className={
                "inline h-6 w-20 sm:w-24 md:w-32 lg:w-40 max-w-fit rounded-full border-b-2 border-sky-400 px-2 sm:px-3 text-xs sm:text-sm " +
                (border[idx] !== "" ? border[idx] : " bg-opacity-70")
              }
            />
            {feedback[idx] == "Correct" && (
              <>
                <span className="absolute -right-1 sm:right-6 top-0 text-xs sm:text-sm">
                  {scores[idx]}
                </span>
                <FaCircleCheck className="absolute right-0 sm:right-1 top-[0.1rem] size-3 sm:size-4 text-cyan-500" />
              </>
            )}
            {border[idx] == "border-b-2 border-rose-400 placeholder:invert" && (
              <>
                <span className="absolute -right-1 sm:right-6 top-0 text-xs sm:text-sm text-rose-500">
                  {scores[idx]}
                </span>
                <FaCircleXmark className="absolute right-0 sm:right-1 top-[0.1rem] size-3 sm:size-4 text-rose-500" />
              </>
            )}
          </span>
        </React.Fragment>
      );
    } else {
      return (
        <span className="invert" key={idx}>
          {question}
        </span>
      );
    }
  });

  return (
    <>
      <div id="teaser" className="mx-auto mt-16 sm:mt-24 md:mt-32 flex max-w-[95dvw] sm:max-w-[90dvw] md:max-w-[80dvw] lg:max-w-[60dvw] flex-col gap-4 sm:gap-6 md:gap-8 px-4 sm:px-0">
        <h1 className="text-center text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold">
          Test Your Knowledge
        </h1>
        <p className="text-center text-sm sm:text-base md:text-lg">
          {/* Demo the learning game we have. */}
        </p>
      </div>
      <div className="border-primary mx-auto mt-8 sm:mt-12 md:mt-16 max-w-[95dvw] sm:max-w-[90dvw] md:max-w-[80dvw] lg:max-w-[60dvw] rounded-lg border p-3 sm:p-4 md:p-6">
        <div className="flex flex-col justify-center gap-1">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
            Indonesian Independence
          </h2>
          <p className="text-sm sm:text-base">Fill the missing blank down below</p>
        </div>
        <div className="border-primary mt-4 rounded-lg border">
          <p className="p-3 sm:p-4 md:p-6 text-justify indent-4 sm:indent-6 md:indent-10 leading-relaxed sm:leading-loose tracking-tight text-sm sm:text-base md:text-lg">
            {questions}
          </p>
          <div className="bg-primary flex w-full">
            <p className="px-3 sm:px-4 py-2 font-bold text-white text-sm sm:text-base">
              Score: {finalScore}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}