"use client";

import { Home, Search, Library } from "lucide-react";
import { useState } from "react";
import Logo from "../Logo/Logo";
import ButtonBottomNav from "./ButtonBottomNav";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function BottomNav() {
  const [active, setActive] = useState("home");
  const pathname = usePathname();

  const { t } = useLanguage();

  const isBlurNav = ["/search", "/library", "/explore"].includes(pathname);

  const navItems = [
    {
      name: "home",
      icon: <Home size={24} />,
      label: t("nav.home"),
      href: "/",
    },
    {
      name: "search",
      icon: <Search size={24} />,
      label: t("nav.search"),
      href: "/search",
    },
    {
      name: "library",
      icon: <Library size={24} />,
      label: t("nav.library"),
      href: "/library",
    },
    {
      name: "explore",
      icon: <Logo />,
      label: t("nav.explore"),
      href: "/explore",
    },
  ];

  return (
    <section className="flex justify-center">
      <div className="fixed bottom-0 z-40 flex w-[440px] flex-col max-[440px]:w-full">

        {/* Fade Top */}
        <div
          className={`h-4 ${
            isBlurNav
              ? "bg-gradient-to-t from-black/40 to-transparent"
              : "bg-gradient-to-t from-[#121212] to-transparent"
          }`}
        />

        {/* Navigation */}
        <div
          className={`
            flex h-22 items-center justify-around pb-5
            transition-all duration-300

            ${
              isBlurNav
                ? `
                  bg-black/30
                  backdrop-blur-2xl
                  border-t border-white/10
                  shadow-[0_-8px_32px_rgba(0,0,0,0.25)]
                `
                : `
                  bg-gradient-to-t
                  from-[#121212]
                  via-[#121212]
                  to-[#181818]
                  border-t border-white/5
                `
            }
          `}
        >
          {navItems.map((item) => (
            <ButtonBottomNav
              key={item.name}
              item={item}
              active={active}
              setActive={setActive}
            />
          ))}
        </div>
      </div>
    </section>
  );
}