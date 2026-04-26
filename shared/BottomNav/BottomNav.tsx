"use client";

import { Home, Search, Library } from "lucide-react";
import { useState } from "react";
import Logo from "../Logo/Logo";
import ButtonBottomNav from "./ButtonBottomNav";
import { usePathname } from "next/navigation";
export default function BottomNav() {
  const [active, setActive] = useState("home");
  const pathname = usePathname();

  const isBlurNav = ["/search", "/library", "/explore"].includes(pathname);

  const navItems = [
    { name: "home", icon: <Home size={24} />, label: "Home", href: "/" },
    { name: "search", icon: <Search size={24} />, label: "Search", href: "/search" },
    { name: "library", icon: <Library size={24} />, label: "Library", href: "/library" },
    { name: "explore", icon: <Logo />, label: "Explore", href: "/explore" },
  ];

  return (
    <section className="flex justify-center">
      <div className="flex flex-col fixed  w-110 max-[440px]:w-full   bottom-0    z-3 " >
      <div  className="   h-3 bottom-22 bg-linear-to-t from-[#121212] to-transparent z-3"/>
      <div 
        className={`
          flex justify-around items-center h-22 pb-5 z-50
          ${isBlurNav
            ? "bg-[rgba(0,0,0,0.7)] backdrop-blur-xs" 
            : " bg-[#121212]"}
        `}>

      {navItems.map((item) => ( 
         <ButtonBottomNav
            key={item.name}       
            item={item}
            setActive={setActive}
            active={active}
/>      ))}
    </div>
    </div>
    </section>
  );
}
