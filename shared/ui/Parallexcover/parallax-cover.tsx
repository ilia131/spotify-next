"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"

interface Props {
  src: string
  size?: number
}


export function ParallaxCover({ src }:Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [target, setTarget] = useState({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })

  useEffect(() => {
    let frame: number

    const animate = () => {
      current.current.x += (target.x - current.current.x) * 0.09
      current.current.y += (target.y - current.current.y) * 0.09

      const el = ref.current
      if (el) {
        const rotateX = current.current.y * 14
        const rotateY = current.current.x * 14
        const shadowX = current.current.x * 40
        const shadowY = current.current.y * 40

        el.style.transform =
          `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`

        el.style.filter =
          `drop-shadow(${shadowX}px ${shadowY}px 45px rgba(0,0,0,0.55))`
      }

      frame = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(frame)
  }, [target])

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTarget({ x, y })
  }

  function reset() {
    setTarget({ x: 0, y: 0 })
  }

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="relative w-[190px] h-[190px] select-none"
    >
      {/* breathing ring */}
      <div
        className="
          absolute inset-0 -z-20 rounded-full blur-[45px] 
          animate-[pulseGlow_4s_ease-in-out_infinite]
          opacity-40
        "
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.4), transparent 70%)"
        }}
      />

      {/* 3D parallax container */}
      <div
        ref={ref}
        className="relative will-change-transform w-full h-full"
      >
        <Image
          src={src}
          alt="album"
          width={190}
          height={190}
          className="
            rounded-xl
            shadow-[0px_30px_80px_rgba(0,0,0,0.7)]
            pointer-events-none
          "
        />
      </div>
    </div>
  )
}
