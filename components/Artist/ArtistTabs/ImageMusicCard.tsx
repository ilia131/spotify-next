import Image, { StaticImageData } from "next/image"



interface ItemProps {
    item:ArtistProps
}
 
 
 interface ArtistProps {
   id: number
   musicname : string
   image: StaticImageData;
   countview:string
}

const ImageMusicCard = ({item}:ItemProps) => {
  return (
    <div className="flex gap-4.25 items-center ">
    <p className="text-[rgba(255,255,255,1)] text-[13px] font-normal">{item.id}</p>
        <Image alt="covermusic" width={51} height={51} src={item.image} unoptimized
        className="w-12.75 h-12.75 overflow-hidden"
        />
   </div>
  )
}

export default ImageMusicCard