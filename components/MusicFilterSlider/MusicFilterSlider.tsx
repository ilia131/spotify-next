"use client"
import images from "@/public/images";
import CardSection from "@/shared/CardSection/CardSection";
import MoreLikeCard from "@/shared/MoreLikeCard/MoreLikeCard";

import RecentMusics from "./RecentMusics";
import BigCardArtist from "../FilterSlider/BigCardArtist/BigCardArtist";
import { useArtistsQuery } from "@/redux/services/artistApislice";
import { useGetForYouQuery } from "@/redux/services/songApiSlice";

export const artists = [
  {pic:images.hip3, bg:images.hip2 , name:'HipHopologist'},
  {pic:images.vini3, bg:images.vini2 , name:'Vinak'},
  {pic:images.dorcci, bg:images.dorcci2 , name:'Dorcci'},
  {pic:images.gucci, bg:images.gucci2 , name:'Gucci Flame'},

]
const Music = () => {
  const { data, error, isLoading } = useArtistsQuery();
  const { data : ForYou} = useGetForYouQuery(0)

  
  return (
    <div className="pl-4 relative hide-scrollbar pb-24 pt-15 overflow-hidden">
        <CardSection
            title="Made For You"
            items={ForYou ?? []}
          />
          <RecentMusics />
          <MoreLikeCard 
                images={images.HipHopLogist}
                subtitle="More Like"
                label="Hiphopolgist"
          />
          {/* <CardSlider
               cardimages={mapItems(["gucci", "dorcci2", "vini"])}
               title=""
            /> */}
             {data?.map((artist , i)=>(
                <BigCardArtist 
                key={artist.id}
                item={{
                  name: artist.artistname,
                  pic: artist.profile_pic,
                  bg: artist.background,
                }}/>
            ))}
    </div>
  )
}


export default Music

