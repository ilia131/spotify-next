"use client";

import { FilterItem } from "./NavSlider";

interface FilterButtonProps {
  item: FilterItem;
  isActive: boolean;
  onClick: () => void; 
}

export const FilterButton = ({ item, isActive, onClick }: FilterButtonProps) => {
  const baseClasses =
    "flex items-center justify-center rounded-[19px] text-[13px] transition-colors";
  const activeClasses = "bg-[#1FD660] text-black/70 font-medium";
  const inactiveClasses = "bg-[rgba(41,41,41,0.82)] text-white/75";

  return (
    <button
      onClick={onClick}
      className={`${item.width} ${item.height} ${item.padding} ${baseClasses} ${
        isActive ? activeClasses : inactiveClasses
      }`}
    >
      {item.name}
    </button>
  );
};
