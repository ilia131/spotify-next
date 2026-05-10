"use client";

import { usePathname } from "next/navigation";
import BottomNav from "@/shared/BottomNav/BottomNav";
import { useAppSelector } from "@/redux/hook";
import MenuBar from "@/shared/MenuBar/MenuBar";
import MusicPlayerProvider from "@/shared/MusicPlayer/MusicPlayerProvider";
import MusicOptionsSheet from "@/shared/ui/BottomSheet/MusicOptionsSheet";
import PlaylistSelectorSheet from "@/components/Library/PlaylistSelectorSheet";

export default function RootClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isOpen = useAppSelector((state) => state.ui.isMenuOpen);
  const hidePlayerAndNav = pathname === "/auth/login" ;
  const hidePlayerAndNav2 = pathname === "/auth/register" ;

  const hasSong = useAppSelector((state) => state.player.queue.length > 0);
  const hideaddPlayList = pathname == "/library/LikedSongs/AddLikeSongs"
  

  return (
    <div className="flex justify-center">
    <div className="max-[440]:w-full w-110">
      {children}
      <MusicOptionsSheet />

      {hasSong && !hidePlayerAndNav && !hidePlayerAndNav2 && <MusicPlayerProvider />}
      {isOpen && (
       <MenuBar isOpen={isOpen} />
      )}
      <PlaylistSelectorSheet />

      {!hidePlayerAndNav && !hideaddPlayList  && !hidePlayerAndNav2  && <BottomNav />}
      </div>
    </div>
  );
}
