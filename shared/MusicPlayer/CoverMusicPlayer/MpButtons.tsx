import TitleSaveMp from "@/shared/MusicPlayer/CoverMusicPlayer/TitleSaveMp"
import BarTimeMp from "@/shared/MusicPlayer/CoverMusicPlayer/BarTimeMp"
import MpPlayerButtons from "@/shared/MusicPlayer/CoverMusicPlayer/MpPlayerButtons"
import ShareCastMp from "@/shared/MusicPlayer/CoverMusicPlayer/ShareCastMp"
import { Song } from "@/redux/features/playerSlice"


interface Props {
  progress: number;
  currentSong:Song;
  lowerTime:string, 
  higherTime:string;
  handleSeek:(e: React.MouseEvent<HTMLDivElement>) => void
  buffered:number;
  setIsOpenLyric:(isOpenLyric : boolean) => void

}

const MpButtons = ({currentSong , progress , lowerTime , higherTime , handleSeek , buffered , setIsOpenLyric}:Props) => {
  return (
    <div className="w-full h-64 ">
    <TitleSaveMp currentSong={currentSong}/>
    <BarTimeMp progress={progress} lowerTime={lowerTime} higherTime={higherTime} handleSeek={handleSeek}
    buffered={buffered}
    />
    <MpPlayerButtons />
    <ShareCastMp
    setIsOpenLyric={setIsOpenLyric}
    />
  </div> 
  )
}

export default MpButtons