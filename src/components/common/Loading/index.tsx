"use client";

import React from "react";

type LoadingSize = "small" | "medium" | "large";
type LoadingColor = "primary" | "secondary";

interface LoadingProps {
  size?: LoadingSize;
  color?: LoadingColor;
}

export default function Loading({ size = "small", color = "primary" }: LoadingProps) {
  const colorClass = color === "primary" ? "bg-red-500" : "bg-white";
  const sizeMap: Record<LoadingSize, string> = {
    "small": "w-2 h-2",
    "medium": "w-5 h-5",
    "large": "w-10 h-10",
  };
  const sizeClass = sizeMap[size];

  return (
    <span className="flex items-center justify-center gap-1 py-3">
      <span
        className={`${sizeClass} ${colorClass} rounded-full animate-bounce [animation-delay:-0.4s]`}
      ></span>
      <span
        className={`${sizeClass} ${colorClass} rounded-full animate-bounce [animation-delay:-0.25s]`}
      ></span>
      <span
        className={`${sizeClass} ${colorClass} rounded-full animate-bounce`}
      ></span>
    </span>
  );
}
