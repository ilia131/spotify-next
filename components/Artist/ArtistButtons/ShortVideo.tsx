import Image , { StaticImageData } from "next/image"

interface ShortVideoProps {
    item:ItemPopularMusic
}

interface ItemPopularMusic {
    musicname:string;
    cover:StaticImageData;
}


const ShortVideo = ({item}:ShortVideoProps) => {
  return (
    <div className=" h-45.75 relative">
    <Image width={107} height={183} src={item.cover} 
    className="h-45.75 overflow-hidden rounded-[9px]"
    alt="shortvideoartist"
    />
    <p className="absolute bottom-2 left-0.75 font-bold text-[13px] text-[rgba(255,255,255,0.95)] ">{item.musicname}</p>
  </div>
  )
}

export default ShortVideo