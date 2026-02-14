import Image , {StaticImageData}from "next/image"
import ArtistName from "../ArtistName"
import ArtistButtons from "./ArtistButtons"
import images from "@/public/images"

interface ArtistHeroSectionProps {
  image: StaticImageData,
  artistname:string
  
}

const ArtistHeroSection = ({
  image,
  artistname,
}:ArtistHeroSectionProps) => {
  return (
    <section className="relative w-full h-117 overflow-hidden -mt-[env(safe-area-inset-top)]">
    <Image
      src={image || images.kagan2}
      alt="kagan"
      fill
      className="object-cover "
      fetchPriority="high"

      priority
    />
    <ArtistName artistname={artistname} />
    <ArtistButtons />
  </section>
  )
}

export default ArtistHeroSection