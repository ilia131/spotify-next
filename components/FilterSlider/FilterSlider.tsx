"use client";

import CardSlider from "@/shared/CardSlider/CardSlider";
import CardSection from "@/shared/CardSection/CardSection";
import MoreLikeCard from "@/shared/MoreLikeCard/MoreLikeCard";
import ArtistMiniCard from "../ArtistMiniCard/ArtistMiniCard";

import { SectionConfig } from "@/data/homeSection";
import BigCardArtist from "./BigCardArtist/BigCardArtist";
import { useArtistsQuery, useGetBigCardArtistsQuery, useGetFreshTrackQuery, useGetPopularAlbumQuery, useGetTredingTrackQuery } from "@/redux/services/artistApislice";
import CardSectionPA from "@/entities/albums/ui/card-section-popular-albums";
import { useGetFavArtistsQuery } from "@/redux/services/artistApislice";
import SkeletonSection from "@/shared/ui/Skeleton/SkeletonSection";

export const sectionsConfig: SectionConfig[] = [
  { title: "Made For ilia gholami !", items: ["dorcci2", "hiphoplogist2", "hiphoplogist" ,"vini2"] },
  { title: "Popular Albums", items: ["gucci", "vini2", "hiphoplogist" ,"vini2"] },
  { title: "Trending Hits", items: ["hiphoplogist", "vini", "gucci"] },
  { title: "Recommended Today", items: ["hiphoplogist2", "gucci2", "cc"] },
  { title: "Your Favorite Artists", items: ["hiphoplogist", "vini", "dorcci", "dorcci2"], variant: "artist" },
];


export default function FilterSlider() {
  const { data: artists } = useGetFavArtistsQuery(0);
  const latestArtist = artists?.[artists.length - 1];
  const { data, error, isLoading } = useArtistsQuery();
  const {data: FreshTrack } = useGetFreshTrackQuery();
  const {data : Trending} = useGetTredingTrackQuery();
  const {data : PopularAlbum} = useGetPopularAlbumQuery()

  const { data: bigArtists } = useGetBigCardArtistsQuery();




  const sliderData = data ;
  if (isLoading) {
    return (
      <div className="pl-4 pt-23.5 pb-24">
        <SkeletonSection title="Fresh Tracks" />
        <SkeletonSection title="Trending Hits" />
        <SkeletonSection title="Popular Albums" />
        <SkeletonSection title="Favorite Artists" />
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-500">Error loading artists</div>;
  }

  return (
    <div className="pl-4 relative hide-scrollbar pb-24 pt-23.25 animate-[fadeIn_.4s_ease]">
      
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
    
    {latestArtist && (
      <MoreLikeCard
      images={latestArtist?.profile_pic}
      subtitle="More Like"
      label={latestArtist?.artistname}
    />
    )}
      
      {sliderData && sliderData.length !== 0 && (
       <CardSlider
       cardimages={sliderData}
       title="Your Favorite Artists"
     />
      )}
      <div className="pb-50">
      {bigArtists?.map((artist) => {
        const firstTrackImage = artist.top_tracks?.[0]?.image_url 
        const firstTrack = artist.top_tracks?.[0];
        const album_name = artist.top_tracks?.[0]?.album_name

        return (
          <BigCardArtist
            key={artist.id}
            item={{
              name: artist.artistname,
              pic: artist.profile_pic_url, 
              bg: firstTrackImage || artist.background || "", 
              firstTrack: firstTrack,
              album_name:album_name

            }}
          />
        );
      })}
      </div>
    </div>
  );
}
