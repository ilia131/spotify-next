import Image from "next/image"
import images from "@/public/images"
import { Song } from "@/redux/features/playerSlice"
interface Props {
  currentSong:Song
}
const CoverMpImage = ({currentSong}:Props) => {
  return (
    <div className="flex w-full justify-center ">
          <Image src={currentSong.image ||images.sinazza} alt='covermusic' width={358} height={347}
            className="h-86.5 w-89.5 [@media(max-height:800px)]:w-73 [@media(max-height:800px)]:h-70
            [@media(max-height:800px)]:mt-10"
        />  
    </div>  
  )
}

export default CoverMpImage