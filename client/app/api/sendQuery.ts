import { SelectedField } from "../interface";

type QueryProps = {
  query: string;
  pageParam?: number;
  startDate?: Date | null;
  endDate?: Date | null;
  selectedConferences?: SelectedField[];
  selectedCategories?: SelectedField[];
};

export async function sendQuery({
  query,
  pageParam = 0, // Default value assigned here
  startDate = null,
  endDate = null,
  selectedConferences = [],
  selectedCategories = [],
}: QueryProps) {
  const body = JSON.stringify({
    text: query,
    filter: {
      start_date: startDate ? startDate.toISOString() : null,
      end_date: endDate ? endDate.toISOString() : null,
      conferences: selectedConferences.map((x) => x.label),
      categories: selectedCategories.map((x) => x.label),
    },
    metadata: {},
    page: pageParam,
  });
  console.log("body: ", body);

  const response = await fetch("http://127.0.0.1:8000/app/search_papers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return { searchResults: data, nextPage: pageParam + 1 };
}
