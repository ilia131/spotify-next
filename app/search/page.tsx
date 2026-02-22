"use client"
import { useState, useEffect } from 'react';
import images from "@/public/images"
import SearchHeader from '@/components/Search/SearchHeaders/SearchHeader';
import SearchFilterSection from '@/components/Search/SearchFilter/SearchFilterSection';
import SearchShortVideo from '@/components/Search/SearchShortVideo/SearchShortVideo';
import SearchFilterAllCard from '@/components/Search/SearchFilter/SearchFilterAllCard';





const categories = [
  {name:'Music' , color:'bg-linear-to-r from-[rgba(97,84,76,1)] to-[rgba(97,84,76,1)]' , img:images.searchdisc},
  {name:'Podcasts' , color:'bg-linear-to-r from-[rgba(30,50,100,1)] to-[rgba(61,101,202,1)]' , img:images.searchdisc3},
  {name:'Physics Packs' , color:'bg-linear-to-r from-[rgba(62,23,64,1)] to-[rgba(161,60,166,1)]' , img:images.searchdisc3},
  {name:'Live Events' , color:'bg-linear-to-r from-[rgba(150,34,36,1)] to-[rgba(48,11,11,1)]' , img:images.searchdisc3},

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