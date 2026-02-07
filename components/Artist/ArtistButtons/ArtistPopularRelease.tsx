import TitleMusic from "../ArtistTabs/TitleMusic";
import  { StaticImageData } from "next/image";

import PopularReleaseCard from "./PopularReleaseCard";

interface ArtistPopularMusicProps {
    artistpm:ItemPopularMusic[]
}

interface ItemPopularMusic {
    musicname:string;
    cover:StaticImageData;
}

const ArtistPopularRelease = ({artistpm}:ArtistPopularMusicProps) => {
  return (
    <div className="pl-4.5 pt-5.25 pr-4 grid gap-2.25">
    <TitleMusic title="Popular releases"  />
    {artistpm.map((item , i)=>(
      <PopularReleaseCard item={item} key={i}/> 
    ))}
  </div>  
  )
}

export default ArtistPopularRelease