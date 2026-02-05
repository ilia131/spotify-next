import LikedSongImage from "./LikedSongImage"
import Image, { StaticImageData } from "next/image"

interface LikeSongsCardProps {
   item : ItemLikedCardProps
}

interface ItemLikedCardProps {
  name:string;
  rounded:string;
  desc:string;
  pic:StaticImageData ;
  type: string
}


const LikedSongCard = ({item}:LikeSongsCardProps) => {
  return (
    <div className="w-22 h-36.25 flex flex-col justify-between shrink-0">
    {item.type === "liked" ? (
      <LikedSongImage image={item.pic} />
    ) : (
      <Image
        src={item.pic}
        width={91}
        height={91}
        alt={item.name}
        unoptimized
        className={`w-22.75 h-22.75 ${
          item.type === "artist" ? "rounded-full" : "rounded-md"
        }`}
      />
    )}

    <div className="w-22 h-10 flex flex-col gap-1">
      <p className="text-white/90 font-normal text-[12px] truncate">
        {item.name}
      </p>
      <p className="text-white/45 font-normal text-[11px] truncate">
        {item.desc}
      </p>
    </div>
  </div>
  )
}

export default LikedSongCard