import Image from "next/image"
import ArtistName from "../ArtistName"
import ArtistButtons from "./ArtistButtons"
import images from "@/public/images"
import type { Viewport } from "next";
import { Artist } from "@/redux/services/artistApislice";
import BackgroundLayers from "./BackgroundLayers";
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};
interface ArtistHeroSectionProps {
  image: string | undefined,
  artistname:string | undefined
  data:Artist
}

const ArtistHeroSection = ({
  image,
  artistname,
  data
}:ArtistHeroSectionProps) => {
  return (
    <section className="relative w-full h-117 overflow-hidden -mt-[env(safe-area-inset-top)]">
  <Image
    src={image ?? "/item.jpg"}
    alt={artistname || ""}
    fill
    className="object-cover"
    priority
  />
  

  
  <ArtistName artistname={artistname} />
  <ArtistButtons data={data} />
  
  
</section>
  )
}

export default ArtistHeroSection