import ThreeDots from "@/components/Artist/ArtistButtons/ThreeDots"
import BarMusicPlayer from "@/components/common/MusicPlayer/CoverMusicPlayer/BarMusicPlayer"
import CirclePlay from "@/public/Icons/CirclePlay"
import TimeNumber  from "@/components/common/MusicPlayer/CoverMusicPlayer/TimeNumber"
interface TrackControlsProps {
    progress: number
    duration: string
  }
  

const TrackControls = ({ progress, duration }: TrackControlsProps) => {
  return (
    <div className="flex items-center w-51.5 justify-between mt-2.25 ">
    <div className="grid mt-3 gap-1">
                 <div  className="w-29.75  bg-[rgba(255,255,255,0.5)] h-1 transition-all duration-300 rounded-[1px]">
                 <BarMusicPlayer progress={progress} />
                 </div>
                 <div className="flex w-full justify-between text-[7px]">
                 <TimeNumber timenumber="0:00" />
                 <TimeNumber timenumber={duration} />
                 </div>
     </div> 
       <div className="flex items-center w-18.25 justify-between">    
           <ThreeDots />
           <CirclePlay stroke="none" className="w-8 h-8"  />
       </div>     
  </div>  
  )
}

export default TrackControls