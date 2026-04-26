import { useEffect } from "react"
import { useAppDispatch } from "@/redux/hook"
import { setPlayerColor } from "@/redux/features/playerSlice"

function getDominantColor(img: HTMLImageElement) {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  const size = 60
  canvas.width = size
  canvas.height = size

  ctx?.drawImage(img, 0, 0, size, size)

  const data = ctx?.getImageData(0, 0, size, size).data
  if (!data) return "rgb(80,80,80)"

  let r = 0, g = 0, b = 0, count = 0

  for (let i = 0; i < data.length; i += 16) {
    r += data[i]
    g += data[i + 1]
    b += data[i + 2]
    count++
  }

  return `rgb(${Math.floor(r / count)}, ${Math.floor(g / count)}, ${Math.floor(b / count)})`
}

function darken(rgb: string, amount: number) {
  const [r, g, b] = rgb.match(/\d+/g)!.map(Number)

  return `rgb(${Math.max(0, r - amount)}, ${Math.max(0, g - amount)}, ${Math.max(0, b - amount)})`
}


export function useDominantColorFromImage(url?: string | null) {

  const dispatch = useAppDispatch()

  useEffect(()=>{

    if(!url) return

    const img = new Image()
    img.crossOrigin = "anonymous"

    img.onload = ()=>{

      const color = getDominantColor(img)
      const darkColor = darken(color,120)

      dispatch(setPlayerColor({color,darkColor}))
    }

    img.src = url

  },[url])

}

