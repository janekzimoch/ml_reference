import React, { useContext } from "react";
import TimePickerComp from "./TimePicker/TimePickerComp";
import Tooltip from "./Tooltip";
import { FiltersContext } from "../../Contexts/FiltersContext";

export default function DateRangeFilter() {
  const { setStartDate, setEndDate } = useContext(FiltersContext);

  return (
    <div>
      <div className="flex items-center justify-between py-2 mt-1">
        <h1>Date Range</h1>
        <Tooltip instructions="Living `From` or `To` empty will leave start or end date unbounded, respectively." />
      </div>
      <div className="flex flex-col space-y-2 text-md font-light border-[1px] border-gray-600 ml-1 px-2 py-3 rounded-xl">
        <span className="flex flex-row items-center ">
          <p className="w-16 text-start">From:</p>
          <TimePickerComp setSelectedDate={setStartDate} />
        </span>
        <span className="flex flex-row items-center">
          <p className="w-16 text-start">To:</p>
          <TimePickerComp setSelectedDate={setEndDate} />
        </span>
      </div>
    </div>
  );
}
