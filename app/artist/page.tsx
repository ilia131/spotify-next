"use client"
import Image from "next/image"
import images from "@/public/images"
import ArtistButtons from "@/components/Artist/ArtistButtons/ArtistButtons";
import ArtistName from "@/components/Artist/ArtistName";
import ArtistPopularMusic from "@/components/Artist/ArtistTabs/ArtistPopularMusic";
import ArtistPick from "@/components/Artist/ArtistTabs/ArtistPick/ArtistPick";




const Artist = () => {
  return (
    <div className="" >
      <div className="relative w-full h-117 overflow-hidden pt-[env(safe-area-inset-top)]">
        <Image
          src={images.Kagan}
          alt="kagan"
          fill
          className="object-cover "
          priority
        />
        <ArtistName />
         <div className="absolute bottom-0 w-full h-37">
          <div className="absolute inset-0 bg-[#121212]"/>
          <ArtistButtons />
          
        </div>
      </div>
      <ArtistPopularMusic  />
      
      <ArtistPick />
    </div>
   
  );
};

export default Artist;
