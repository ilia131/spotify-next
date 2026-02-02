"use client";

import images from "@/public/images";
import NavSlider from "@/components/common/NavSlider/NavSlider";
import ArtistMiniCard from "@/components/ArtistMiniCard/ArtistMiniCard";
import CardSlider from "@/components/common/CardSlider/CardSlider";
import CardSection from "@/components/common/CardSection/CardSection";
import MoreLikeCard from "@/components/common/MoreLikeCard/MoreLikeCard";

const cardimages = [
  {picture : images.cc},
  {picture : images.Bilie},
  {picture : images.vini},
 


]

const cardimages1 = [
  {picture : images.Bilie},
  {picture : images.vini},
  {picture : images.cc},

 


]

export default function FilterSlider() {

  return (
    <div className=" pl-4.5 relative hide-scrollbar">
      <NavSlider />
      <ArtistMiniCard />
      <CardSection items={cardimages}  title="Fresh Tracks Friday !" />
      <MoreLikeCard images={images.HipHopLogist} subtitle="More Like" label="Hiphopolgist" />
      <CardSlider cardimages={cardimages} />
      <CardSection items={cardimages1} title="Trending Hits"/>
    </div>
  );
}
