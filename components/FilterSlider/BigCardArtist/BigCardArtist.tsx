import Image from "next/image"
import { Song  , playSingleSong , togglePlay} from "@/redux/features/playerSlice"
import CardHeader from "./CardHeader"
import BottomBigArtist from "./BottomBigArtist"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { useRouter } from "next/navigation"
export interface ItemArtistProps {
   item: ItemsBigProps
}

export interface ItemsBigProps {
  name:string ,
  pic: string 
  bg: string  
  firstTrack?: Song;
  album_name:string

}


const BigCardArtist = ({item}:ItemArtistProps) => {
  const router =useRouter()
  const dispatch = useAppDispatch();
  const { isPlaying, currentSong } = useAppSelector((state) => state.player);
  
  const isThisActive = isPlaying && currentSong?.unique_id === item.firstTrack?.unique_id;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isThisActive) {
      dispatch(togglePlay());
    } else {
      dispatch(playSingleSong(item.firstTrack!));
    }
  };
  const handlePlay = () => {
    if (item.firstTrack) {
      dispatch(playSingleSong(item.firstTrack));
    }
  };

  return (
  <div className="flex pr-4 justify-start "
   onClick={()=>router.push(`/album/${item.name}/${item.album_name}`)}
  >
    <div className="flex flex-col gap-y-2.25 pt-8.75" >
        {/* <p className="text-[rgba(255_255_255/0.48)] text-[13px]  " >Based  on your  recent listening</p> */}
        <div className="relative overflow-hidden h-110.25 shrink-0 z-2"
            // onClick={handlePlay}

        >
          <CardHeader
            coverSrc={item.pic}
            title={item.name}
            subtitle="Playlist . Spotify "
          />
          <Image
            src={item.bg}
            alt="Big music cover"
            width={358}
            height={441}
            className="h-110.25 w-110 rounded-3xl object-cover  z-2 "
            unoptimized
          />
          <p className="absolute bottom-18.5 text-[12px] left-4 w-58.75 h-4.5 text-[rgba(255_255_255/0.60)] z-2">Pass the sticks & Press Play .</p>
          <div className="absolute bottom-4.75 left-4 right-4">     
              <BottomBigArtist isPlaying={isThisActive} onTogglePlay={handleToggle} />
          </div>

        </div>
    </div>
   </div>
  )
}

export default BigCardArtist