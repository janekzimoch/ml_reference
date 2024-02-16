import React from "react";
import ResultsItem from "./ResultsItem";
import { Document } from "@/app/interface";

export default function ResultsSection({ searchResults, isLoading }: { searchResults: Document[] | undefined; isLoading: boolean }) {
  return (
    <div className="w-full h-full">
      {isLoading ? (
        <div className="animate-pulse flex flex-col">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="mb-10 h-[400px] bg-gray-200/80 rounded-xl p-6"></div>
          ))}
        </div>
      ) : searchResults ? (
        searchResults.map((result, i) => <ResultsItem key={i} id={i} document={result} />)
      ) : (
        <div className="flex flex-col font-thin tracking-wider text-4xl text-gray-200 items-center justify-center h-full">
          <p className="text-6xl pb-8 drop-shadow">ML reference</p>
          <p className="drop-shadow-sm">One stop search tool</p>
          <p className="drop-shadow-sm">for your projects</p>
        </div>
      )}
    </div>
  );
}
