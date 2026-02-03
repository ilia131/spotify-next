"use client";

import { FilterButton } from "@/components/FilterSlider/NavSlider/FilterButton";
import { useNavSlider } from "@/hooks/useNavSlider/useNavSlider";
import { NavSliderLayout } from "./NavSliderLayout";

export interface FilterItem {
  readonly name: string;
  readonly height: string;
  readonly padding: string;
  readonly width: string;
  readonly href: string;
}

interface NavSliderProps {
  filters: readonly FilterItem[];
  defaultActive?: string;
}

const NavSlider = ({
  filters,
  defaultActive = filters[0]?.name,
}: NavSliderProps) => {
  const {  handleClick , isActive } = useNavSlider(defaultActive);
  return (
    <NavSliderLayout>
      <div className="overflow-x-auto hide-scrollbar">
        <div className="flex gap-[11.77px] pl-12.5 pr-4 whitespace-nowrap min-w-max">
          {filters.map((item) => {
            return (
              <FilterButton
                key={item.name}
                item={item}
                isActive={isActive(item)}
                onClick={() => handleClick(item)}
              />
            );
          })}
        </div>
      </div>
    </NavSliderLayout>
  );
};

export default NavSlider;
