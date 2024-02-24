"use client";

import React, { useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Image from "next/image";

export default function InputSection({
  query,
  setQuery,
  handleSendQuery,
}: {
  query: string;
  setQuery: (query: string) => void;
  handleSendQuery: () => void;
}) {
  const textareaRef = useRef(null);

  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setQuery(e.target.value);
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter" && event.target === textareaRef.current) {
      if (!event.shiftKey) {
        event.preventDefault(); // Prevent line break in textarea
        handleSendQuery();
      }
    }
  }

  return (
    <div className="flex relative bg-white text-lg overflow-hidden border border-customGray-400 rounded-2xl">
      <TextareaAutosize
        name="query"
        ref={textareaRef}
        maxRows={7}
        autoFocus
        placeholder="Paste your abstract or describe year research idea ... "
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="placeholder-gray-400 py-3.5 pl-8 pr-16 text-gray-800 resize-none w-full custom-scrollbar focus:outline-none drop-shadow-sm"
      />
      <Image
        src="/send.svg"
        width={28}
        height={28}
        className="absolute bottom-0 right-2 m-2 cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out"
        onClick={handleSendQuery}
        alt="send"
      />
    </div>
  );
}
