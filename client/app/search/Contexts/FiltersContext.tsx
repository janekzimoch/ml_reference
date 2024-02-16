import { SelectedField } from "@/app/interface";
import { ReactNode, createContext, useState } from "react";

type filterContextType = {
  selectedConferences: SelectedField[];
  setSelectedConferences: (arg0: SelectedField[]) => void;
  selectedCategories: SelectedField[];
  setSelectedCategories: (arg0: SelectedField[]) => void;
  startDate: Date | null;
  setStartDate: (arg0: Date | null) => void;
  endDate: Date | null;
  setEndDate: (arg0: Date | null) => void;
};

//  createContext is not supported in Server Components
export const FiltersContext = createContext<filterContextType>({
  selectedConferences: [],
  setSelectedConferences: () => {},
  selectedCategories: [],
  setSelectedCategories: () => {},
  startDate: null,
  setStartDate: () => {},
  endDate: null,
  setEndDate: () => {},
});

export default function FiltersProvider({ children }: { children: ReactNode }) {
  const [selectedConferences, setSelectedConferences] = useState<SelectedField[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<SelectedField[]>([]);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  return (
    <FiltersContext.Provider
      value={{
        selectedConferences,
        setSelectedConferences,
        selectedCategories,
        setSelectedCategories,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}
