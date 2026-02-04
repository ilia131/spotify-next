"use client";

import images from "@/public/images";
import CardSlider from "@/components/common/CardSlider/CardSlider";
import CardSection from "@/components/common/CardSection/CardSection";
import MoreLikeCard from "@/components/common/MoreLikeCard/MoreLikeCard";
import ArtistMiniCard from "../ArtistMiniCard/ArtistMiniCard";
import { sectionsConfig } from "@/data/homeSection";
import { mapItems } from "./utils";
import BigCardArtist from "./BigCardArtist/BigCardArtist";





export default function FilterSlider() {
    
  return (
    <div className="pl-4 relative hide-scrollbar pb-24">     
      <ArtistMiniCard />
      {sectionsConfig.map((section) => (
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
        cardimages={mapItems(["cc", "bilie", "vini"])}
        title=""
      />
      <BigCardArtist />

    </div>
  );
}
