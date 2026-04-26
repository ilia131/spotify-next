import { Artist } from "@/redux/services/artistApislice"
import Image  from "next/image"

interface CardCircleProps {
    item:Artist 
}



const CircleAvatar = ({item}:CardCircleProps) => {
  return (
    <div className="w-35 h-35 rounded-full overflow-hidden">
         <Image 
            width={140} 
            height={140} 
            alt={"Artist"}
            src={item.profile_pic}
            unoptimized
         />  
    </div>
  )
}

export default CircleAvatar