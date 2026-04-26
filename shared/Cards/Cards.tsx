'use client'
import Image from "next/image"
import { useState } from "react"

import Link from "next/link"
import { Artist } from "@/redux/services/artistApislice"
interface CardProps {
    item:Artist 
}




const Cards = ({item } : CardProps) => {
  const [loaded, setLoaded] = useState(false)
  return (
     <div className="grid h-50.75 w-39.5 gap-3 snap-start shrink-0">
                <Link href={`/artist/${item.artistname ?? ""}`} className="w-39.5 h-37.75  overflow-hidden rounded-lg" >
                {!loaded && (
        <div className=" w-39.5 h-37.75 inset-0 animate-pulse bg-zinc-800 rounded-lg" />
          )}
                  <Image
                    src={item.profile_pic}
                    width={158}
                    height={151}
                    alt="Cover"
                    unoptimized
                    onLoadingComplete={() => setLoaded(true)}

                    />

                </Link>
                <Link className="text-[rgba(255_255_255/0.55)] text-[13px] line-clamp-2 pl-0 "
                href={`/artist/${item.id ?? ""}`}
                >
                 {item.bio}
                </Link>
              </div>
  )
}

export default Cards