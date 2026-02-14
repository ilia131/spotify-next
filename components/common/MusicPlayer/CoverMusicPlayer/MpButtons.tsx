import TitleSaveMp from "@/components/common/MusicPlayer/CoverMusicPlayer/TitleSaveMp"
import BarTimeMp from "@/components/common/MusicPlayer/CoverMusicPlayer/BarTimeMp"
import MpPlayerButtons from "@/components/common/MusicPlayer/CoverMusicPlayer/MpPlayerButtons"
import ShareCastMp from "@/components/common/MusicPlayer/CoverMusicPlayer/ShareCastMp"
import { Song } from "@/redux/features/playerSlice"


interface Props {
  progress: number;
  currentSong:Song;
  lowerTime:string, 
  higherTime:string;
  handleSeek:(e: React.MouseEvent<HTMLDivElement>) => void

}

const MpButtons = ({currentSong , progress , lowerTime , higherTime , handleSeek}:Props) => {
  return (
    <div className="w-full h-64 ">
    <TitleSaveMp currentSong={currentSong}/>
    <BarTimeMp progress={progress} lowerTime={lowerTime} higherTime={higherTime} handleSeek={handleSeek} />
    <MpPlayerButtons />
    <ShareCastMp />
  </div> 
  )
}

export default MpButtons