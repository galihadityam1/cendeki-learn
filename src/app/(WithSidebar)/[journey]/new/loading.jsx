import React from "react";
import { ImSpinner9 } from "react-icons/im";

export default function loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
      <div className="relative flex items-center justify-center">
        <ImSpinner9 className="size-40 animate-spin text-sky-500/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <ImSpinner9 className="absolute size-20 animate-[spin_1.5s_linear_infinite_reverse] text-sky-400" />
          <p className="absolute mt-32 bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-xl font-bold text-transparent">
            Loading...
          </p>
        </div>
      </div>
    </div>
  );
}
