import React from "react";
import InputSection from "./InputSection/InputSection";
import ResultsSection from "./ResultsSection/ResultsSection";

export default function Page() {
  return (
    <div className="flex flex-col bg-gray-100 w-full h-screen">
      <div className="flex-1 custom-scrollbar overflow-y-auto py-6 pl-6 pr-4">
        <ResultsSection />
      </div>
      <div className="w-full p-6">
        <InputSection />
      </div>
    </div>
  );
}
