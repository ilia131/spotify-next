import Image ,  { StaticImageData } from "next/image"

interface CardCircleProps {
    item:ItemProps; 
}

export interface ItemProps {
    picture : string | StaticImageData
}


const CircleAvatar = ({item}:CardCircleProps) => {
  return (
    <div className="w-35 h-35 rounded-full overflow-hidden">
         <Image 
            width={140} 
            height={140} 
            alt={"Artist"}
            src={item.picture}
            unoptimized
         />  
    </div>
  )
}

export default CircleAvatar