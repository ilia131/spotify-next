import Image from "next/image"
import images from "@/public/images"
import CardHeader from "./CardHeader"
import Preview from "./Preview"
import PlayOption from "./PlayOption"
import BottomBigArtist from "./BottomBigArtist"


const BigCardArtist = () => {
  return (
   <section className="flex flex-col gap-y-2.25 pt-8.75" >
       <p className="text-[rgba(255_255_255/0.48)] text-[13px] " >Based  on your  recent listening</p>
       <div className="relative overflow-hidden h-110.25">
        <CardHeader
          coverSrc={images.vini3}
          title="Hip-Hop Controller"
          subtitle="Playlist . Spotify"
        />

        <Image
          src={images.vini2}
          alt="Big music cover"
          width={358}
          height={441}
          className="h-110.25 w-89.5 rounded-3xl object-cover"
          unoptimized
        />
        <p className=" absolute bottom-18.5 text-[12px] left-4 w-58.75 h-4.5 text-[rgba(255_255_255/0.60)] ">Pass the sticks & Press Play .</p>
        <BottomBigArtist />
      </div>
   </section>
  )
}

export default BigCardArtist