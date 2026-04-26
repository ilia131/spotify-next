import { StaticImageData } from "next/image"
import TrackControls from "./TrackControls"
import TrackCover from "./TrackCover"
import TrackInfo from "./TrackInfo"


interface TrackCardProps {
    artist: string
    album: string
    title: string
    progress: number
    duration: string
    cover: StaticImageData
    bg:string
  }
  


const TrackCard = ({ artist, album, title, progress, duration , cover  }: TrackCardProps) => {
  return (
    <div className="h-50 w-full grid
    gap-3.5
    bg-linear-to-t from-[#1d3e19] to-[#121212] py-[22px] px-4 rounded-[11px]">
    <div className={` 
       flex    gap-2.25  `}>
        <TrackCover cover={cover} />
       <div className="grid">
          <TrackInfo artist={artist} album={album}  title={title}/>
       </div>
       
    </div>

            
            <p className="text-[9.7px] text-[#FFFFFF80]"><span className="text-[11px] text-[#ffffff]">Feb 3 · 1 min</span>– I was always afraid. So that was always what I thought, that one day these people  I was always afraid. So that was always what I thought, that one day these people</p>
          
    </div>
  )
}

export default TrackCard