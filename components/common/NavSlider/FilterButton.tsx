"use client";

import { FilterItem } from "./NavSlider";
import { useRouter } from "next/navigation";

interface FilterButtonProps {
  item: FilterItem;
  isActive: boolean;
  onClick: () => void; 
}

export const FilterButton = ({ item, isActive, onClick }: FilterButtonProps) => {
  const router = useRouter();
  const baseClasses =
    "flex items-center justify-center rounded-[19px] text-[13px] transition-colors";
  const activeClasses = "bg-[#1FD660] text-black/70 font-medium";
  const inactiveClasses = "bg-[rgba(41,41,41,0.82)] text-white/75";
  const handlePrefetch = () => {
    if (!isActive) {
      router.prefetch(item.href);
    }
  };
  return (
    <button
      onClick={onClick}
      className={`${item.width} ${item.height} ${item.padding} ${baseClasses} ${
        isActive ? activeClasses : inactiveClasses
      }`}
      onMouseEnter={handlePrefetch} 
      onTouchStart={handlePrefetch}
    >
      {item.name}
    </button>
  );
};
