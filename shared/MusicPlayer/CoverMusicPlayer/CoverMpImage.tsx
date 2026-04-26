import Image from "next/image"
import images from "@/public/images"
import { Song } from "@/redux/features/playerSlice"
interface Props {
  currentSong:Song
}
const CoverMpImage = ({currentSong}:Props) => {
  return (
    <div className="flex w-full justify-center ">
          <Image src={currentSong.image_url ||images.sinazza} alt='covermusic' width={250} height={250}
            className="h-75.5 w-75.5 [@media(max-height:800px)]:w-60 [@media(max-height:800px)]:h-60
            [@media(max-height:800px)]:mt-10 " 
        />  
    </div>  
  )
}

export default CoverMpImage