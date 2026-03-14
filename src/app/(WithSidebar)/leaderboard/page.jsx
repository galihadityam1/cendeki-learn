"use client";
import { BASE_URL } from "@/db/config/constant";
import React, { useEffect, useState } from "react";
import { PiStarFourBold, PiCrownFill } from "react-icons/pi";
import { SparklesCore } from "@/components/ui/sparkles";
import { cn } from "@/utils/cn";

export default function Page() {
  const [champ, setChamp] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getLeader = async () => {
    try {
      let res = await fetch(`${BASE_URL}/api/leaderboard`, {
        cache: "no-store",
      });
      let result = await res.json();
      let { data } = result;
      let hasil = data.map(({ totalScore, user }) => ({
        totalScore,
        name: user.name,
      }));
      setChamp(hasil);
    } catch (error) {
      console.error("Failed to fetch leaderboard", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLeader();
  }, []);

  let date = new Date().toLocaleDateString();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 px-4 py-12 text-slate-100 sm:px-8">
      {/* Background Sparkles */}
      <div className="pointer-events-none absolute inset-0 z-0 h-screen w-full">
        <SparklesCore
          id="tsparticlesleaderboard"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={50}
          className="h-full w-full"
          particleColor="#f59e0b"
        />
        <div className="absolute inset-0 bg-slate-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-full w-full max-w-5xl flex-col items-center justify-start pt-8">
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <div className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 backdrop-blur-md">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
              <PiCrownFill className="size-4" /> Hall of Fame
            </span>
          </div>
          <h1 className="bg-gradient-to-br from-white to-amber-200 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">
            Global Leaderboard
          </h1>
          <p className="text-sm text-slate-400">
            Latest update:{" "}
            <span className="font-semibold text-slate-300">{date}</span>
          </p>
        </div>

        {/* Top 3 Podium */}
        {!isLoading && champ.length >= 3 && (
          <div className="mb-16 mt-8 flex h-72 flex-row items-end justify-center gap-2 sm:gap-4 md:gap-8">
            {/* Rank 2 */}
            <div className="group relative flex w-24 flex-col items-center transition-transform hover:-translate-y-2 sm:w-32">
              <div className="absolute -top-16 flex flex-col items-center gap-2">
                <div className="relative size-12 rounded-full border-4 border-slate-300 bg-slate-800 p-1 shadow-[0_0_15px_rgba(203,213,225,0.5)] sm:size-16">
                  <img
                    src="logo.png"
                    alt=""
                    className="h-full w-full object-contain"
                  />
                </div>
                <p className="w-full truncate px-2 text-center text-xs font-bold text-slate-300 sm:text-sm">
                  {champ[1]?.name}
                </p>
                <div className="flex text-slate-300 drop-shadow-[0_0_8px_rgba(203,213,225,0.8)]">
                  <PiStarFourBold className="size-4 sm:size-5" />
                  <PiStarFourBold className="size-5 sm:size-6" />
                </div>
              </div>
              <div className="flex h-40 w-full flex-col items-center justify-center rounded-t-xl border border-b-0 border-slate-400/50 bg-gradient-to-t from-slate-900 via-slate-800 to-slate-700 shadow-2xl backdrop-blur-sm">
                <span className="text-3xl font-black text-slate-300 opacity-50 sm:text-4xl">
                  2
                </span>
                <p className="mt-4 text-sm font-bold text-white sm:text-lg">
                  {champ[1]?.totalScore}
                </p>
              </div>
            </div>

            {/* Rank 1 */}
            <div className="group relative z-10 flex w-28 flex-col items-center transition-transform hover:-translate-y-2 sm:w-40">
              <div className="absolute -top-24 flex flex-col items-center gap-2">
                <PiCrownFill className="absolute -top-6 size-8 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)] sm:size-10" />
                <div className="relative size-16 rounded-full border-4 border-amber-400 bg-slate-800 p-1 shadow-[0_0_20px_rgba(251,191,36,0.6)] sm:size-20">
                  <img
                    src="logo.png"
                    alt=""
                    className="h-full w-full object-contain"
                  />
                </div>
                <p className="w-full truncate px-2 text-center text-sm font-black text-amber-400 sm:text-base">
                  {champ[0]?.name}
                </p>
                <div className="flex text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]">
                  <PiStarFourBold className="size-4 sm:size-5" />
                  <PiStarFourBold className="size-6 sm:size-8" />
                  <PiStarFourBold className="size-4 sm:size-5" />
                </div>
              </div>
              <div className="flex h-48 w-full flex-col items-center justify-center rounded-t-xl border border-b-0 border-amber-500/50 bg-gradient-to-t from-slate-900 via-amber-900/40 to-amber-700/60 shadow-[0_0_30px_rgba(251,191,36,0.2)] backdrop-blur-sm">
                <span className="text-4xl font-black text-amber-300 opacity-50 sm:text-5xl">
                  1
                </span>
                <p className="mt-4 text-lg font-black text-white drop-shadow-md sm:text-2xl">
                  {champ[0]?.totalScore}
                </p>
              </div>
            </div>

            {/* Rank 3 */}
            <div className="group relative flex w-24 flex-col items-center transition-transform hover:-translate-y-2 sm:w-32">
              <div className="absolute -top-14 flex flex-col items-center gap-2">
                <div className="relative size-12 rounded-full border-4 border-amber-700 bg-slate-800 p-1 shadow-[0_0_15px_rgba(180,83,9,0.5)] sm:size-14">
                  <img
                    src="logo.png"
                    alt=""
                    className="h-full w-full object-contain"
                  />
                </div>
                <p className="w-full truncate px-2 text-center text-xs font-bold text-amber-600 sm:text-sm">
                  {champ[2]?.name}
                </p>
                <div className="flex text-amber-600 drop-shadow-[0_0_8px_rgba(180,83,9,0.8)]">
                  <PiStarFourBold className="size-5 sm:size-6" />
                </div>
              </div>
              <div className="flex h-32 w-full flex-col items-center justify-center rounded-t-xl border border-b-0 border-amber-800/50 bg-gradient-to-t from-slate-900 via-slate-800 to-amber-900/40 shadow-2xl backdrop-blur-sm">
                <span className="text-2xl font-black text-amber-600 opacity-50 sm:text-3xl">
                  3
                </span>
                <p className="mt-4 text-sm font-bold text-white sm:text-lg">
                  {champ[2]?.totalScore}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Full Ranking Table */}
        <div className="w-full max-w-3xl overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/60 p-1 shadow-2xl backdrop-blur-xl">
          <div className="custom-scrollbar max-h-[500px] overflow-y-auto rounded-[1.8rem] bg-slate-950/50">
            {isLoading ? (
              <div className="flex h-40 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-700 border-t-amber-500"></div>
              </div>
            ) : (
              <table className="w-full border-collapse text-left">
                <thead className="sticky top-0 z-20 bg-slate-900/90 backdrop-blur-md">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                      Rank
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                      Player
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-400">
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {champ.map((rank, idx) => (
                    <tr
                      className={cn(
                        "group transition-colors hover:bg-slate-800/50",
                        idx < 3 ? "bg-slate-900/30" : "",
                      )}
                      key={idx}
                    >
                      <td className="px-6 py-4">
                        <div
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-full font-bold",
                            idx === 0
                              ? "border border-amber-500/30 bg-amber-500/20 text-amber-400"
                              : idx === 1
                                ? "border border-slate-300/30 bg-slate-300/20 text-slate-300"
                                : idx === 2
                                  ? "border border-amber-700/30 bg-amber-700/20 text-amber-600"
                                  : "bg-slate-800 text-slate-400",
                          )}
                        >
                          {idx + 1}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-200 transition-colors group-hover:text-white">
                        {rank.name}
                      </td>
                      <td className="px-6 py-4 text-right font-black text-sky-400">
                        {rank.totalScore.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(51, 65, 85, 0.5);
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(71, 85, 105, 0.8);
        }
      `}</style>
    </div>
  );
}
