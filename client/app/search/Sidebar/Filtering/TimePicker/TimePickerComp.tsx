"use client";
import React, { useState } from "react";
import { DatePicker } from "./Components/DatePicker";
import { IOptions } from "./Options";

const options: IOptions = {
  autoHide: true,
  todayBtn: true,
  clearBtn: true,
  inputDateFormatProp: {
    day: "2-digit",
    month: "short",
    year: "numeric",
  },
  theme: {
    background: "",
    todayBtn: "",
    clearBtn: "",
    icons: "",
    text: "",
    disabledText: "",
    input: "",
    inputIcon: "",
    selected: "",
  },
  datepickerClassNames: "top-10 left-72",
  defaultDate: null,
  inputPlaceholderProp: "all dates",
};

export default function TimePickerComp({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Date | null;
  setSelectedDate: (arg0: Date | null) => void;
}) {
  const [show, setShow] = useState<boolean>(false);
  const handleChange = (selectedDate: Date) => {
    setSelectedDate(selectedDate);
    console.log(selectedDate);
  };
  const handleClose = (state: boolean) => {
    setShow(state);
  };

  return (
    <div>
      <DatePicker options={options} onChange={handleChange} show={show} setShow={handleClose} />
    </div>
  );
}
