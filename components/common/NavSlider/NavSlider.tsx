'use client'
import { useState } from "react";



const filters = [
    { name: "All", height: "h-[34px]", padding: "px-4", width: "w-[52px]" },
    { name: "Music", height: "h-[34px]", padding: "px-4", width: "w-[71px]" },
    { name: "Albums", height: "h-[34px]", padding: "px-5", width: "w-[86px]" },
    { name: "Trackpacks", height: "h-[34px]", padding: "px-[20.5px]", width: "w-[108px]" },
  ];

const NavSlider = () => {
    const [active, setActive] = useState("All");

  return (
  <div className="fixed w-full top-0    z-50 bg-[#121212] pt-7.5 pb-1.5">
    <section className="h-8.5 relative overflow-hidden   ">

        <div className="absolute left-0 top-0 z-30 flex items-center">
          <div  className="h-8.5 w-8.25 bg-[#121212]  flex items-center justify-center text-black/85 text-[19px]">
            <div className="h-8.5 w-8.25 bg-[#7D4B32] rounded-full flex items-center justify-center text-black/85 text-[19px]">
              I
           </div>
      </div>

          {/* Gradient */}
          <div className="h-8.5 w-10 bg-linear-to-r  from-[#121212] to-transparent" />
        </div>

        {/* Slider */}
        <div className="overflow-x-auto  hide-scrollbar">
          <div className="flex gap-[11.77px] pl-12.5 pr-4 whitespace-nowrap  min-w-max">
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
    </div>
  )
}

export default NavSlider