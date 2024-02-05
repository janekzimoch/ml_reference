import React from "react";

export default function Title({ title }: { title: string }) {
  return (
    <div className="pb-1 text-gray-900 text-md ">
      <span className="border-2 border-pastel-dark rounded-md font-light text-gray-700 mx-1 ml-0 mr-3 text-center inline-block w-[100px] drop-shadow-sm">
        Title
      </span>
      <span className="font-light">{title}</span>
    </div>
  );
}
