import React from 'react'
import HeaderLibrary from './HeaderLibrary'
import { FilterList } from './FilterList'
import { FilterItem } from '../FilterSlider/types'

interface FilterListProps {
    filters: FilterItem[];
    activeFilter: FilterItem | null;
    handleClick: (item: FilterItem) => void;
    handleClose: () => void;
    handleOpen: (isOpen: boolean) => void
    isSearching: boolean;
    setIsSearching: (v: boolean) => void;
    searchTerm: string;
    setSearchTerm: (v: string) => void;
}

const HeaderSection = ({filters , activeFilter , handleClick , handleClose , handleOpen , isSearching , setIsSearching,
   searchTerm , setSearchTerm


}:FilterListProps) => {
  return (
     <div className="max-[440px]:w-full w-110 flex flex-col pt-7.5 pl-4 pr-3.5 bg-[#151515] fixed z-2 pb-4.75">
        <div className="h-26 flex flex-col justify-between">
         <HeaderLibrary handleOpen={handleOpen}
          isSearching={isSearching}
          setIsSearching={setIsSearching}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
         />   
         <FilterList
            filters={filters}
            activeFilter={activeFilter}
            onFilterClick={handleClick}
            onClose={handleClose}
          /> 
       </div>
     </div>
 
  )
}

export default HeaderSection