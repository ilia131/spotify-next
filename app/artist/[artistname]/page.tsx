"use client"

import ArtistHeroSection from "@/components/Artist/ArtistButtons/ArtistHeroSection";
import ArtistContentSection from "@/components/Artist/ArtistButtons/ArtistContentSection";
import { useParams } from "next/navigation";
import { useArtistDetailQuery } from "@/redux/services/artistApislice";
import { useAppSelector } from "@/redux/hook";
import Clips from "@/components/Artist/ArtistTabs/Clips/Clips";
const Artist = () => {

  const params = useParams<{ artistname: string }>();
  const artistname = params.artistname;
  const activeTab = useAppSelector((state) => state.tabs.activeTab);
  
  const { data, isLoading } = useArtistDetailQuery(artistname)
  if (isLoading) return null
  return (
    <main>
      <ArtistHeroSection
        image={data?.background}
        artistname={data?.artistname}
      />
     {activeTab === 'music' ?  (
        <ArtistContentSection
        songs={data?.songs}
        shorts={data?.shorts}
        artistpick={data?.artist_pick}
      />

     ) : (
      <Clips />
     )}
    
    </main>
  );
};

export default Artist;
