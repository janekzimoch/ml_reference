import React from "react";

export default function Loading() {
  return (
    <div className="animate-pulse flex flex-col">
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className="mb-10 h-[400px] bg-gray-200/80 rounded-xl p-6"></div>
      ))}
    </div>
  );
}
