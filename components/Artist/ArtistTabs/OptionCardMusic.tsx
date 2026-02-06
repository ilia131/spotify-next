import ThreeDots from "../ArtistButtons/ThreeDots"
import TitleMusicCard from "./TitleMusicCard"

import ViewMusicCard from "./ViewMusicCard"
import { StaticImageData } from "next/image"



interface ItemProps {
   item:ArtistProps
}


interface ArtistProps {
  id: number
  musicname : string
  image: StaticImageData;
  countview:string;
}



const OptionCardMusic = ({item}: ItemProps) => {
  return (
    <div className="flex flex-1 h-9.75 justify-between ">
            <div className="w-18.25 h-9.75 grid items-center justify-start text-left">
            <TitleMusicCard title={item.musicname} />
            <ViewMusicCard countview={item.countview}/>
            </div>
            <ThreeDots />
    </div>  
  )
}

export default OptionCardMusic