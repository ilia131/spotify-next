"use client";

import { Home, Search, Library } from "lucide-react";
import { useState } from "react";
import Logo from "../Logo/Logo";
import ButtonBottomNav from "./ButtonBottomNav";
export default function BottomNav() {
  const [active, setActive] = useState("home");

  const navItems = [
    { name: "home", icon: <Home size={24} />, label: "Home", href: "/" },
    { name: "search", icon: <Search size={24} />, label: "Search", href: "/search" },
    { name: "library", icon: <Library size={24} />, label: "Library", href: "/library" },
    { name: "premium", icon: <Logo />, label: "Premium", href: "/premium" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#121212] border-t border-gray-700 flex justify-around items-center h-22 pb-5 z-50">
      {navItems.map((item) => ( 
         <ButtonBottomNav
            key={item.name}       
            item={item}
            setActive={setActive}
            active={active}
/>      ))}
    </div>
  );
}
