import { Artist } from "@/redux/services/artistApislice";

import AvatarCircleCard from "../AvatarCircleCard/AvatarCircleCard";
import Cards from "../Cards/Cards";

export interface CardSliderProps {
  cardimages: Artist[] | undefined;
  title: string;
  variant?: "artist" | "avatar";
}

const CardSlider = ({
  cardimages,
  title,
  variant = "artist",
}: CardSliderProps) => {
  return (
    <div className="flex gap-3 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory hide-scrollbar">
      {cardimages?.map((item, i) =>
        variant === "avatar" ? (
          <AvatarCircleCard
            item={item}
            key={item.id ?? i}
          />
        ) : (
          <Cards
            item={item}
            key={item.id ?? i}
          />
        )
      )}
    </div>
  );
};

export default CardSlider;