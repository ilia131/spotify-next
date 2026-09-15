"use client"
import { useState, useEffect } from 'react';
import SearchHeader from '@/components/Search/SearchHeaders/SearchHeader';
import SearchShortVideo from '@/components/Search/SearchShortVideo/SearchShortVideo';
import SearchFilterAllCard from '@/components/Search/SearchFilter/SearchFilterAllCard';
import { useGetShortVideoQuery } from '@/redux/services/artistApislice';



const Search = () => {
  const [scrolled, setScrolled] = useState(false);
  const { data} = useGetShortVideoQuery(3)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
       <div className="flex flex-col pt-7.5 ">
          <SearchHeader scrolled={scrolled} />
          {/* <SearchFilterSection categories={categories} title='Start browsing' /> */}
          {data?.results.length > 0 && (
                     <SearchShortVideo shortvideo={data?.results.slice(0,3)} title='Start browsing Short Videos' />
          )}
          <SearchFilterAllCard  title='Start browsing by Genre' />
       </div>
   
  )
}

export default Search