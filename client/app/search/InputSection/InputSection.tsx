import React, { Dispatch, SetStateAction, useState } from "react";
import Query from "./Query";
import { Document } from "@/app/interface";

export default function InputSection({ setSearchResults }: { setSearchResults: Dispatch<SetStateAction<Document[] | undefined>> }) {
  const [query, setQuery] = useState("");

  async function handleSendQuery() {
    // try {
    //   const response = await fetch("http://127.0.0.1:8000/app/search_papers", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       text: query,
    //     }),
    //   });
    //   if (!response.ok) {
    //     throw new Error("Network response was not ok");
    //   }

    //   const data = await response.json();
    //   setSearchResults(data);
    // } catch (error) {
    //   console.error("Failed to fetch: ", error);
    // }

    const documents = [
      {
        title: "Deserunt anim deserunt esse tempor eiusmod occaecat aliquip.",
        abstract:
          "Minim aliqua nisi sit mollit exercitation et laboris. Consectetur dolor et ad et laborum adipisicing eu. Quis eu magna esse ea sint. Non voluptate adipisicing dolor sit eiusmod exercitation magna tempor excepteur nostrud anim aliquip minim qui.",
      },
      {
        title: "Deserunt anim deserunt esse tempor eiusmod occaecat aliquip.",
        abstract:
          "Minim aliqua nisi sit mollit exercitation et laboris. Consectetur dolor et ad et laborum adipisicing eu. Quis eu magna esse ea sint. Non voluptate adipisicing dolor sit eiusmod exercitation magna tempor excepteur nostrud anim aliquip minim qui.",
      },
      {
        title: "Deserunt anim deserunt esse tempor eiusmod occaecat aliquip.",
        abstract:
          "Minim aliqua nisi sit mollit exercitation et laboris. Consectetur dolor et ad et laborum adipisicing eu. Quis eu magna esse ea sint. Non voluptate adipisicing dolor sit eiusmod exercitation magna tempor excepteur nostrud anim aliquip minim qui.",
      },
    ];
    setSearchResults(documents);
  }

  return (
    <div className="bg-white">
      <Query query={query} setQuery={setQuery} handleSendQuery={handleSendQuery} />
    </div>
  );
}
