import { CastIcon} from "lucide-react"
import ShareIcon from '@/public/Icons/ShareIcon'
const ShareCastMp = () => {
  return (
    <div className="flex justify-between mt-14.25 px-1 [@media(max-height:800px)]:mt-10">
    <ShareIcon />
    <CastIcon color="white"/>
  </div>
  )
}

export default ShareCastMp