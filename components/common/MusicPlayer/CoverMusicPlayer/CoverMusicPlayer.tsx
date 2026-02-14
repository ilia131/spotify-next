import CoverMpLayout from "./CoverMpLayout"
import { Song } from "@/redux/features/playerSlice";
interface Props {
  onClose: () => void;
  progress: number;
  currentSong:Song;
  lowerTime:string, 
  higherTime:string
  handleSeek:(e: React.MouseEvent<HTMLDivElement>) => void
}

const CoverMusicPlayer = ({ 
  onClose , 
  progress , 
  currentSong , 
  lowerTime , 
  higherTime,
  handleSeek,
}: Props) => { 
   return <CoverMpLayout 
          onClose={onClose} 
          progress={progress} 
          currentSong={currentSong} 
          higherTime={higherTime} 
          lowerTime={lowerTime} 
          handleSeek={handleSeek}
          />
}

export default CoverMusicPlayer
