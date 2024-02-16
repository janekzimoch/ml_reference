import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"; // Import the faFilter icon
import React, { ReactNode, useState } from "react";

export default function SelectorFilters({ children }: { children: ReactNode }) {
  const [displayItems, setDisplayItems] = useState<boolean>(true);

  function toggleDisplay() {
    setDisplayItems(!displayItems);
  }

  return (
    <div className="text-white">
      <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-gray-700" onClick={toggleDisplay}>
        <FontAwesomeIcon icon={faFilter} style={{ color: "#c9c9c9" }} />
        <div className="flex justify-between w-full items-center">
          <span className="text-[15px] ml-4 text-gray-200 font-normal">Filters</span>
          <span className="text-sm rotate-180" id="arrow">
            {displayItems ? (
              <FontAwesomeIcon icon={faChevronDown} style={{ color: "#c9c9c9" }} />
            ) : (
              <FontAwesomeIcon icon={faChevronUp} style={{ color: "#c9c9c9" }} />
            )}
          </span>
        </div>
      </div>
      <div
        className={`transition-[max-height,opacity] duration-400 ease-in-out ${displayItems ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="flex w-full h-full justify-end pr-4">
          <div className="flex flex-col space-y-2 h-full text-left text-sm w-4/5 text-gray-200 font-light">{children}</div>
        </div>
      </div>
    </div>
  );
}
