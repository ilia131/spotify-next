import Image from "next/image"
import images from "@/public/images"


const ArtistMiniCard = () => {
  return (
     <section className=" ">
          <div className="flex">
            <div className="h-15 w-15 rounded-tl-[5px] rounded-tr-[1px] rounded-br-[1px] rounded-bl-[5px] overflow-hidden">
              <Image src={images.Kagan} width={60} height={60} alt='kagan'  unoptimized/>
            </div>
             <div className="w-29.25 h-15 bg-[rgb(39_39_39/0.91)]  flex justify-center items-center rounded-tl-[1px] rounded-tr-[5px] rounded-br-[5px] rounded-bl-[1px]"> 
              <p className=" text-[12.5px] font-semibold text-[rgb(255_255_255/0.86)]">
                  Ashkan  Kagan
              </p>
             </div>
          </div>
      </section>
  )
}

export default ArtistMiniCard