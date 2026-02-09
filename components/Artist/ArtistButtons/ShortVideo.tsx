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
    <div className=" h-45.75 relative flex justify-center ">
    <Image width={107} height={183} src={item.cover} 
    className="h-45.75 overflow-hidden rounded-[9px] object-cover"
    alt="shortvideoartist"
    />
    <p className="absolute bottom-2 font-bold text-[12px] text-[rgba(255,255,255,1)] ">{item.musicname}</p>
  </div>
  )
}

export default ShortVideo