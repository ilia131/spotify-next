import FreshTrackCard from "../FreshTrackCard/FreshTrackCard";
import { Song } from "@/redux/features/playerSlice";



export interface CardSliderProps {
      cardimages:  Song[]
      title : string;
      isArtist?:boolean
}


const TrackCardSlider = ({cardimages , title , isArtist} : CardSliderProps) => {
  return (
    <div className="flex gap-3 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory hide-scrollbar">
        {cardimages?.slice(0 ,5)?.map((item, i) => (
            <FreshTrackCard item={item} key={i} title={title} index={i}     songs={cardimages}
            isArtist={isArtist}/>
        ))}
    </div>
  )
}

export default TrackCardSlider