"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { BASE_URL } from "@/db/config/constant";
import PromptAPI from "@/components/PromptAPI";
import CompleteJourney from "@/components/CompleteJourney";
import IncompleteJourney from "@/components/IncompleteJourney";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { capitalize, clearTimer, getTimeUp, postScore } from "../actions";
import { OPENROUTER_API_KEY } from "@/db/config/constant";
import { SparklesCore } from "@/components/ui/sparkles";
import { useAppContext } from "@/context";

export default function Page({ params }) {
  const Ref = useRef(null);
  const { state } = useAppContext();
  const [journey, setJourney] = useState({
    title: "",
    fullStory: "",
    story: "",
    answer: [""],
  });
  const [answers, setAnswers] = useState([]);
  const [storyId, setStoryId] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [displayComplete, setDisplayComplete] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  const [border, setBorder] = useState([]);
  const [scores, setScores] = useState([]);
  const [category, setCategory] = useState("");
  const [finalScore, setFinalScore] = useState(0);
  const [gameEnd, setGameEnd] = useState(false);
  const [timer, setTimer] = useState("00:30");
  const [question, setQuestion] = useState("");
  const [title, setTitle] = useState("");

  const generatePrompt = async (e) => {
    if ((e.key === "Enter" || e.type == "click") && !generating) {
      setGenerating(true);
      setLoading(true);
      setQuestion("");
      setJourney("");
      setDisplayComplete(false);
      setGameStart(false);
      setGameEnd(false);
      setFeedback([]);
      setBorder([]);
      setScores([]);
      setAnswers([]);
      setFinalScore(0);
      setTimer("00:30");

      let res;
      switch (params.journey) {
        case "history":
          res = await fetch(
            `${BASE_URL}/api/openrouter-story?query=${question}&category=history`,
            {
              method: "POST",
              cache: "no-store",
            },
          );
          break;

        case "english":
          res = await fetch(
            `${BASE_URL}/api/openrouter-story?query=${question}&category=english`,
            {
              method: "POST",
              cache: "no-store",
            },
          );
          break;
        default:
          setLoading(false);
          setGenerating(false);
          return;
      }

      if (!res.ok) {
        const errorData = await res.text();
        console.error("API Error Response:", errorData);
        console.error("Status:", res.status);
        Swal.fire({
          title: "Error",
          text: "Failed to generate content. Please try again.",
          icon: "error",
          background: "#0f172a",
          color: "#f8fafc",
        });
        setLoading(false);
        setGenerating(false);
        return;
      }

      const { answer: result } = await res.json();

      console.log(result, "RESULT PROMPT"); // !DO NOT CLEAR THIS CONSOLE.LOG
      setJourney(result.story);
      setStoryId(result._id);
      setCorrectAnswers(result.answer);
      setAnswers(Array(result.answer.length).fill(""));
      setScores(Array(result.answer.length).fill(0));
      setTitle(result.title);
      setGenerating(false);
      setLoading(false);
    }
  };

  const onClickStart = () => {
    clearTimer(getTimeUp(), setTimer, setGameEnd, Ref);
    setGameStart(true);
  };

  const router = useRouter();

  useEffect(() => {
    if (gameEnd) {
      postScore(finalScore, storyId, state?._id);
      Swal.fire({
        title: "Time's up!",
        html: `<p class='text-slate-300 leading-loose'>Your final score is <span class="text-sky-400 font-bold">${finalScore}</span> <br /> Do you want to see the correct answers?</p>`,
        icon: "info",
        showDenyButton: true,
        confirmButtonColor: "#0ea5e9", // sky-500
        denyButtonColor: "#334155", // slate-700
        confirmButtonText: "Yes, show answers",
        denyButtonText: "No, back to leaderboard",
        background: "#0f172a", // slate-950
        color: "#f8fafc", // slate-50
        customClass: {
          popup: "border border-slate-800 rounded-2xl",
        },
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
    capitalize(params.journey, setCategory);
    return () => {
      clearInterval(Ref.current);
    };
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      if (e.key === "Enter") {
        const updatedFeedback = [...feedback];
        const updatedBorder = [...border];
        const updatedScores = [...scores];

        answers.forEach((answer, idx) => {
          if (scores[idx] > 0) return;

          const res =
            answer?.toLowerCase().trim() ===
            correctAnswers[idx]?.toLowerCase().trim()
              ? "Correct"
              : "Incorrect";

          updatedFeedback[idx] = res;

          let borderClass = "";
          if (res === "Correct") {
            borderClass =
              "correct-answer bg-emerald-500/10 border-emerald-500/50 text-emerald-400";
          } else if (res === "Incorrect" && answer && answer.length !== 0) {
            borderClass =
              "border-b-2 border-rose-500 bg-rose-500/10 text-rose-400";
          }
          updatedBorder[idx] = borderClass;

          let score = 0;
          if (res === "Correct") {
            score += parseInt(timer.split(":")[1]) * 10;
          }
          updatedScores[idx] = score;
        });

        // Batch all state updates at once
        setFeedback(updatedFeedback);
        setBorder(updatedBorder);
        setScores(updatedScores);
      }
    },
    [answers, correctAnswers, feedback, border, scores, timer],
  );

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 px-4 py-12 text-slate-100 sm:px-6 lg:px-8">
      {/* Background Sparkles */}
      <div className="pointer-events-none absolute inset-0 z-0 h-screen w-full">
        <SparklesCore
          id="tsparticlesjourney"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={30}
          className="h-full w-full"
          particleColor="#38bdf8"
        />
        <div className="absolute inset-0 bg-slate-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="absolute -left-1/4 top-1/4 h-1/2 w-1/2 rounded-full bg-sky-500/5 blur-[120px]" />
        <div className="absolute -right-1/4 bottom-1/4 h-1/2 w-1/2 rounded-full bg-indigo-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl pt-8">
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <div className="inline-flex items-center rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-1.5 backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
              Interactive Story
            </span>
          </div>
          <h1 className="bg-gradient-to-br from-white to-slate-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">
            Test Your Knowledge
          </h1>
        </div>

        <div className="relative z-20 mb-12 flex w-full flex-col items-center justify-center gap-6">
          {category && (
            <PromptAPI
              setQuestion={setQuestion}
              category={category}
              generatePrompt={generatePrompt}
              generating={generating}
            />
          )}
        </div>

        <div className="relative z-10">
          {generating && <LoadingSkeleton />}

          {!loading && !displayComplete && (
            <div className="rounded-[2rem] border border-slate-800/60 bg-slate-900/60 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
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
          )}

          {displayComplete && (
            <div className="rounded-[2rem] border border-slate-800/60 bg-slate-900/60 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
              <CompleteJourney
                journey={journey}
                correctAnswers={correctAnswers}
                title={title}
                finalScore={finalScore}
                timer={timer}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
