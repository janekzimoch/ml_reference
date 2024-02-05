import React from "react";

export default function Abstract({ abstract }: { abstract: string }) {
  return (
    <div className="text-gray-900 text-sm">
      <span className="border-2 border-pastel rounded-md font-light text-gray-700  mx-1 ml-0 mr-3 text-center inline-block w-[100px] drop-shadow-sm">
        Abstract{" "}
      </span>
      <span className="font-extralight">{abstract}</span>
    </div>
  );
}
