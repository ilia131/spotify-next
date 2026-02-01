"use client";

import { useState } from "react";
import Image from "next/image";
import images from "@/public/images";

const filters = [
  { name: "All", height: "h-[34px]", padding: "px-4", width: "w-[52px]" },
  { name: "Music", height: "h-[34px]", padding: "px-4", width: "w-[71px]" },
  { name: "Albums", height: "h-[34px]", padding: "px-5", width: "w-[86px]" },
  { name: "Trackpacks", height: "h-[34px]", padding: "px-[20.5px]", width: "w-[108px]" },
];

export default function FilterSlider() {
  const [active, setActive] = useState("All");

  return (
    <div className="pt-[83px] pl-[18px] relative             hide-scrollbar">
      <section className="h-[34px] relative overflow-hidden   ">

        {/* Left fixed icon */}
        <div className="absolute left-0 top-0 z-30 flex items-center">
          <div  className="h-[34px] w-[33px] bg-[#121212]  flex items-center justify-center text-black/85 text-[19px]">
            <div className="h-[34px] w-[33px] bg-[#7D4B32] rounded-full flex items-center justify-center text-black/85 text-[19px]">
              I
           </div>
      </div>

          {/* Gradient */}
          <div className="h-8.5 w-10 bg-linear-to-r  from-[#121212] to-transparent" />
        </div>

        {/* Slider */}
        <div className="overflow-x-auto scrollbar-none">
          <div className="flex gap-[11.77px] pl-[50px] pr-4 whitespace-nowrap">
            {filters.map((item) => (
              <button
                key={item.name}
                onClick={() => setActive(item.name)}
                className={`${item.width} ${item.height} ${item.padding}
                flex items-center justify-center
                
                rounded-[19px] text-[13px] transition-colors 
                  ${active === item.name
                    ? "bg-[#1FD660] text-black/70 font-medium "
                    : "bg-[rgba(41,41,41,0.82)] text-white/75 "
                  }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

      </section>
      <section className="pt-[23px] ">
          <div className="flex">
            <div className="h-[60px] w-[60px] rounded-tl-[5px] rounded-tr-[1px] rounded-br-[1px] rounded-bl-[5px]">
             <Image src={images.Kagan} width={60} height={60} alt='kagan'   unoptimized
 />
            </div>
             <div className="w-[117px] h-[60px] bg-[rgb(39_39_39/0.91)] 
               flex justify-center items-center rounded-tl-[1px] rounded-tr-[5px] rounded-br-[5px] rounded-bl-[1px]"> 
              <p className=" text-[12.5px] font-semibold text-[rgb(255_255_255/0.86)]">
                  Ashkan  Kagan
              </p>
             </div>
          </div>
      </section>
      <section className="pt-[23px] grid gap-[12px] relative overflow-hidden">
        <h1 className="text-[rgba(255_255_255/0.92)] text-[21px] font-bold">
          Fresh Tracks Friday !
        </h1>

          <div
            className="
              flex gap-3
              overflow-x-auto overflow-y-hidden
              scroll-smooth
              snap-x snap-mandatory
            hide-scrollbar
            "
          >
        {[1,2,3].map((_, i) => (
          <div
            key={i}
            className="grid h-[203px] w-[158px] gap-3 snap-start shrink-0"
          >
            <div className="w-[158px] h-[151px]  overflow-hidden">
              <Image
                src={images.Bilie}
                width={158}
                height={151}
                alt="Cover"
                unoptimized

              />
            </div>

            <p className="text-[rgba(255_255_255/0.55)] h-[40px] text-[13px]">
              Noah Kahan, Labrinth,
              Paris Paloma,jireel,Co...
            </p>
          </div>
        ))}
        </div>
     </section>
     <section>
       <div className="w-[230px] h-[55px] mt-[25px] flex gap-[16px]">
       <div className="w-[50px] h-[50px]  overflow-hidden rounded-full">
              <Image
                src={images.HipHopLogist}
                width={50}
                height={50}
                alt="Cover"
                unoptimized

              />
          </div>
          <div className="w-[164px] h-[55px] grid">
             <p className="text-[13px] text-[rgba(255_255_255/0.5)]">More Like</p>
             <p className="text-[23px] text-[rgba(255_255_255/0.83)] font-[600]">HipHoplogist</p>
          </div>
       </div>
     </section>
     <section className="pt-[23px] grid gap-[12px] relative overflow-hidden">
          <div
            className="
              flex gap-3
              overflow-x-auto overflow-y-hidden
              scroll-smooth
              snap-x snap-mandatory
            hide-scrollbar
            "
          >
        {[1,2,3].map((_, i) => (
          <div
            key={i}
            className="grid h-[203px] w-[158px] gap-3 snap-start shrink-0"
          >
            <div className="w-[158px] h-[151px]  overflow-hidden">
              <Image
                src="/images/Bilie.jpg"
                width={158}
                height={151}
                alt="Cover"
                unoptimized

              />
            </div>

            <p className="text-[rgba(255_255_255/0.55)] h-[40px] text-[13px]">
              Noah Kahan, Labrinth,
              Paris Paloma,jireel,Co...
            </p>
          </div>
        ))}
        </div>
     </section>

    </div>
  );
}
