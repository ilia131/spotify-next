import Image ,  { StaticImageData } from "next/image"
import Link from "next/link"
interface CardProps {
    item:ItemProps 
}

export interface ItemProps {
    picture : string | StaticImageData
    desc: string 
    profile_pic:StaticImageData,
    id:string
    bio:string
}


const Cards = ({item } : CardProps) => {
  return (
     <div className="grid h-50.75 w-39.5 gap-3 snap-start shrink-0">
                <Link href={`/artist/${item.id ?? ""}`} className="w-39.5 h-37.75  overflow-hidden" >
                  <Image
                    src={item.picture || item.profile_pic}
                    width={158}
                    height={151}
                    alt="Cover"
                    unoptimized/>
                </Link>
                <Link className="text-[rgba(255_255_255/0.55)] text-[13px] line-clamp-2 pl-0 "
                href={`/artist/${item.id ?? ""}`}
                >
                 {item.desc || item.bio}
                </Link>
              </div>
  )
}

export default Cards