import React, { useContext, useState } from "react";
import Toggle from "./Toggle";
import Header from "./Header";
import Spacer from "./Spacer";
import { SelectedField, SelectorItem } from "@/app/interface";
import SelectorFilters from "./SelectorFilters";
import DateRangeFilter from "./Filtering/DateRangeFilter";
import CategoryFilter from "./Filtering/CategoryFilter";
import { FiltersContext } from "../Contexts/FiltersContext";

// async function getData() {
//   const res = await fetch("http://127.0.0.1:8000/app/collections_info");
//   if (!res.ok) {
//     throw new Error("Failed to fetch collections_info data");
//   }
//   return res.json();
// }

const optionsConf = [
  { label: "nips", value: 1 },
  { label: "iclr", value: 2 },
  { label: "icml", value: 3 },
  { label: "cvpr", value: 4 },
  { label: "eecv", value: 5 },
  { label: "iccv", value: 6 },
  { label: "acl", value: 7 },
  { label: "amacl", value: 8 },
  { label: "emnlp", value: 9 },
];

const optionsCat = [
  { label: "llm", value: 1 },
  { label: "rag", value: 2 },
  { label: "CV", value: 3 },
  { label: "NLP", value: 4 },
  { label: "speach", value: 5 },
];

export default function Sidebar({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) {
  const [toggleHovered, setToggleHovered] = useState<boolean>(false);

  const { selectedConferences, setSelectedConferences, selectedCategories, setSelectedCategories } = useContext(FiltersContext);
  const availableConferences = optionsConf;
  const availableCategories = optionsCat;

  return (
    <div className="absolute z-10">
      <div className={`h-full fixed flex flex-row top-0 left-0`}>
        <div className="bg-black">
          <div
            className={`h-full ${isOpen ? "w-64" : "w-0"} overflow-hidden transition-width duration-300 bg-gray-800 ${
              toggleHovered ? "opacity-80" : ""
            }`}
          >
            <div className="min-w-64 overflow-visible">
              <Header />
              <Spacer />
              <SelectorFilters>
                <DateRangeFilter />
                <CategoryFilter
                  name="Conferences"
                  availableFields={availableConferences}
                  selectedFields={selectedConferences}
                  setSelectedFields={setSelectedConferences}
                />
                <CategoryFilter
                  name="Categories"
                  availableFields={availableCategories}
                  selectedFields={selectedCategories}
                  setSelectedFields={setSelectedCategories}
                />
              </SelectorFilters>
            </div>
          </div>
        </div>
        <Toggle isOpen={isOpen} toggleHovered={toggleHovered} setToggleHovered={setToggleHovered} onClick={toggleSidebar} />
      </div>
    </div>
  );
}
