import AvatarCircleCard from "../AvatarCircleCard/AvatarCircleCard";
import Cards from "../Cards.tsx/Cards"
import   { StaticImageData } from "next/image"

export interface CardSliderProps {
    cardimages: { picture: string | StaticImageData ; desc: string , name:string }[]
    title : string;
   
}




const CardSlider = ({cardimages , title} : CardSliderProps) => {
  return (
    <div className="flex gap-3 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory hide-scrollbar">
        {cardimages.map((item, i) => (
            title === 'Your Favorite Artists' ? 
            <AvatarCircleCard item={item} key={i} /> : 
            <Cards item={item} key={i} />
        ))}
    </div>
  )
}

export default CardSlider