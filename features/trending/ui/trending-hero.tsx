"use client"

import Image from "next/image"
import { useRef, useEffect, useState } from "react"
import { useAppSelector } from "@/redux/hook"
import { useDominantColorFromImage } from "@/shared/hooks/useDominantColorFromImage"
import { ParallaxCover } from "@/shared/ui/Parallexcover/parallax-cover"

interface Props {
  image: string
}



export default function TrendingTracksHero({ image }: Props) {
  useDominantColorFromImage(image)
  const { color, darkColor } = useAppSelector(state => state.player)

  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const update = () => {
      setScrollY(window.scrollY * 0.15)
    }

    window.addEventListener("scroll", update)
    return () => window.removeEventListener("scroll", update)
  }, [])
  
  return (
    <section
      ref={scrollRef}
      className="relative w-full h-100 overflow-hidden flex flex-col items-center justify-end pb-8"
      style={{
        transform: `translateY(${scrollY}px)`,
        background: `linear-gradient(180deg, ${color} 0%, ${darkColor} 100%)`,
        transition: "background 900ms cubic-bezier(0.4,0,0.2,1)"
      }}
    >

    {/* blurred bg */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt="bg"
          fill
          className="object-cover scale-[1.8] blur-[120px] opacity-[0.35]"
        />
      </div>

      {/* bloom */}
    <div
      className="absolute inset-0 opacity-40"
      style={{
        background: `radial-gradient(circle at 50% 40%, ${color} 0%, ${color}66 30%, transparent 70%)`,
        maskImage: "radial-gradient(circle at center, black 40%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 75%)"
      }}
    />     
      <div className="absolute inset-0 bg-black/35 mix-blend-multiply" />
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/55" />

      <div className="relative z-10 flex flex-col items-center text-center px-6">

       

        <ParallaxCover src={image} />
        <p className="text-white/80 text-xs uppercase mt-5 tracking-wide">
          Playlist
        </p>

        <h1 className="text-white text-[28px] font-bold mt-1 drop-shadow-2xl">
          Trending
        </h1>

        <p className="text-white/60 text-[13px] mt-1">
          Updated weekly • 2026
        </p>
      </div>
      <div
        className="
          absolute bottom-0 left-0 right-0
          h-30
          pointer-events-none
        "
      />
    </section>
  )
}
