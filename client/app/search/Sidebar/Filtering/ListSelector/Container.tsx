import React, { ReactNode, RefObject } from "react";

export default function Container({ children, ref }: { children: ReactNode; ref: RefObject<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      tabIndex={0}
      className="relative flex w-full min-h-[100px] text-md font-light border-[1px] border-gray-600 ml-1 p-2 rounded-xl  gap-2 items-start"
    >
      <span className="flex-grow inline-flex gap-2 flex-wrap">{children}</span>
    </div>
  );
}
