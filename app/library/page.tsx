"use client"


import { useState } from "react";
import { FilterItem } from "@/components/FilterSlider/types";
import images from "@/public/images";
import ArtistLibrary from "@/components/Library/ArtistLibrary";
import HeaderSection from "@/components/Library/HeaderSection";

const filters = [
  {
    name: "Playlists",
    href: "/browse",
    height: "h-[35px]",
    padding: "px-4",
    width: "w-[85px]",
  },
  {
    name: "Artists",
    href: "/browse/music",
    height: "h-[34px]",
    padding: "px-4",
    width: "w-[73px]",
  },
 
];

const musiccard = [
  {name:'Teme Impala', type:'Artist' , cover:images.hip3},
  {name:'Teme Impala', type:'Artist' , cover:images.HipHopLogist},
  {name:'Teme Impala', type:'Artist' , cover:images.sinazza},
  {name:'Teme Impala', type:'Artist' , cover:images.dorcci2},
  {name:'Teme Impala', type:'Artist' , cover:images.gucci},
  {name:'Teme Impala', type:'Artist' , cover:images.hip2},

]

const Library = () => {
    const [activeFilter, setActiveFilter] = useState<FilterItem | null>(null);

    const handleClick = (item: FilterItem) => {
      setActiveFilter(item);
    };
  
    const handleClose = () => {
      setActiveFilter(null);
    };
  return (
    <section>
      <HeaderSection 
         filters={filters}
         activeFilter={activeFilter}
         handleClick={handleClick}
         handleClose={handleClose}
       />
      <ArtistLibrary musiccard={musiccard} />
    </section>
  )
}

export default Library