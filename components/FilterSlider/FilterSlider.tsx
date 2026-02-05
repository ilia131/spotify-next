"use client";

import images from "@/public/images";
import CardSlider from "@/components/common/CardSlider/CardSlider";
import CardSection from "@/components/common/CardSection/CardSection";
import MoreLikeCard from "@/components/common/MoreLikeCard/MoreLikeCard";
import ArtistMiniCard from "../ArtistMiniCard/ArtistMiniCard";
import { sectionsConfig } from "@/data/homeSection";
import { mapItems } from "./utils";
import BigCardArtist from "./BigCardArtist/BigCardArtist";






const artists = [
  {pic:images.hip3, bg:images.hip2 , name:'HipHopologist'},
  {pic:images.vini3, bg:images.vini2 , name:'Vinak'},
  {pic:images.dorcci, bg:images.dorcci2 , name:'Dorcci'},
  {pic:images.gucci, bg:images.gucci2 , name:'Gucci Flame'},

]


export default function FilterSlider() {
  const otherSections = sectionsConfig.filter(
    (section) =>
      section.title !== "Made For ilia gholami !" &&
      section.title !== "Popular Albums"
  );
    
  return (
    <div className="pl-4 relative hide-scrollbar pb-24 pt-23.25">     
      <ArtistMiniCard />
      {otherSections.map((section) => (
        <CardSection
          key={section.title}
          title={section.title}
          items={mapItems(section.items)}
        />
      ))}
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
  );
}
