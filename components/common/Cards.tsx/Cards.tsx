import Image ,  { StaticImageData } from "next/image"

interface CardProps {
    item:ItemProps 
}

export interface ItemProps {
    picture : string | StaticImageData
    desc: string
}


const Cards = ({item } : CardProps) => {
  return (
     <div className="grid h-50.75 w-39.5 gap-3 snap-start shrink-0">
                <div className="w-39.5 h-37.75  overflow-hidden">
                  <Image
                    src={item.picture}
                    width={158}
                    height={151}
                    alt="Cover"
                    unoptimized/>
                </div>
                <p className="text-[rgba(255_255_255/0.55)] text-[13px] line-clamp-2 "
                
                >
                Noah Kahan, Labrinth,
                Paris Paloma,jireel,Co
                </p>
              </div>
  )
}

export default Cards