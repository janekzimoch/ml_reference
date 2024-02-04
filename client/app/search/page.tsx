"use client";

import React, { useState } from "react";
import InputSection from "./InputSection/InputSection";
import ResultsSection from "./ResultsSection/ResultsSection";
import { Document } from "../interface";

export default function Page() {
  const [searchResults, setSearchResults] = useState<Document[] | undefined>();

  return (
    <div className="flex flex-col bg-white w-full h-screen">
      <div className="flex-1 custom-scrollbar overflow-y-auto py-6 pl-6 pr-4">
        <ResultsSection searchResults={searchResults} />
      </div>
      <div className="w-full p-6">
        <InputSection setSearchResults={setSearchResults} />
      </div>
    </div>
  );
}
