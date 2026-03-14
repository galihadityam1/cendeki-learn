import React from "react";
import Skeleton from "@/components/ui/skeleton";

export default function JourneyTitle({ title }) {
  return !title || title.length == 0 ? (
    <Skeleton className="h-10 w-full rounded-xl bg-slate-800 sm:w-96" />
  ) : (
    <h2 className="bg-gradient-to-br from-white to-slate-300 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
      {title}
    </h2>
  );
}
