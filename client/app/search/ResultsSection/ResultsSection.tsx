import React from "react";
import ResultsItem from "./ResultsItem";
import { Document } from "@/app/interface";
import Loading from "./Loading";
import ResultsPlaceholder from "./ResultsPlaceholder";
import LoadMoreButton from "./LoadMoreButton";

export default function ResultsSection({
  searchResults,
  isRefetching,
  fetchNextPage,
}: {
  searchResults: Document[] | undefined;
  isRefetching: boolean;
  fetchNextPage: () => void;
}) {
  const no_data = (!searchResults || searchResults.length === 0) && !isRefetching;
  const first_loading = (!searchResults || searchResults.length === 0) && isRefetching;

  return (
    <div className="w-full h-full">
      {no_data ? (
        <ResultsPlaceholder />
      ) : first_loading ? (
        <Loading />
      ) : (
        <>
          {searchResults?.map((result, i) => (
            <ResultsItem key={i} id={i} document={result} />
          ))}
          {isRefetching ? <Loading /> : <LoadMoreButton onClick={fetchNextPage} />}
        </>
      )}
    </div>
  );
}
