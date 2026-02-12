import ThreeDots from "../ArtistButtons/ThreeDots"
import TitleMusicCard from "./TitleMusicCard"

import ViewMusicCard from "./ViewMusicCard"
import { Song } from "@/redux/features/playerSlice";



interface ItemProps {
   item:Song
}





const OptionCardMusic = ({item}: ItemProps) => {
  return (
    <div className="flex flex-1 h-9.75 justify-between ">
            <div className=" h-9.75 grid items-center justify-start text-left">
            <TitleMusicCard title={item.title} />
            <ViewMusicCard countview={item.play_count}/>
            </div>
            <ThreeDots />
    </div>  
  )
}

export default OptionCardMusic