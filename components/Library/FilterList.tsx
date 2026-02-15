import { CloseButton } from "./CloseButton";
import { FilterItem } from "../FilterSlider/types";
import { FilterButton } from "../common/NavSlider/FilterButton";
import { useFilterLogic } from "@/hooks/libraryhooks/useFilterLogic";
interface FilterListProps {
    filters: FilterItem[];
    activeFilter: FilterItem | null;
    onFilterClick: (item: FilterItem) => void;
    onClose: () => void;
  }
  
export const FilterList = ({ filters, activeFilter, onFilterClick, onClose }: FilterListProps) => {
    const { isActive, visibleFilters } = useFilterLogic(filters, activeFilter);

    return (
      <div className="w-42 h-8.75 flex justify-between">
       {visibleFilters.map((item) => (
        <div key={item.name} className="flex items-center gap-2">
          {isActive(item) && <CloseButton onClick={onClose} />}
            <FilterButton
                item={item}
                isActive={isActive(item)}
                onClick={() => onFilterClick(item)}
            />
        </div>
      ))}
      </div>
    );
  };