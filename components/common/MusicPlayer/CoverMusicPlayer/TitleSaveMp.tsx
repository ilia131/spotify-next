import SaveMusic from "@/public/Icons/SaveMusic"
import { Song } from "@/redux/features/playerSlice"

interface Props {
  currentSong:Song
}
const TitleSaveMp = ({currentSong}:Props) => {
  return (
    <div className="flex justify-between w-full h-14.75 [@media(max-height:800px)]:-mt-2">
    <div className="flex flex-col">
      <p className="text-[#FFFFFF] text-[22px] font-medium">{currentSong.artist_name}</p>
      <p className="text-[rgba(255,255,255,0.49)] text-[17px] font-medium truncate">{currentSong.title}</p>
    </div>
     <div className="mt-7.25 mr-[16.75px] ">
          <SaveMusic />
    </div>
    </div>
  )
}

export default TitleSaveMp