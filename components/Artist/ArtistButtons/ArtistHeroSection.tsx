import Image from "next/image"
import ArtistName from "../ArtistName"
import ArtistButtons from "./ArtistButtons"
import images from "@/public/images"

const ArtistHeroSection = () => {
  return (
    <section className="relative w-full h-117 overflow-hidden">
    <Image
      src={images.Kagan}
      alt="kagan"
      fill
      className="object-cover "
      fetchPriority="high"

      priority
    />
    <ArtistName />
    <ArtistButtons />
  </section>
  )
}

export default ArtistHeroSection