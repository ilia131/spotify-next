import { useMemo } from "react";
import { FilterItem } from "@/components/FilterSlider/types";

export const useFilterLogic = (filters: FilterItem[], activeFilter: FilterItem | null) => {
  
  const isActive = (item: FilterItem) => activeFilter?.name === item.name;

  
  const visibleFilters = useMemo(() => {
    if (!activeFilter) return filters;

    const activeIndex = filters.findIndex(f => f.name === activeFilter.name);

    return filters.filter((item, index) => {
      if (index === activeIndex - 1 || index === activeIndex + 1) return false;
      return true;
    });
  }, [filters, activeFilter]);

  return { isActive, visibleFilters };
};
