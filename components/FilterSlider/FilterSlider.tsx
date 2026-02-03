"use client";

import images from "@/public/images";
import NavSlider from "@/components/FilterSlider/NavSlider/NavSlider";
import CardSlider from "@/components/common/CardSlider/CardSlider";
import CardSection from "@/components/common/CardSection/CardSection";
import MoreLikeCard from "@/components/common/MoreLikeCard/MoreLikeCard";
import ArtistMiniCard from "../ArtistMiniCard/ArtistMiniCard";
import { sectionsConfig } from "@/data/homeSection";
import { FilterItem } from "@/components/FilterSlider/types";
import { mapItems } from "./utils";


const filters: FilterItem[] = [
  { name: "All", height: "h-[34px]", padding: "px-4", width: "w-[52px]" },
  { name: "Music", height: "h-[34px]", padding: "px-4", width: "w-[71px]" },
  { name: "Albums", height: "h-[34px]", padding: "px-5", width: "w-[86px]" },
  { name: "Trackpacks", height: "h-[34px]", padding: "px-[20.5px]", width: "w-[108px]" },
];

export default function FilterSlider() {
    
  return (
    <div className="pl-4 relative hide-scrollbar pb-24">
      
      <ArtistMiniCard />
      <NavSlider filters={filters} />

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
    </div>
  );
}
