"use client"
import images from "@/public/images";
import CardSlider from "@/shared/CardSlider/CardSlider";
import CardSection from "@/shared/CardSection/CardSection";
import MoreLikeCard from "@/shared/MoreLikeCard/MoreLikeCard";
import { sectionsConfig } from "@/data/homeSection";
import { mapItems } from "@/components/FilterSlider/utils";
import RecentMusics from "./RecentMusics";
import BigCardArtist from "../FilterSlider/BigCardArtist/BigCardArtist";
import { useArtistsQuery } from "@/redux/services/artistApislice";

export const artists = [
  {pic:images.hip3, bg:images.hip2 , name:'HipHopologist'},
  {pic:images.vini3, bg:images.vini2 , name:'Vinak'},
  {pic:images.dorcci, bg:images.dorcci2 , name:'Dorcci'},
  {pic:images.gucci, bg:images.gucci2 , name:'Gucci Flame'},

]
const Music = () => {
  const { data, error, isLoading } = useArtistsQuery();

  const specialSections = sectionsConfig.filter(
    (section) =>
      section.title === "Made For ilia gholami !" 
    // ||
      // section.title === "Popular Albums"
  );
  return (
    <div className="pl-4 relative hide-scrollbar pb-24 pt-15 overflow-hidden">
      {specialSections.map((section) => (
            <CardSection
              key={section.title}
              title={section.title}
              items={mapItems(section.items)}
            />
        ))}
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

