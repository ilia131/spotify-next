import { Artist } from "@/redux/services/artistApislice";
import AvatarCircleCard from "../AvatarCircleCard/AvatarCircleCard";
import Cards from "../Cards/Cards"



export interface CardSliderProps {
      cardimages:  Artist[] | undefined
      title : string;
}


const CardSlider = ({cardimages , title} : CardSliderProps) => {
  return (
    <div className="flex gap-3 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory hide-scrollbar">
        {cardimages?.map((item, i) => (
            title === 'Your Favorite Artists' ? 
            <AvatarCircleCard item={item} key={i} /> : 
            <Cards item={item} key={i} />
        ))}
    </div>
  )
}

export default CardSlider