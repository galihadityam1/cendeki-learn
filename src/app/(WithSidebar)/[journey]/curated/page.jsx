"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import CompleteJourney from "@/components/CompleteJourney";
import IncompleteJourney from "@/components/IncompleteJourney";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { SparklesCore } from "@/components/ui/sparkles";
import {
  capitalize,
  clearTimer,
  getAllStoryFromCategory,
  getTimeUp,
  postScore,
} from "../actions";
import { JourneyCard } from "@/components/JourneyCard";

export default function Page({ params }) {
  const Ref = useRef(null);
  const [journey, setJourney] = useState({
    title: "",
    fullStory: "",
    story: "",
    answer: [""],
  });
  const [answers, setAnswers] = useState([]);
  const [storyId, setStoryId] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [gameStart, setGameStart] = useState(false);
  const [journeyList, setJourneyList] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [displayComplete, setDisplayComplete] = useState(false);
  const [border, setBorder] = useState([]);
  const [scores, setScores] = useState([]);
  const [category, setCategory] = useState("");
  const [finalScore, setFinalScore] = useState(0);
  const [gameEnd, setGameEnd] = useState(false);
  const [timer, setTimer] = useState("00:30");
  const [title, setTitle] = useState("");

  const onClickStart = () => {
    clearTimer(getTimeUp(), setTimer, setGameEnd, Ref);
    setGameStart(true);
  };

  const router = useRouter();

  useEffect(() => {
    if (gameEnd) {
      postScore(finalScore, storyId);
      Swal.fire({
        title: "Time's up!",
        html: `<p class='leading-loose'>Your final score is ${finalScore} <br /> Do you want to see the correct answer ?</p>`,
        icon: "info",
        showDenyButton: true,
        confirmButtonColor: "#1860b6",
        denyButtonColor: "#14b8a6",
        confirmButtonText: "Yes",
        denyButtonText: "No",
        background: "#0f172a",
        color: "#f8fafc",
      }).then((result) => {
        if (result.isConfirmed) {
          setDisplayComplete(true);
        } else {
          router.push("/leaderboard");
        }
      });
    }
    const sum = scores.reduce((acc, score) => acc + score, 0);
    setFinalScore(sum);
  }, [scores, gameEnd]);

  useEffect(() => {
    const currentCategory = params.journey;
    getAllStoryFromCategory(currentCategory, setJourneyList);
    capitalize(currentCategory, setCategory);
    return () => {
      if (Ref.current) {
        clearInterval(Ref.current);
      }
    };
  }, []);

  function handleSubmit(e) {
    if (e.key == "Enter") {
      const newFeedback = answers.map((answer, idx) => {
        if (scores[idx] > 0) {
          return;
        }
        const res =
          answer?.toLowerCase() === correctAnswers[idx]?.toLowerCase()
            ? "Correct"
            : "Incorrect";

        setFeedback((prev) => {
          const updatedFeedback = [...prev];
          updatedFeedback[idx] = res;
          return updatedFeedback;
        });

        let borderClass = "";
        if (res === "Correct") {
          borderClass = "correct-answer";
        } else if (res === "Incorrect" && answer && answer.length !== 0) {
          borderClass = "border-b-2 border-rose-400";
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
          score += timer.split(":")[1] * 10;
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

  return (
    <div className="relative mx-auto min-h-screen w-full overflow-hidden bg-slate-950 text-slate-100">
      {/* Background Sparkles */}
      <div className="absolute inset-0 z-0 h-screen w-full">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="h-full w-full"
          particleColor="#38bdf8"
        />
        <div className="absolute inset-0 bg-slate-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col pb-24 pt-12">
        {/* Header Section */}
        <div className="mx-auto mb-12 flex w-full max-w-4xl flex-col items-center justify-center gap-6 px-4 text-center sm:px-6">
          <div className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-800/50 px-4 py-1.5 backdrop-blur-md">
            <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-sm font-semibold uppercase tracking-wider text-transparent">
              {category} Challenge
            </span>
          </div>
          <h1 className="bg-gradient-to-br from-white to-slate-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
            Test Your Knowledge
          </h1>
          <p className="max-w-2xl text-lg text-slate-400 sm:text-xl">
            Select a topic below to begin your learning adventure. Answer
            questions correctly and beat the clock to maximize your score.
          </p>
        </div>

        {/* Journey Cards Grid */}
        <div className="w-full px-4 sm:px-6 md:px-8">
          <div className="mx-auto grid max-w-7xl grid-cols-1 place-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {journeyList.length != 0 &&
              journeyList.map((el, idx) => {
                return (
                  <div
                    key={idx}
                    className="w-full transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-sky-500/20"
                  >
                    <JourneyCard
                      el={el}
                      setJourneyList={setJourneyList}
                      setGenerating={setGenerating}
                      setLoading={setLoading}
                      setStoryId={setStoryId}
                      setJourney={setJourney}
                      setCorrectAnswers={setCorrectAnswers}
                      setAnswers={setAnswers}
                      setScores={setScores}
                      setTitle={setTitle}
                    />
                  </div>
                );
              })}
          </div>
        </div>

        {/* Loading State */}
        {generating && (
          <div className="mx-auto w-full max-w-4xl px-4 pt-12 sm:px-6 md:px-8">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm">
              <LoadingSkeleton />
            </div>
          </div>
        )}

        {/* Game Content */}
        {!loading && !displayComplete && (
          <div className="mx-auto w-full max-w-5xl px-4 pt-8 sm:px-6 md:px-8">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-xl sm:p-8 md:p-10">
              <IncompleteJourney
                feedback={feedback}
                title={title}
                journey={journey}
                answers={answers}
                border={border}
                scores={scores}
                timer={timer}
                finalScore={finalScore}
                setAnswers={setAnswers}
                onClickStart={onClickStart}
                handleSubmit={handleSubmit}
                gameStart={gameStart}
              />
            </div>
          </div>
        )}

        {/* Complete Journey */}
        {displayComplete && (
          <div className="mx-auto w-full max-w-5xl px-4 pt-8 sm:px-6 md:px-8">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-xl sm:p-8 md:p-10">
              <CompleteJourney
                journey={journey}
                correctAnswers={correctAnswers}
                title={title}
                finalScore={finalScore}
                timer={timer}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
