import CoverMpLayout from "./CoverMpLayout"
import { Song } from "@/redux/features/playerSlice";
interface Props {
  onClose: () => void;
  progress: number;
  currentSong:Song;
  lowerTime:string, 
  higherTime:string
  handleSeek:(e: React.MouseEvent<HTMLDivElement>) => void
  buffered:number
  onNext: ()=>void;
  onPrevious  : ()=>void;
}

const CoverMusicPlayer = ({ 
  onClose , 
  progress , 
  currentSong , 
  lowerTime , 
  higherTime,
  handleSeek,
  buffered,
  onNext,
  onPrevious ,
}: Props) => { 
   return <CoverMpLayout
          buffered={buffered} 
          onClose={onClose} 
          progress={progress} 
          onPrevious={onPrevious}
          currentSong={currentSong} 
          higherTime={higherTime} 
          lowerTime={lowerTime} 
          handleSeek={handleSeek}
          onNext={onNext}
          />
}

export default CoverMusicPlayer
