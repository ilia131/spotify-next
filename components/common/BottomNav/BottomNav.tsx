"use client";

import { Home, Search, Library } from "lucide-react";
import { useState } from "react";
import Logo from "../Logo/Logo";
export default function BottomNav() {
  const [active, setActive] = useState("home");

  const navItems = [
    { name: "home", icon: <Home size={24} />, label: "Home" },
    { name: "search", icon: <Search size={24} />, label: "Search" },
    { name: "library", icon: <Library size={24} />, label: "Library" },
    { name: "permium", icon: <Logo  />, label: "Permium" },

  ];

  return (
    <div className="
    
    fixed bottom-0 left-0 w-full bg-[#121212] border-t border-gray-700 flex justify-around items-center h-22 pb-5 z-50">
      {navItems.map((item) => (
        <button
          key={item.name}
          onClick={() => setActive(item.name)}
          className="flex flex-col items-center gap-1.25 justify-center text-white/70 hover:text-white transition-colors"
        >
          <div
            className={`${
              active === item.name ? "text-green-500 fill-green-400" : "fill-[rgba(255_255_255/65)]"
            }`}
          >
            {item.icon}
          </div>
          <span 
           className={`${
            active === item.name ? "text-green-500 " : "text-[rgba(255_255_255/65)] "
          }text-[10px] text-[rgba(255_255_255/65)]`}
          >{item.label}</span>
        </button>
      ))}
    </div>
  );
}
