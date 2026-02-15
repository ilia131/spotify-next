import React from 'react'
import SearchHeaderTopSection from './SearchHeaderTopSection'
import SearchInputSection from './SearchInputSection'

interface Props {
    scrolled:boolean
}

const SearchHeader = ({scrolled}:Props) => {
  return (
    <div className='h-24 flex flex-col gap-3 sticky top-0 z-20 bg-[#121212] w-full pl-4 pr-3.5 '>
    <SearchHeaderTopSection scrolled={scrolled} />
    <SearchInputSection scrolled={scrolled} />
  </div>
  )
}

export default SearchHeader