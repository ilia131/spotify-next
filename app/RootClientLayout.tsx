"use client";

import { usePathname } from "next/navigation";
import MusicPlayer from "@/components/common/MusicPlayer/MusicPlayer";
import BottomNav from "@/components/common/BottomNav/BottomNav";
import { useAppSelector , useAppDispatch } from "@/redux/hook";

import { closeMenu } from "@/redux/features/uiSlice";
import MenuBar from "@/components/common/MenuBar/MenuBar";


export default function RootClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isMenuOpen);
  const hidePlayerAndNav = pathname === "/auth/login";
  const hasSong = useAppSelector((state) => state.player.queue.length > 0);

  

  return (
    <>
      {children}
      {hasSong && !hidePlayerAndNav && <MusicPlayer />}
      {isOpen && (
       <MenuBar isOpen={isOpen} />
      )}
      
      {!hidePlayerAndNav && <BottomNav />}
    </>
  );
}
