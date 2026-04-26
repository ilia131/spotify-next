import ArtistPopularMusic from "../ArtistTabs/ArtistPopularMusic";
import ArtistPick from "../ArtistTabs/ArtistPick/ArtistPick";
import ArtistPopularRelease from "./ArtistPopularRelease";
import ArtistFeaturing from "./ArtistFeaturing";
import { Song } from "@/redux/features/playerSlice";

import ArtistVerify from "./ArtistVerify";

import ShortVideoSection from "./ShortVideoSection";
import { Shorts } from "@/redux/services/artistApislice";




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
}



const ArtistContentSection = ({songs , artistpick , shorts}:ArtistContentSectionProps) => {
  return (
    <section className="grid pb-50 overflow-hidden">
      <ArtistPopularMusic songs={songs} />
      <ArtistPick artistpick={artistpick} />
      <ArtistPopularRelease artistpm={songs}/> 
      <ArtistFeaturing />
      <ShortVideoSection shortvideo={shorts} />
      <ArtistVerify /> 
    </section>
  );
};

export default ArtistContentSection;