import { SelectedField } from "@/app/interface";
import React from "react";

export default function Element({ field, selectField }: { field: SelectedField; selectField: (arg0: SelectedField) => void }) {
  return (
    <button
      key={field.value}
      onClick={(e) => {
        e.stopPropagation();
        selectField(field);
      }}
      className="flex items-center border border-gray-400 rounded-xl px-3 h-[24px] cursor-pointer bg-transparent"
    >
      {field.label}
      <span className="pl-2 text-xl">&times;</span>
    </button>
  );
}
