"use client"
import images from "@/public/images";
import CardSlider from "@/components/common/CardSlider/CardSlider";
import CardSection from "@/components/common/CardSection/CardSection";
import MoreLikeCard from "@/components/common/MoreLikeCard/MoreLikeCard";
import { sectionsConfig } from "@/data/homeSection";
import { mapItems } from "@/components/FilterSlider/utils";
import RecentMusics from "./RecentMusics";
import BigCardArtist from "../FilterSlider/BigCardArtist/BigCardArtist";
import { artists } from "../FilterSlider/FilterSlider";
const Music = () => {
  const specialSections = sectionsConfig.filter(
    (section) =>
      section.title === "Made For ilia gholami !" ||
      section.title === "Popular Albums"
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
          <CardSlider
               cardimages={mapItems(["gucci", "dorcci2", "vini"])}
               title=""
            />
             {artists.map((item , i)=>(
                <BigCardArtist item={item} key={i} />
            ))}
    </div>
  )
}


export default Music

