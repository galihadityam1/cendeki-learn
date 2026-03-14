"use client";
import React from "react";
import { LuBarChart2 } from "react-icons/lu";
import { FaBookBookmark } from "react-icons/fa6";
import { IoRibbonSharp } from "react-icons/io5";
import { useAppContext } from "@/context";

export default function ProfileSummary() {
  let category = useAppContext();

  const statsData = [
    {
      icon: (
        <FaBookBookmark className="size-6 text-sky-400 transition-transform group-hover:scale-110 sm:size-8 lg:size-10" />
      ),
      title: "Total Stories",
      value: category.state?.history?.length || 0,
      gradient: "from-sky-500/20 to-sky-900/20",
      border: "border-sky-500/30",
      text: "text-sky-400",
    },
    {
      icon: (
        <LuBarChart2 className="size-6 text-emerald-400 transition-transform group-hover:scale-110 sm:size-8 lg:size-10" />
      ),
      title: "Highest Score",
      value:
        category.state?.highestScore > 0 ? category.state?.highestScore : 0,
      gradient: "from-emerald-500/20 to-emerald-900/20",
      border: "border-emerald-500/30",
      text: "text-emerald-400",
    },
    {
      icon: (
        <IoRibbonSharp className="size-6 text-amber-400 transition-transform group-hover:scale-110 sm:size-8 lg:size-10" />
      ),
      title: "Total Score",
      value: category.state?.totalScore || 0,
      gradient: "from-amber-500/20 to-amber-900/20",
      border: "border-amber-500/30",
      text: "text-amber-400",
    },
  ];

  return (
    <div className="flex w-full flex-col gap-4 sm:gap-6">
      {statsData.map((stat, index) => (
        <div
          key={index}
          className={`group relative overflow-hidden rounded-[1.5rem] border ${stat.border} bg-slate-900/60 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl`}
        >
          {/* Subtle gradient background */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-50`}
          />

          <div className="relative z-10 flex items-center gap-6">
            <div
              className={`flex items-center justify-center rounded-2xl border bg-slate-950 p-4 ${stat.border} shadow-inner`}
            >
              {stat.icon}
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 sm:text-sm">
                {stat.title}
              </p>
              <p
                className={`text-3xl font-black drop-shadow-md sm:text-4xl lg:text-5xl ${stat.text}`}
              >
                {typeof stat.value === "number"
                  ? stat.value.toLocaleString()
                  : stat.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
