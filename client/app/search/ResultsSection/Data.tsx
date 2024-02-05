import React from "react";

export default function Data({ url, year }: { url: string; year: number }) {
  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const target = event.target as HTMLAnchorElement;
    window.open(target.href, "_blank"); // Open the link in a new tab
  };

  return (
    <div className="flex flex-row items-center text-sm justify-between mb-2">
      <a href={url} onClick={handleLinkClick} className="bg-pastel/50 hover:bg-pastel/80 font-light rounded-md px-4">
        {url}
      </a>
      <div className="bg-pastel/50 drop-shadow-sm font-light rounded-md px-4">{year}</div>
    </div>
  );
}
