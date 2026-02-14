import Shuffle from "@/public/Icons/Shuffle"
import BackButtonIcon from "@/public/Icons/BackButtonIcon"
import PauseCircle from "@/public/Icons/PauseCircle"
import NextButtonIcon from "@/public/Icons/NextButtonIcon"
import TimerButton from "@/public/Icons/TimerButton"

const MpPlayerButtons = () => {
  return (
    <div className="flex justify-between mt-2 mx-1 items-center ">
    <Shuffle />
    <BackButtonIcon />       
    <PauseCircle/> 
    <NextButtonIcon />
    <TimerButton />      
  </div>
  )
}

export default MpPlayerButtons