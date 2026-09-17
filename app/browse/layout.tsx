"use client"
import { Suspense } from "react";
import BrowseLoading from "./loading";
import NavSlider from "@/shared/NavSlider/NavSlider";
import { useLanguage } from "@/i18n/LanguageProvider";


  

export default function BrowseLayout({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();
  const filters = [
    {
      name: t("browse.all"),
      href: "/browse",
      height: "h-[34px]",
      padding: "px-4",
      width: "w-[52px]",
    },
    {
      name: t("browse.music"),
      href: "/browse/music",
      height: "h-[34px]",
      padding: "px-4",
      width: "w-[71px]",
    },
    {
      name: t("browse.albums"),
      href: "/browse/albums",
      height: "h-[34px]",
      padding: "px-5",
      width: "w-[86px]",
    },
    {
      name: t("browse.supportUs"),
      href: "/browse/trackpacks",
      height: "h-[34px]",
      padding: "px-[20.5px]",
      width: "w-[108px]",
    },
  ];

  return (
    <section className="flex justify-center" >
      <div className="w-110 max-[440px]:w-full">
            <div className="relative hide-scrollbar">
             <NavSlider filters={filters} />
            </div>
              <Suspense fallback={<BrowseLoading />}>
                {children}
              </Suspense>
              
          </div>
        
     </section>
  );
}
