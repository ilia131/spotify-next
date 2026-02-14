

import TopCoverMp from "@/components/common/MusicPlayer/CoverMusicPlayer/TopCoverMp"
import CoverMpImage from "@/components/common/MusicPlayer/CoverMusicPlayer/CoverMpImage"
import MpButtons from "@/components/common/MusicPlayer/CoverMusicPlayer/MpButtons"
import { Song } from "@/redux/features/playerSlice"
interface Props {
  onClose: () => void;
  progress: number;
  currentSong:Song;
  lowerTime:string, 
  higherTime:string;
  handleSeek:(e: React.MouseEvent<HTMLDivElement>) => void


}


const CoverMpLayout = ({onClose , progress , currentSong, lowerTime, higherTime, handleSeek}:Props) => {
  return (
    <div className='min-h-dvh fixed w-full px-3  bottom-0 animate-slideUp  flex justify-center items-center bg-linear-to-t from-[rgba(50,35,35,1)] to-[rgba(206,172,172,1)] z-100 bg-amber-900' >
     <div className="w-full h-180 flex flex-col px-[10.5px] justify-between ">
       <TopCoverMp onClose={onClose} />
       <CoverMpImage currentSong={currentSong} />
       <MpButtons 
          progress={progress} 
          currentSong={currentSong} 
          lowerTime={lowerTime} 
          higherTime={higherTime} 
          handleSeek={handleSeek}
        />
      </div>
   </div>
  )
}

export default CoverMpLayout