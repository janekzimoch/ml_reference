import React, { useState } from "react";

export default function Tooltip({ instructions }: { instructions: string }) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    const id = setTimeout(() => setHovered(true), 200); // Wait for 500ms before setting hovered to true
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId); // Clear the timeout if the user leaves before 500ms
      setTimeoutId(null);
    }
    setHovered(false);
  };
  return (
    <div className="flex items-center overflow-visible">
      <button
        className="text-gray-600 hover:text-gray-400 focus:outline-none transition-colors duration-200"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[24px] h-[24px]">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
          />
        </svg>
      </button>
      {hovered && (
        <div className="absolute z-100 bottom-4 left-8 w-48 px-2 py-3 text-sm text-gray-600 bg-white rounded-lg text-center">
          <p>{instructions}</p>
        </div>
      )}
    </div>
  );
}
