"use client";

import React, { useContext, useState } from "react";
import InputSection from "./InputSection/InputSection";
import ResultsSection from "./ResultsSection/ResultsSection";
import { Document } from "../interface";
import Sidebar from "./Sidebar/Sidebar";
import FiltersProvider, { FiltersContext } from "./Contexts/FiltersContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import * as core from "@tanstack/query-core"; // types: alpha
import { sendQuery } from "@/app/api/sendQuery";

export default function Page() {
  const [query, setQuery] = useState("");
  const { startDate, endDate, selectedConferences, selectedCategories } = useContext(FiltersContext);
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const sidebarWidth = isSidebarOpen ? 250 : 0; // Example sidebar width

  const { data, fetchNextPage, isRefetching } = useInfiniteQuery({
    queryKey: ["searchResults"],
    queryFn: ({ pageParam = 0 }) => sendQuery({ query, pageParam, startDate, endDate, selectedConferences, selectedCategories }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => lastPage.nextPage,
    enabled: searchEnabled,
  });

  console.log(data);
  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  function handleSendQuery() {
    setSearchEnabled(true);
  }

  const searchResults = data?.pages.reduce((acc: Document[], page) => {
    return [...acc, ...page.searchResults];
  }, []);

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
              <ResultsSection searchResults={searchResults} isRefetching={isRefetching} fetchNextPage={fetchNextPage} />
            </div>
            <div className="w-full p-6">
              <InputSection query={query} setQuery={setQuery} handleSendQuery={handleSendQuery} />
            </div>
          </div>
        </div>
      </FiltersProvider>
    </div>
  );
}
