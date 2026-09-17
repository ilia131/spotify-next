"use client";

import { usePathname } from "next/navigation";

import BottomNav from "@/shared/BottomNav/BottomNav";
import MenuBar from "@/shared/MenuBar/MenuBar";

import MusicPlayerProvider from "@/shared/MusicPlayer/MusicPlayerProvider";
import MusicOptionsSheet from "@/shared/ui/BottomSheet/MusicOptionsSheet";
import PlaylistSelectorSheet from "@/components/Library/PlaylistSelectorSheet";

import {
  useAppDispatch,
  useAppSelector,
} from "@/redux/hook";
import {
  closeMenu,
} from "@/redux/features/uiSlice";
import LanguageSwitcher from "@/shared/LanguageSwitcher/LanguageSwitcher";

export default function RootClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const dispatch = useAppDispatch();

  // Menu
  const isMenuOpen = useAppSelector(
    (state) => state.ui.isMenuOpen
  );

  // Player
  const hasSong = useAppSelector(
    (state) => state.player.queue.length > 0
  );
  
  const locale = pathname.startsWith("/en")
    ? "en"
    : "fa";

  const isEnglish = locale === "en";
  // Routes
  const isAuthPage =
    pathname === "/auth/login" ||
    pathname === "/auth/register";
    

  const isAddLikedSongsPage =
    pathname === "/library/LikedSongs/AddLikeSongs";

  const isHomePage =
    pathname === "/home";

  const handleCloseMenu = () => {
    dispatch(closeMenu());
  };
  const isAdminRoute = pathname.startsWith("/admin"); 
     if (isAdminRoute) {
      return (
        <div
          className="min-h-screen w-full"
          dir={isEnglish ? "ltr" : "rtl"}
        >
          {children}
  
          <LanguageSwitcher />
        </div>
      );
    }

  return (
    <div className="flex justify-center w-full">
      <div
        className={`
          relative
          min-h-screen
          ${
            isHomePage
              ? "w-full"
              : "w-[440px] max-w-full"
          }
        `}
      >
        {/* Page */}
        {children}

        {/* Music Options */}
        <MusicOptionsSheet />

        {/* Music Player */}
        {hasSong && !isAuthPage && (
          <MusicPlayerProvider />
        )}

        {/* Menu */}
        <MenuBar
          isOpen={isMenuOpen}
          onClose={handleCloseMenu}
        />

        {/* Playlist Selector */}
        <PlaylistSelectorSheet />

        {/* Bottom Navigation */}
        {!isAuthPage &&
          !isAddLikedSongsPage &&
          !isHomePage && (
            <BottomNav />
          )}
          <LanguageSwitcher />
      </div>
    </div>
  );
}