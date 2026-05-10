"use client"

import ArtistHeroSection from "@/components/Artist/ArtistButtons/ArtistHeroSection";
import ArtistContentSection from "@/components/Artist/ArtistButtons/ArtistContentSection";
import { useParams } from "next/navigation";
import {  useArtistDetailQuery } from "@/redux/services/artistApislice";
import type { Artist } from "@/redux/services/artistApislice";
import { useAppSelector } from "@/redux/hook";
import Clips from "@/components/Artist/ArtistTabs/Clips/Clips";

const ArtistDetail = () => {

  const params = useParams<{ artistname: string }>();
  const artistname = params.artistname;
  const artistname2 = params.artistname ? decodeURIComponent(params.artistname) : "";
  
  const activeTab = useAppSelector((state) => state.tabs.activeTab);
  
  const { data, isLoading } = useArtistDetailQuery(artistname)
  if (isLoading) return null
  return (
    <main>
      <ArtistHeroSection
        image={data?.background}
        artistname={data?.artistname}
        data={data as Artist}
      />
     {activeTab === 'music' ?  (
        <ArtistContentSection
        songs={data?.songs}
        shorts={data?.shorts}
        artistpick={data?.artist_pick}
        artistname={artistname2}
        data={data as Artist }
      />

     ) : (
      <Clips />
     )}

    </main>
  );
};

export default ArtistDetail;
