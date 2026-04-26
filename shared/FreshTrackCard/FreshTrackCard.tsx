'use client'
import Image from "next/image"
import { useState } from "react"

import Link from "next/link"
import { Song } from "@/redux/features/playerSlice"
interface CardProps {
    item:Song
    title:string
}


const FreshTrackCard = ({item , title } : CardProps) => {
  const [loaded, setLoaded] = useState(false)
  return (
     <div className="grid h-50.75 w-39.5 gap-3 snap-start shrink-0">
      
                <Link href={title === 'Trending Hits' ?  '/trending'  : '/freshtrack'} className="w-39.5 h-37.75  overflow-hidden rounded-lg" >
                 {!loaded && (
                        <div className=" w-39.5 h-37.75 inset-0 animate-pulse bg-zinc-800 rounded-lg" />
                 )}
                  <Image
                    src={item.image_url}
                    width={158}
                    height={151}
                    alt="Cover"
                    unoptimized
                    onLoadingComplete={() => setLoaded(true)}

                    />

                </Link>
                {title === 'Trending Hits'? 
                   <Link className="text-[rgba(255_255_255/0.55)] text-[13px] line-clamp-2 pl-0 "
                   href={`/trending`}
                   >
                    {item.title}
                   </Link>
                
                :
                
                <Link className="text-[rgba(255_255_255/0.55)] text-[13px] line-clamp-2 pl-0 "
                href={`/freshtrack`}
                >
                 {item.title}
                </Link>}
             
              </div>
  )
}

export default FreshTrackCard