import React from "react";
import { Document } from "@/app/interface";

export default function ResultsItem({ id, document }: { id: number; document: Document }) {
  return (
    <div className="">
      <div className="my-10 bg-white border border-gray-200 rounded-xl p-2 drop-shadow-md">
        <span className="flex pb-2 flex-row text-lg">
          <p className="bg-prm-green px-2 bg-blue-100 rounded-full">{id}</p>
          <p className="pl-4">{document.title}</p>
        </span>
        <p className="text-md font-light">{document.abstract}</p>
      </div>
    </div>
  );
}
