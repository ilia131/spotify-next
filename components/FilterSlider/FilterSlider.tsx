"use client";

import images from "@/public/images";
import CardSlider from "@/shared/CardSlider/CardSlider";
import CardSection from "@/shared/CardSection/CardSection";
import MoreLikeCard from "@/shared/MoreLikeCard/MoreLikeCard";
import ArtistMiniCard from "../ArtistMiniCard/ArtistMiniCard";

import { SectionConfig } from "@/data/homeSection";
import BigCardArtist from "./BigCardArtist/BigCardArtist";
import { useArtistsQuery, useGetFreshTrackQuery, useGetPopularAlbumQuery, useGetTredingTrackQuery } from "@/redux/services/artistApislice";
import CardSectionPA from "@/entities/albums/ui/card-section-popular-albums";

export const sectionsConfig: SectionConfig[] = [
  { title: "Made For ilia gholami !", items: ["dorcci2", "hiphoplogist2", "hiphoplogist" ,"vini2"] },
  { title: "Popular Albums", items: ["gucci", "vini2", "hiphoplogist" ,"vini2"] },
  { title: "Trending Hits", items: ["hiphoplogist", "vini", "gucci"] },
  { title: "Recommended Today", items: ["hiphoplogist2", "gucci2", "cc"] },
  { title: "Your Favorite Artists", items: ["hiphoplogist", "vini", "dorcci", "dorcci2"], variant: "artist" },
];


export default function FilterSlider() {

  const { data, error, isLoading } = useArtistsQuery();
  const {data: FreshTrack } = useGetFreshTrackQuery();
  const {data : Trending} = useGetTredingTrackQuery();
  const {data : PopularAlbum} = useGetPopularAlbumQuery()



  const sliderData = data ;

  if (isLoading) {
    return <div className="p-4 text-white">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error loading artists</div>;
  }

  return (
    <div className="pl-4 relative hide-scrollbar pb-24 pt-23.25">
      
      <ArtistMiniCard />
      
      {FreshTrack && FreshTrack.length !== 0 && (
          <CardSection
            title="Fresh Track Friday!"
            items={FreshTrack ?? []}
          />
        )}
      {Trending && Trending.length !== 0 && (
         <CardSection
         title="Trending Hits"
         items={Trending ?? []}
       />
      )}
       
     
     {PopularAlbum && PopularAlbum.length !== 0 && (
        <CardSectionPA 
        title="Popular Albums"
        items={PopularAlbum ?? []}/>
     )}
    

      <MoreLikeCard
        images={images.HipHopLogist}
        subtitle="More Like"
        label="Hiphopolgist"
      />
      {sliderData && sliderData.length !== 0 && (
       <CardSlider
       cardimages={sliderData}
       title=""
     />
      )}
      

      {data?.map((artist) => (
        <BigCardArtist
          key={artist.id}
          item={{
            name: artist.artistname,
            pic: artist.profile_pic,
            bg: artist.background,
          }}
        />
      ))}

    </div>
  );
}
