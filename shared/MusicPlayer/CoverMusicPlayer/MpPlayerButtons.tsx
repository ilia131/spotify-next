import Shuffle from "@/public/Icons/Shuffle"
import BackButtonIcon from "@/public/Icons/BackButtonIcon"
import PauseCircle from "@/public/Icons/PauseCircle"
import NextButtonIcon from "@/public/Icons/NextButtonIcon"
import TimerButton from "@/public/Icons/TimerButton"
import PlayCircle from "@/public/Icons/PlayCircle"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import {
  togglePlay,
  playNext,
  playPrev,
  // toggleShuffle
} from "@/redux/features/playerSlice"

const MpPlayerButtons = () => {

  const dispatch = useAppDispatch()

  const { isPlaying, queue } = useAppSelector(
    (state) => state.player
  )
  const disabled = queue.length === 0

  return (
    <div className="flex justify-between mt-2 mx-1 items-center">

      <button
        className={ "text-white"}
        title='shuffle'
      >
        <Shuffle />
      </button>

      <button 
      disabled={disabled}
      
      onClick={() => dispatch(playPrev())}>
        <BackButtonIcon />
      </button>

      <button onClick={() => dispatch(togglePlay())}>
         {isPlaying ? <PauseCircle /> : <PlayCircle />}
      </button>

      <button onClick={() => dispatch(playNext())}>
        <NextButtonIcon />
      </button>

      <button
       title='timerButton'
      >
        <TimerButton />
      </button>

    </div>
  )
}

export default MpPlayerButtons
