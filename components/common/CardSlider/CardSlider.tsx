import Cards from "../Cards.tsx/Cards"
import   { StaticImageData } from "next/image"

interface CardSliderProps {
    cardimages: { picture: string | StaticImageData }[]


}




const CardSlider = ({cardimages} : CardSliderProps) => {
  return (
    <div className="flex gap-3 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory hide-scrollbar">
        {cardimages.map((item, i) => (
            <Cards item={item}  key={i}/>
        ))}
    </div>
  )
}

export default CardSlider