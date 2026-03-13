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
      icon: <FaBookBookmark className="mx-auto self-center text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-7xl text-white" />,
      title: "Total Stories",
      value: category.state?.history?.length || 0,
      isLast: false
    },
    {
      icon: <LuBarChart2 className="mx-auto self-center text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-7xl text-white" />,
      title: "Highest Score",
      value: category.state?.highestScore > 0 ? category.state?.highestScore : 0,
      isLast: false
    },
    {
      icon: <IoRibbonSharp className="mx-auto self-center text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-7xl text-white" />,
      title: "Total Score",
      value: category.state?.totalScore || 0,
      isLast: true
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Desktop and Tablet View */}
      <div className="hidden sm:flex border-primary min-h-[20dvh] w-full justify-evenly overflow-hidden rounded-lg border">
        {statsData.map((stat, index) => (
          <div 
            key={index}
            className={`border-primary flex w-full max-w-[35%] items-center justify-between gap-2 sm:gap-4 px-3 sm:px-6 lg:px-8 ${!stat.isLast ? 'border-r' : ''}`}
          >
            <div className="bg-primary size-12 sm:size-16 lg:size-20 xl:size-22 2xl:size-24 content-center rounded-full text-center flex-shrink-0">
              {stat.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl mb-1 sm:mb-2 text-gray-500 truncate">
                {stat.title}
              </p>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold truncate">
                {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View - Stacked Cards */}
      <div className="sm:hidden space-y-4">
        {statsData.map((stat, index) => (
          <div 
            key={index}
            className="border-primary flex items-center justify-between gap-4 p-4 rounded-lg border bg-white shadow-sm"
          >
            <div className="bg-primary size-14 content-center rounded-full text-center flex-shrink-0">
              {stat.icon}
            </div>
            <div className="flex-1 text-right">
              <p className="text-sm mb-1 text-gray-500">
                {stat.title}
              </p>
              <p className="text-2xl font-extrabold">
                {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}