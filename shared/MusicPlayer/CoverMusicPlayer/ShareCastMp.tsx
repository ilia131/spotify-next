import { CastIcon} from "lucide-react"
import ShareIcon from '@/public/Icons/ShareIcon'
const ShareCastMp = ({setIsOpenLyric}: {setIsOpenLyric:(isOpenLyric : boolean) => void}) => {
  return (
    <div className="flex justify-between mt-14.25 px-1 [@media(max-height:800px)]:mt-10">
    <ShareIcon />
    <p 
    onClick={() =>setIsOpenLyric(true)}
    className="text-white mt-0.5 hover:text-[#dbdbdb] cursor-pointer">Lyrics </p>
    <CastIcon color="white"/>
  </div>
  )
}

export default ShareCastMp