"use client";
import React, { useState } from "react";
import "./ClosingStick.css";

export default function Toggle({
  isOpen,
  toggleHovered,
  setToggleHovered,
  onClick,
}: {
  isOpen: boolean;
  toggleHovered: boolean;
  setToggleHovered: (arg0: boolean) => void;
  onClick: () => void;
}) {
  return (
    <div
      className="flex h-screen p-1 pr-3 items-center justify-center cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setToggleHovered(true)}
      onMouseLeave={() => setToggleHovered(false)}
    >
      {isOpen ? (
        <div className="flex h-6 w-6 flex-col items-center justify-center">
          <div
            className={`h-3 w-1 -m-0.5 rounded-full ${
              toggleHovered ? "bg-gray-500" : "bg-gray-300"
            } drop-shadow-xl transform transition-transform duration-300 ${toggleHovered ? "rotate-15" : "rotate-0"}`}
          ></div>
          <div
            className={`h-3 w-1 -m-0.5 rounded-full ${
              toggleHovered ? "bg-gray-500" : "bg-gray-300"
            } drop-shadow-xl transform transition-transform duration-300 ${toggleHovered ? "-rotate-15" : "rotate-0"}`}
          ></div>
        </div>
      ) : (
        <div className="flex h-8 w-6 flex-col items-center justify-center ">
          <div
            className={`h-3 w-1 -m-0.5 rounded-full ${
              toggleHovered ? "bg-gray-500" : "bg-gray-300"
            } drop-shadow-xl transform transition-transform duration-300 -rotate-15`}
          ></div>
          <div
            className={`h-3 w-1 -m-0.5 rounded-full ${
              toggleHovered ? "bg-gray-500" : "bg-gray-300"
            } drop-shadow-xl transform transition-transform duration-300 rotate-15`}
          ></div>
        </div>
      )}
    </div>
  );
}
