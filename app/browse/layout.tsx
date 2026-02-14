import { Suspense } from "react";
import BrowseLoading from "./loading";
import NavSlider from "@/components/common/NavSlider/NavSlider";

const filters = [
    {
      name: "All",
      href: "/browse",
      height: "h-[34px]",
      padding: "px-4",
      width: "w-[52px]",
    },
    {
      name: "Music",
      href: "/browse/music",
      height: "h-[34px]",
      padding: "px-4",
      width: "w-[71px]",
    },
    {
      name: "Albums",
      href: "/browse/albums",
      height: "h-[34px]",
      padding: "px-5",
      width: "w-[86px]",
    },
    {
      name: "Trackpacks",
      href: "/browse/trackpacks",
      height: "h-[34px]",
      padding: "px-[20.5px]",
      width: "w-[108px]",
    },
  ];
  

export default function BrowseLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="">
      {/* <div className="pl-4 relative hide-scrollbar ">
         <NavSlider filters={filters} />
      </div> */}
      <Suspense fallback={<BrowseLoading />}>
        {children}
      </Suspense>
    </section>
  );
}
