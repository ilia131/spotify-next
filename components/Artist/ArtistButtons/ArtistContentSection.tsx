import ArtistPopularMusic from "../ArtistTabs/ArtistPopularMusic";
import ArtistPick from "../ArtistTabs/ArtistPick/ArtistPick";
import ArtistPopularRelease from "./ArtistPopularRelease";
import ArtistFeaturing from "./ArtistFeaturing";
import { Song } from "@/redux/features/playerSlice";
import Link from "next/link";

import ArtistVerify from "./ArtistVerify";

import ShortVideoSection from "./ShortVideoSection";
import { Artist, Shorts } from "@/redux/services/artistApislice";




export type ArtistPickProps = {
  artistpick: {
    image: string;
    title: string;
  };
};
export type ArtistPickProps2 = {
  image: string;
  title: string;
};
interface ArtistContentSectionProps {
   songs?: Song[] 
   artistpick?:ArtistPickProps2 
   shorts?:Shorts[] ,
   artistname:string,
   data:Artist
}



const ArtistContentSection = ({songs , artistpick , shorts , artistname  , data }:ArtistContentSectionProps) => {
  return (
    <section className="grid pb-50 overflow-hidden">
      <ArtistPopularMusic songs={songs} />
      
      {/* <ArtistPick artistpick={artistpick} /> */}

      <ArtistPopularRelease /> 
      <ArtistFeaturing songs={songs ?? []}   artistname={artistname} />
      {(shorts?.length ?? 0) > 0 && (
          <ShortVideoSection shortvideo={shorts} artistname={artistname} />
     )}
      <ArtistVerify data={data ?? []} />
      <div className="w-107.5 max-[430px]:w-full flex justify-center pt-10">
            <Link
        href={`/artist/discography/${artistname}`}
        className="
            h-12  w-40
          rounded-full
          border border-white/20
          flex items-center justify-center
          text-white text-sm font-medium
          hover:bg-white hover:text-black
          transition-all duration-200
        "
        >
        Discography
      </Link> 
</div>
    </section>
  );
};

export default ArtistContentSection;