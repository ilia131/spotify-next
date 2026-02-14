"use client"


import ArtistHeroSection from "@/components/Artist/ArtistButtons/ArtistHeroSection";
import ArtistContentSection from "@/components/Artist/ArtistButtons/ArtistContentSection";
import { useParams } from "next/navigation";
import { useGetsongidQuery } from "@/redux/services/songidApi";

const Artist = () => {
  const {id} = useParams()
  const {data} = useGetsongidQuery(id)

  return (
    <main className="relative">
         <ArtistHeroSection image={data?.profile_pic} artistname={data?.artistname}/>
         <ArtistContentSection songs={data?.songs} />
    </main>
   
  );
};




export default Artist;





