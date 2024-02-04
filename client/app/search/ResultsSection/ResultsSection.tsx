import React from "react";
import ResultsItem from "./ResultsItem";

export default function ResultsSection() {
  const components = [1, 2, 3, 4, 5, 6];
  return (
    <div className="bg-red-200 p-1 w-full">
      {components.map((component, i) => (
        <ResultsItem key={i} />
      ))}
    </div>
  );
}
