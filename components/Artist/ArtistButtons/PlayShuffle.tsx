import ShuffleButton from "./ShuffleButton"
import PlayGreenButton from "./PlayGreenButton"

const PlayShuffle = () => {
  return (
    <div className="w-23 h-10.25  flex justify-between items-center">
       <ShuffleButton/> 
       <PlayGreenButton />
    </div>  
  )
}

export default PlayShuffle