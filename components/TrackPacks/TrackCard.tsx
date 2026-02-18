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
  


const TrackCard = ({ artist, album, title, progress, duration , cover , bg }: TrackCardProps) => {
  return (
    <section className={`h-29 max-[400px]:w-full max-[440px]:w-89.75  
    rounded-[11px]  pl-2.5 pr-2.5 flex items-center gap-2.25 ${bg}`}>
        <TrackCover cover={cover} />
      <div className="grid">
          <TrackInfo artist={artist} album={album}  title={title}/>
          <TrackControls progress={progress} duration={duration}/>
      </div>
    </section>
  )
}

export default TrackCard