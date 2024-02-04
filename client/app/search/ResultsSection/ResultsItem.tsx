import React from "react";
import { Document } from "@/app/interface";

export default function ResultsItem({ id, document }: { id: number; document: Document }) {
  return (
    <div className="">
      <div className="mb-10 bg-white border border-gray-200 rounded-xl p-2 drop-shadow-md">
        <div className="pb-4 text-gray-600 text-md ">
          <span className="border border-pastel-dark rounded-md font-extralight mx-1 ml-0 mr-3 text-center inline-block w-[100px]">Title</span>
          <span className="font-light">{document.title}</span>
        </div>
        <div className="text-gray-600 text-sm">
          <span className="border border-pastel rounded-md font-extralight  mx-1 ml-0 mr-3 text-center inline-block w-[100px]">Abstract </span>
          <span className="font-extralight">{document.abstract}</span>
        </div>
      </div>
    </div>
  );
}
