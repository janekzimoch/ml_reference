"use client";
import React, { useState } from "react";

export default function Query() {
  const [query, setQuery] = useState("");
  let previous_textarea_value = "";

  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const textarea = e.target;
    setQuery(e.target.value);
    if (textarea.value.length < previous_textarea_value.length) {
      textarea.style.height = "auto"; // allow textarea to resize when removing words
    }
    console.log(textarea.scrollHeight);
    textarea.style.height = `${textarea.scrollHeight}px`;
    textarea.style.overflowY = textarea.scrollHeight > 200 ? "auto" : "hidden";
    previous_textarea_value = textarea.value;
  }

  return (
    <div className="flex text-lg">
      <textarea
        name="query"
        rows={7}
        placeholder="Describe year research idea or papers you are looking for... "
        value={query}
        onChange={handleInputChange}
        className="placeholder-gray-400 py-3.5 px-6 text-gray-600 resize-none w-full border border-gray-300 custom-scrollbar rounded-xl focus:outline-none"
        style={{ height: "56px", maxHeight: "200px" }} // Initial height and max height
      />
    </div>
  );
}

//    <div className="bg-yellow-100 flex text-gray-400 text-md font-light break-words">
// </div>
//"bg-red-100 no-scrollbar w-full overflow-auto bg-transparent  resize-none focus:outline-none"
{
  /* <div className="w-full pt-2 md:pt-0 dark:border-white/20 border-transparent md:w-[calc(100%-2rem)]">
<div className="mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
  <div className="relative flex flex-1 h-full items-stretch md:flex-col">
    <div className="flex items-center w-full">
      <div className="flex flex-col flex-grow w-full relative border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 shadow-md">
        <textarea
          rows={1}
          placeholder="Message ChatGPT…"
          className="m-0 w-full resize-none border-0 bg-transparent py-2.5 pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent placeholder-black/50 dark:placeholder-white/50 pl-10 md:pl-14 overflow-y-hidden"
          style={{ maxHeight: "200px", height: "52px" }}
        ></textarea>
      </div>
    </div>
  </div>
</div>
</div> */
}
