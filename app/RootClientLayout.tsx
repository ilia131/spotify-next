"use client";

import { usePathname } from "next/navigation";
import MusicPlayer from "@/components/common/MusicPlayer/MusicPlayer";
import BottomNav from "@/components/common/BottomNav/BottomNav";
import { useAppSelector } from "@/redux/hook";
export default function RootClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const hidePlayerAndNav = pathname === "/auth/login";
  const hasSong = useAppSelector((state) => state.player.queue.length > 0);



  return (
    <>
      {children}
      {hasSong && !hidePlayerAndNav && <MusicPlayer />}

      
      {!hidePlayerAndNav && <BottomNav />}
    </>
  );
}
