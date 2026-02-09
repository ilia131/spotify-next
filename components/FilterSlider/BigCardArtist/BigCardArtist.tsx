import Image, { StaticImageData } from "next/image"
import CardHeader from "./CardHeader"
import BottomBigArtist from "./BottomBigArtist"

interface ItemArtistProps {
   item: ItemsProps
}

interface ItemsProps {
  name:string ,
  pic:StaticImageData;
  bg:StaticImageData;
}


const BigCardArtist = ({item}:ItemArtistProps) => {

  return (
  <div className="flex pr-4 justify-start">
    <div className="flex flex-col gap-y-2.25 pt-8.75" >
        <p className="text-[rgba(255_255_255/0.48)] text-[13px]  " >Based  on your  recent listening</p>
        <div className="relative overflow-hidden h-110.25 shrink-0 z-2">
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
          <BottomBigArtist />
        </div>
    </div>
   </div>
  )
}

export default BigCardArtist