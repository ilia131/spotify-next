
import { useEffect , useMemo  , useRef  } from "react"

import { Song } from "@/redux/features/playerSlice"
import PlayCircle from "@/public/Icons/PlayCircle"
import PauseCircle from "@/public/Icons/PauseCircle"
import {
    togglePlay,
} from "@/redux/features/playerSlice"
import { useDominantColorFromImage } from "@/shared/hooks/useDominantColorFromImage"
import { useAppSelector  , useAppDispatch} from "@/redux/hook"
import BarTimeMp from "@/shared/MusicPlayer/CoverMusicPlayer/BarTimeMp"
import { CloseButton } from "@/components/Library/CloseButton"
import Image from "next/image"

interface Props {
  progress: number;
  currentSong:Song;
  lowerTime:string, 
  higherTime:string;
  handleSeek:(e: React.MouseEvent<HTMLDivElement>) => void
  buffered:number
  setIsOpenLyric:(isOpenLyric : boolean) => void


}

interface LyricsProps {
    time:number
    line:string
}

const Lyrics = ({
currentSong , progress , lowerTime , higherTime , handleSeek , buffered , setIsOpenLyric}:Props
) => {
  const dispatch = useAppDispatch()
  
    const { isPlaying,   } = useAppSelector(
      (state) => state.player
    )
   
  useDominantColorFromImage(currentSong?.image_url)
  const { color,   currentTime } = useAppSelector(state => state.player)
  const videoUrl = currentSong?.shorts?.[0]?.video_url
  const hasVideo = Boolean(videoUrl)

  const lyrics = useMemo(() => {
    return (currentSong?.lyrics || []).filter(l => l.line?.trim())
  }, [currentSong])
  const activeIndex = useMemo(() => {
    const HOLD_TIME = 4
  
    for (let i = 0; i < lyrics.length; i++) {
      const current = lyrics[i]
      const next = lyrics[i + 1]
  
      const endTime = next ? next.time : current.time + HOLD_TIME
  
      if (currentTime >= current.time && currentTime < endTime) {
        return i
      }
    }
  
    return -1
  }, [currentTime, lyrics])
  

  const refs = useRef<(HTMLParagraphElement | null)[]>([])

  useEffect(() => {
    const el = refs.current[activeIndex]
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "center"
      })
    }
  }, [activeIndex])
  return (

<div
  className="min-h-dvh fixed max-[450px]:w-full w-117 px-3 bottom-0 animate-slideUp flex justify-center items-center z-100"
  style={{
    background: hasVideo ? "black" : color,
    transition: "background 600ms ease",
  }}

>
{hasVideo && (
  <video
    className="absolute inset-0 w-full h-full object-cover -z-10 opacity-40"
    src={videoUrl}
    autoPlay
    muted
    loop
    playsInline
  />
)}

  <div
    className="w-full  pb-10 pt-2 flex flex-col aspect-6/10 gap-3 px-[10.5px] justify-between items-center"
  > 
   <div className="absolute left-6 flex items-center gap-4
    bg-transparent h-27.5 w-full  top-4 pb-4 rounded-md ">
    <Image 
      src={currentSong.image_url}
      alt={`${currentSong.title}`}
      width={90}
      height={90}
      className="rounded-xl"
     />
     <div>
        <p className="text-white/60 font-bold text-[22px]">{currentSong.artistname}</p>
        <p className="text-white/60">{currentSong.title}</p>
     </div>
   </div>
   <div className="absolute right-8 top-8  ">
        <CloseButton onClick={() => setIsOpenLyric(false)} />
      </div>
     
    <div
      style={{
        transition: "background 600ms ease",
        overflowY: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
      className="
        mt-27
      pb-20 p-4 rounded-xl w-full text-left aspect-4/4 overflow-scroll overflow-x-hidden"
      >
       
      
      {lyrics.map((l: LyricsProps, i: number) => { 
          if (!l.line?.trim()) return null

        return (
        <div className="flex flex-wrap mx-2 " key={i}> 
        <p
        
          ref={(el) => { refs.current[i] = el }}
          className={`py-2 text-[20px] transition-all font-[800] duration-300 ${
            i === activeIndex ? "text-white font-bold scale-110" : "text-white/40"
          }`}
        >
          {l.line}
        </p></div>
        )
      })}
    </div>
    <BarTimeMp
      progress={progress}
      lowerTime={lowerTime}
      higherTime={higherTime}
      handleSeek={handleSeek}
      buffered={buffered}
    />
    <button onClick={() => dispatch(togglePlay())}>
      {isPlaying ? <PauseCircle /> : <PlayCircle />}
    </button>
  </div>
</div>

  )
}

export default Lyrics