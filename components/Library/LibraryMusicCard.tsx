import { Artist } from "@/redux/services/artistApislice"
import Image from "next/image"
import { useRouter } from "next/navigation"
interface Props {
    item: Artist
}

const LibraryMusicCard = ({item}:Props) => {
  const router = useRouter()
  return (
     <div className=" h-17.5 flex gap-3.75 items-center" onClick={()=>router.push(`/artist/${item.artistname}`)}  >
              <Image src={item.profile_pic} width={70} height={70} 
              className="w-17.5 h-17.5 overflow-hidden rounded-full" alt="musiccover" priority
              />
              <div className="h-12.25 flex flex-col justify-center">
              <p className="text-[rgba(255,255,255,1)] text-[14px] font-medium">{item.artistname}</p>
              <p className="text-[rgba(255,255,255,0.50)] text-[11px] font-medium">{item.bio}</p>
              </div>
        </div>
  )
}

export default LibraryMusicCard