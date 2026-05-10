import ShuffleButton from "./ShuffleButton"
import PlayGreenButton from "./PlayGreenButton"

type Props = {
  onPlay?: () => void
  onShuffle?: () => void
  isPlaying?: boolean

}

const PlayShuffle = ({ onPlay, onShuffle , isPlaying }: Props) => {
  return (
    <div className="w-23 h-13  flex justify-between items-center">
       <ShuffleButton onShuffle={onShuffle}/> 
       <PlayGreenButton onPlay={onPlay} isPlaying={isPlaying} />
       
    </div>  
  )
}

export default PlayShuffle