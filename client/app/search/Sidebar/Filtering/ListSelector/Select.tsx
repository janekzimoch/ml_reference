import { useEffect, useRef, useState } from "react";
import DropdownButton from "./DropdownButton";
import Element from "./Element";
import DropdownBox from "./DropdownBox";
import Container from "./Container";
import { SelectedField } from "@/app/interface";

export default function Select({
  selectedFields,
  onChange,
  availableFields,
}: {
  selectedFields: SelectedField[];
  onChange: (arg0: SelectedField[]) => void;
  availableFields: SelectedField[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const popupListRef = useRef<HTMLUListElement>(null);

  function clearOptions() {
    onChange([]);
  }

  function selectField(field: SelectedField) {
    if (selectedFields.includes(field)) {
      onChange(selectedFields.filter((o) => o !== field));
    } else {
      onChange([...selectedFields, field]);
    }
  }

  function isFieldSelected(field: SelectedField) {
    return selectedFields.includes(field);
  }

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.target !== containerRef.current) return;
      switch (event.code) {
        case "Enter":
        case "Space":
          setIsOpen((prev) => !prev);
          if (isOpen) selectField(availableFields[highlightedIndex]);
          break;
        case "ArrowUp":
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }

          const newValue = highlightedIndex + (event.code === "ArrowDown" ? 1 : -1);
          if (newValue >= 0 && newValue < availableFields.length) {
            setHighlightedIndex(newValue);
          }
          break;
        }
        case "Escape":
          setIsOpen(false);
          break;
      }
    };
    containerRef.current?.addEventListener("keydown", handler);

    return () => {
      containerRef.current?.removeEventListener("keydown", handler);
    };
  }, [isOpen, highlightedIndex, availableFields]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupListRef.current && !popupListRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    // Attach the event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);
    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="text-gray-400 drop-shadow-md overflow-visible">
      <Container innerRef={containerRef}>
        <DropdownButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

        {selectedFields.map((field, index) => (
          <Element key={index} field={field} selectField={selectField} />
        ))}
      </Container>
      <DropdownBox
        innerRef={popupListRef}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        availableFields={availableFields}
        selectField={selectField}
        isFieldSelected={isFieldSelected}
        highlightedIndex={highlightedIndex}
        setHighlightedIndex={setHighlightedIndex}
      />
    </div>
  );
}
