
import {  useState} from "react"
import TopCoverMp from "@/shared/MusicPlayer/CoverMusicPlayer/TopCoverMp"
import CoverMpImage from "@/shared/MusicPlayer/CoverMusicPlayer/CoverMpImage"
import MpButtons from "@/shared/MusicPlayer/CoverMusicPlayer/MpButtons"
import { Song } from "@/redux/features/playerSlice"
import { useDominantColorFromImage } from "@/shared/hooks/useDominantColorFromImage"
import { useAppSelector } from "@/redux/hook"
import Lyrics from "../Lyrics/lyric"
import { usePlayerUI } from "../context/playerUIContext"
interface Props {
  onClose: () => void;
  progress: number;
  currentSong:Song;
  lowerTime:string, 
  higherTime:string;
  handleSeek:(e: React.MouseEvent<HTMLDivElement>) => void
  buffered:number


}


const CoverMpLayout = ({onClose , progress , currentSong, lowerTime, higherTime, handleSeek , buffered}:Props) => {

  
  useDominantColorFromImage(currentSong?.image_url)
  const { color, darkColor  } = useAppSelector(state => state.player)
  const { isLyricsOpen , closeLyrics , openLyrics } = usePlayerUI()
  return (
    <>
     {isLyricsOpen ?  (
      <Lyrics  
      buffered={buffered}
      progress={progress}
      currentSong={currentSong}
      lowerTime={lowerTime}
      higherTime={higherTime}
      handleSeek={handleSeek}
      setIsOpenLyric={closeLyrics}
      />
        ) : (
    <div
        className="min-h-dvh fixed max-[450px]:w-full w-117 px-3 bottom-0 animate-slideUp flex justify-center items-center z-100"
        style={{
          background: `linear-gradient(to top, ${darkColor}, ${color})`,
          transition: "background 600ms ease"
        }}
  >
      <div
        className="w-full  h-screen pb-10 flex flex-col px-[10.5px] justify-between
       "
      >
        <TopCoverMp onClose={onClose} />
       
          <CoverMpImage currentSong={currentSong} />

         
        <MpButtons
          buffered={buffered}
          progress={progress}
          currentSong={currentSong}
          lowerTime={lowerTime}
          higherTime={higherTime}
          handleSeek={handleSeek}
          setIsOpenLyric={openLyrics}
        />

      </div>
      
    </div>
     )}
    </>
  )
}

export default CoverMpLayout