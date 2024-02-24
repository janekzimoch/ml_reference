import { SelectedField } from "@/app/interface";
import React, { RefObject } from "react";

export default function DropdownBox({
  isOpen,
  setIsOpen,
  availableFields,
  selectField,
  isFieldSelected,
  highlightedIndex,
  setHighlightedIndex,
  innerRef,
}: {
  isOpen: boolean;
  setIsOpen: (arg0: boolean) => void;
  availableFields: SelectedField[];
  selectField: (arg0: SelectedField) => void;
  isFieldSelected: (arg0: SelectedField) => boolean;
  highlightedIndex: number;
  setHighlightedIndex: (arg0: number) => void;
  innerRef: RefObject<HTMLUListElement>;
}) {
  return (
    <div className={`rounded-lg overflow-hidden border-gray-600 border-[1px] w-full left-0 ml-1 top-full mt-1 ${isOpen ? "" : "hidden"}`}>
      <ul ref={innerRef} className="custom-scrollbar darker thiner max-h-48 w-full  bg-gray-800 overflow-auto">
        {availableFields.map((option, index) => (
          <li
            onClick={(e) => {
              e.stopPropagation();
              selectField(option);
              setIsOpen(false);
            }}
            onMouseEnter={() => setHighlightedIndex(index)}
            key={option.value}
            className={`cursor-pointer border-b border-gray-600 p-1 pl-3 overflow-hidden ${isFieldSelected(option) ? "bg-gray-600/60" : ""} ${
              index === highlightedIndex ? "bg-gray-600/30" : ""
            }`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
