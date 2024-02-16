"use client";

import React, { useEffect, useState } from "react";
import InputSection from "./InputSection/InputSection";
import ResultsSection from "./ResultsSection/ResultsSection";
import { Document } from "../interface";
import Sidebar from "./Sidebar/Sidebar";
import { BlobOptions } from "buffer";
import FiltersProvider from "./Contexts/FiltersContext";

export default function Page() {
  const [searchResults, setSearchResults] = useState<Document[] | undefined>();
  const [isSearchResultsLoading, setIsSearchResultsLoading] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const sidebarWidth = isSidebarOpen ? 250 : 0; // Example sidebar width

  let offset = 0;
  useEffect(() => {
    offset = searchResults?.length ?? 0;
  }, [searchResults]);

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }
  console.log("page: ", offset);

  return (
    <div className="flex w-screen h-screen">
      <FiltersProvider>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div
          className={`w-full`}
          style={{
            transform: `translateX(${sidebarWidth / 2}px)`,
            transition: "transform 0.3s ease",
          }}
        >
          <div className="flex flex-col bg-white w-full h-screen ">
            <div className="flex-1 custom-scrollbar overflow-y-auto mt-12 pl-6 pr-4">
              <ResultsSection searchResults={searchResults} isLoading={isSearchResultsLoading} />
            </div>
            <div className="w-full p-6">
              <InputSection setSearchResults={setSearchResults} setIsLoading={setIsSearchResultsLoading} offset={offset} />
            </div>
          </div>
        </div>
      </FiltersProvider>
    </div>
  );
}
