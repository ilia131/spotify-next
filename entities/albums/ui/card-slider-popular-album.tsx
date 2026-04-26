import { Album } from "@/redux/services/artistApislice";
import CardsPa from "./card-popular-album"



export interface CardSliderProps {
      cardimages:  Album[] | undefined
}


const CardSliderPA = ({cardimages} : CardSliderProps) => {
  return (
    <div className="flex gap-3 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory hide-scrollbar">
        {cardimages?.map((item, i) => (
            <CardsPa item={item} key={i} />
        ))}
    </div>
  )
}

export default CardSliderPA