import React from "react";
import ResultsItem from "./ResultsItem";
import { Document } from "@/app/interface";

export default function ResultsSection({ searchResults }: { searchResults: Document[] | undefined }) {
  return (
    <div className="w-full">
      {searchResults ? searchResults.map((result, i) => <ResultsItem key={i} id={i} document={result} />) : <p>search results</p>}
    </div>
  );
}
