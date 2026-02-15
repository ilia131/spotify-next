"use client";

import { Home, Search, Library } from "lucide-react";
import { useState } from "react";
import Logo from "../Logo/Logo";
import ButtonBottomNav from "./ButtonBottomNav";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const [active, setActive] = useState("home");
  const pathname = usePathname();

  const isBlurNav = ["/search", "/library", "/premium"].includes(pathname);

  const navItems = [
    { name: "home", icon: <Home size={24} />, label: "Home", href: "/" },
    { name: "search", icon: <Search size={24} />, label: "Search", href: "/search" },
    { name: "library", icon: <Library size={24} />, label: "Library", href: "/library" },
    { name: "premium", icon: <Logo />, label: "Premium", href: "/premium" },
  ];

  return (
  <section className="flex flex-col fixed  bottom-0 left-0 w-full z-3 " >
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
    </section>
  );
}
