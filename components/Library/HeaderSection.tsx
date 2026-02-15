import React from 'react'
import HeaderLibrary from './HeaderLibrary'
import { FilterList } from './FilterList'
import { FilterItem } from '../FilterSlider/types'

interface FilterListProps {
    filters: FilterItem[];
    activeFilter: FilterItem | null;
    handleClick: (item: FilterItem) => void;
    handleClose: () => void;
}

const HeaderSection = ({filters , activeFilter , handleClick , handleClose}:FilterListProps) => {
  return (
    <section>
     <div className="w-full flex flex-col pt-7.5 pl-4 pr-3.5 bg-[#151515] fixed z-2 pb-4.75">
        <div className="w-full  h-26 flex flex-col justify-between">
         <HeaderLibrary />   
         <FilterList
            filters={filters}
            activeFilter={activeFilter}
            onFilterClick={handleClick}
            onClose={handleClose}
          /> 
       </div>
     </div>
    </section>
  )
}

export default HeaderSection