"use client"
import { useState, useEffect } from 'react';
import images from "@/public/images"
import SearchHeader from '@/components/Search/SearchHeaders/SearchHeader';
import SearchFilterSection from '@/components/Search/SearchFilter/SearchFilterSection';
import SearchShortVideo from '@/components/Search/SearchShortVideo/SearchShortVideo';
import SearchFilterAllCard from '@/components/Search/SearchFilter/SearchFilterAllCard';
const categories = [
  {name:'Music' , color:'bg-[rgba(219,21,140,1)]'},
  {name:'Podcasts' , color:'bg-[rgba(185,93,8,1)]'},
  {name:'Physics Packs' , color:'bg-[rgba(130,1,231,1)]'},
  {name:'Live Events' , color:'bg-[rgba(30,50,100,1)]'},

]


const shortvideo = [
  {musicname:'SAVE ME!', cover:images.hip3},
  {musicname:'NARO !', cover:images.hip2},
  {musicname:'Belaad Party', cover:images.HipHopLogist},
  
]


const categories2 = [
  {cover:images.hip2},
  {cover:images.Kagan},
  {cover:images.dorcci2},
  {cover:images.hip2},
  {cover:images.hip2},

  {cover:images.hip2},

  {cover:images.hip2},

  {cover:images.hip2},

  {cover:images.hip2},

  {cover:images.hip2},




]



const Search = () => {
  const [scrolled, setScrolled] = useState(false);

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
          <SearchFilterSection categories={categories} title='Start browsing' />
          <SearchShortVideo shortvideo={shortvideo} title='Start browsing' />
          <SearchFilterAllCard categories2={categories2} title='Start browsing' />
       </div>
   
  )
}

export default Search