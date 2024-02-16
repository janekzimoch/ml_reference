import React from "react";
import Select from "./ListSelector/Select";
import { SelectedField } from "@/app/interface";
import Tooltip from "./Tooltip";

export default function CategoryFilter({
  name,
  availableFields,
  selectedFields,
  setSelectedFields,
}: {
  name: string;
  availableFields: SelectedField[];
  selectedFields: SelectedField[];
  setSelectedFields: (arg0: SelectedField[]) => void;
}) {
  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-between py-2 mt-1">
        <h1>{name}</h1>
        <Tooltip
          instructions={`Select which ${name.toLowerCase()} you want to apply as filters. ${
            name.toLowerCase() == "categories" ? "Curently all documents which match at least on category will be retrived." : ""
          }`}
        />
      </div>
      <Select availableFields={availableFields} selectedFields={selectedFields} onChange={(o: SelectedField[]) => setSelectedFields(o)} />
    </div>
  );
}
