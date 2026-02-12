import ArtistPopularMusic from "../ArtistTabs/ArtistPopularMusic";
import ArtistPick from "../ArtistTabs/ArtistPick/ArtistPick";
import ArtistPopularRelease from "./ArtistPopularRelease";
import images from "@/public/images";
import ArtistFeaturing from "./ArtistFeaturing";
import { Song } from "@/redux/features/playerSlice";

import ArtistVerify from "./ArtistVerify";

import ShortVideoSection from "./ShortVideoSection";

const artistpm = [
  {musicname:'SAVE ME!', cover:images.hip3},
  {musicname:'NARO !', cover:images.hip2},
  {musicname:'Belaad Party', cover:images.hip3},
  {musicname:'Cardi3', cover:images.HipHopLogist}
]

const shortvideo = [
  {musicname:'SAVE ME!', cover:images.hip3},
  {musicname:'NARO !', cover:images.hip2},
  {musicname:'Belaad Party', cover:images.HipHopLogist},
  
]

interface ArtistContentSectionProps {
   songs: Song[]
}



const ArtistContentSection = ({songs}:ArtistContentSectionProps) => {
  return (
    <section className="grid pb-50 overflow-hidden">
      <ArtistPopularMusic songs={songs ||artistpm} />
      <ArtistPick />
      <ArtistPopularRelease artistpm={songs ||artistpm}/> 
      <ArtistFeaturing />
      <ShortVideoSection shortvideo={shortvideo} />
      <ArtistVerify /> 
    </section>
  );
};

export default ArtistContentSection;