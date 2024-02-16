import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import Query from "./Query";
import { Document } from "@/app/interface";
import { FiltersContext } from "../Contexts/FiltersContext";

export default function InputSection({
  setSearchResults,
  setIsLoading,
}: {
  setSearchResults: Dispatch<SetStateAction<Document[] | undefined>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const [query, setQuery] = useState("");
  const { startDate, endDate, selectedConferences, selectedCategories } = useContext(FiltersContext);

  async function handleSendQuery() {
    console.log(
      JSON.stringify({
        text: query,
        filter: {
          start_date: startDate ? startDate.toISOString() : null,
          end_date: endDate ? endDate.toISOString() : null,
          conferences: selectedConferences.map((x) => x.label),
          categories: selectedCategories.map((x) => x.label),
        },
        metadata: {},
      })
    );
    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/app/search_papers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: query,
          filter: {
            start_date: startDate ? startDate.toISOString() : null,
            end_date: endDate ? endDate.toISOString() : null,
            conferences: selectedConferences.map((x) => x.label),
            categories: selectedCategories.map((x) => x.label),
          },
          metadata: {},
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log(response);

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Failed to fetch: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-white">
      <Query query={query} setQuery={setQuery} handleSendQuery={handleSendQuery} />
    </div>
  );
}
