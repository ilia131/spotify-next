"use client"
import { useEffect, useState } from "react"

export default function ParallaxLayer({ children }: any) {

  const [y, setY] = useState(0)

  useEffect(() => {

    const onScroll = () => {
      setY(window.scrollY * 0.25)
    }

    window.addEventListener("scroll", onScroll)

    return () => window.removeEventListener("scroll", onScroll)

  }, [])

  return (
    <div
      style={{
        transform: `translateY(${y}px)`
      }}
    >
      {children}
    </div>
  )
}
