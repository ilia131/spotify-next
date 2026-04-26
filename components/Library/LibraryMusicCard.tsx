import Image, { StaticImageData } from "next/image"

interface Props {
    item: {name:string, cover:StaticImageData ,type:string}
}

const LibraryMusicCard = ({item}:Props) => {
  return (
     <div className=" h-17.5 flex gap-3.75 items-center" >
              <Image src={item.cover} width={70} height={70} 
              className="w-17.5 h-17.5 overflow-hidden rounded-full" alt="musiccover" priority
              />
              <div className="h-12.25 flex flex-col justify-center">
              <p className="text-[rgba(255,255,255,1)] text-[14px] font-medium">{item.name}</p>
              <p className="text-[rgba(255,255,255,0.50)] text-[11px] font-medium">{item.type}</p>
              </div>
        </div>
  )
}

export default LibraryMusicCard