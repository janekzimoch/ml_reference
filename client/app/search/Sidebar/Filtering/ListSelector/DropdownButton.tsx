import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

export default function DropdownButton({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <div
      className="absolute z-10 cursor-pointer right-0 bottom-0 m-3 transition-all duration-300 ease-in-out hover:translate-y-0.5"
      onClick={onClick}
    >
      {isOpen ? (
        <FontAwesomeIcon icon={faChevronUp} style={{ color: "#c9c9c9" }} />
      ) : (
        <FontAwesomeIcon icon={faChevronDown} style={{ color: "#c9c9c9" }} />
      )}
    </div>
  );
}
