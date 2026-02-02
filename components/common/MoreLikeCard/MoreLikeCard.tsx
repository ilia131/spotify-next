'use client'

import { StaticImageData } from "next/image"
import Avatar from "../Avatar/Avatar"
import TextContent from "../TextContent/TextContent"

interface MoreLikeCardProps {
  images: string | StaticImageData
  label: string
  subtitle?: string
}


const MoreLikeCard = ({images , label , subtitle}:MoreLikeCardProps) => {
  return (
    <section>
       <div className="w-57.5 h-13.75 mt-6.25 flex gap-4 mb-3">
          <Avatar images={images} />
          <TextContent subtitle={subtitle} label={label}/>
       </div>
     </section>
  )
}

export default MoreLikeCard