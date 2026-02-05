import CircleAvatar from "../CircleAvatar/CircleAvatar"
import { StaticImageData } from "next/image"

interface CircleCardProps {
    item:ItemProps ,
}

export interface ItemProps {
    picture : string | StaticImageData
    desc: string,
    name:string
}

const AvatarCircleCard = ({item} : CircleCardProps ) => {
  return (
    <div className="grid h-44.25 w-35 justify-center gap-4 text-center" >
        <CircleAvatar item={item}  />
        <p className="text-[14px] text-[rgba(255_255_255/0.66)] font-600">{item.name}</p>
    </div>
  )
}

export default AvatarCircleCard