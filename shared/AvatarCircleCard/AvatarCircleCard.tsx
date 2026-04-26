import { Artist } from "@/redux/services/artistApislice"
import CircleAvatar from "../CircleAvatar/CircleAvatar"

interface CircleCardProps {
    item:Artist ,
}



const AvatarCircleCard = ({item} : CircleCardProps ) => {
  return (
    <div className="grid h-44.25 w-35 justify-center gap-4 text-center" >
        <CircleAvatar item={item}  />
        <p className="text-[14px] text-[rgba(255_255_255/0.66)] font-600">{item.artistname}</p>
    </div>
  )
}

export default AvatarCircleCard