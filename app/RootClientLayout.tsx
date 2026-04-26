"use client";

import { usePathname } from "next/navigation";
import BottomNav from "@/shared/BottomNav/BottomNav";
import { useAppSelector } from "@/redux/hook";
import MenuBar from "@/shared/MenuBar/MenuBar";
import MusicPlayerProvider from "@/shared/MusicPlayer/MusicPlayerProvider";


export default function RootClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isOpen = useAppSelector((state) => state.ui.isMenuOpen);
  const hidePlayerAndNav = pathname === "/auth/login";
  const hasSong = useAppSelector((state) => state.player.queue.length > 0);

  

  return (
    <div className="flex justify-center">
    <div className="max-[440]:w-full w-110">
      {children}
      {hasSong && !hidePlayerAndNav && <MusicPlayerProvider />}
      {isOpen && (
       <MenuBar isOpen={isOpen} />
      )}
      
      {!hidePlayerAndNav && <BottomNav />}
      </div>
    </div>
  );
}
