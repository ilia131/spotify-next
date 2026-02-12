import Image from "next/image"
import { Song} from "@/redux/features/playerSlice";
import images from '@/public/images'
interface PopularMusicPropsCard {
    item:Song
}


const PopularReleaseCard = ({item}:PopularMusicPropsCard) => {
  return (
    <div className="w-63.75 h-21.5 flex mt-1.5 items-center gap-4" >
             <Image src={item.image || images.Kagan} width={83} height={86} 
             className="w-20.75 h-21.5 overflow-hidden" alt="musiccover"
             priority
             
             />
             <div className="w-39 h-12.25">
             <p className="text-[rgba(255,255,255,1)] text-[19px] font-semibold">{item.title}</p>
             <p className="text-[rgba(255,255,255,0.71)] text-[12px] font-medium">Latest release . Singel</p>
             </div>
         </div>
  )
}

export default PopularReleaseCard