import FreshTrackCard from "../FreshTrackCard/FreshTrackCard";
import { Song } from "@/redux/features/playerSlice";



export interface CardSliderProps {
      cardimages:  Song[]
      title : string;
}


const TrackCardSlider = ({cardimages , title} : CardSliderProps) => {
  return (
    <div className="flex gap-3 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory hide-scrollbar">
        {cardimages?.map((item, i) => (
            <FreshTrackCard item={item} key={i} title={title} />
        ))}
    </div>
  )
}

export default TrackCardSlider