import React from "react";

export function HighestScorer({ highestScorer }) {
  return (
    <div className="flex w-full items-center justify-between py-1 text-sm">
      <span className="font-medium opacity-70">Scorer:</span>
      <span
        className="max-w-[120px] truncate font-semibold"
        title={highestScorer}
      >
        {highestScorer}
      </span>
    </div>
  );
}

export function HighestScore({ highestScore }) {
  return (
    <div className="flex w-full items-center justify-between py-1 text-sm">
      <span className="font-medium opacity-70">Score:</span>
      <span className="font-semibold">{highestScore}</span>
    </div>
  );
}
