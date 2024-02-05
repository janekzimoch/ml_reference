import React from "react";
import { Document } from "@/app/interface";
import Title from "./Title";
import Abstract from "./Abstract";
import Data from "./Data";

export default function ResultsItem({ id, document }: { id: number; document: Document }) {
  return (
    <div className="">
      <div className="mb-10 bg-white border border-gray-200 rounded-xl p-6 drop-shadow-md">
        <Title title={document.title} />
        <Data url={document.url} year={document.year} />
        <Abstract abstract={document.abstract} />
      </div>
    </div>
  );
}
