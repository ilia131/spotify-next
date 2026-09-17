"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

export default function LanguageSwitcher() {
  const { locale, toggleLocale } = useLanguage();

  const nextLocale = locale === "fa" ? "en" : "fa";

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={`Switch language to ${nextLocale}`}
      className="
        fixed
        bottom-24
        right-4
        z-[99999]
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-full
        border
        border-white/10
        bg-[#181818]/95
        text-xs
        font-bold
        text-white
        shadow-2xl
        backdrop-blur-xl
        transition-all
        duration-200
        hover:bg-[#242424]
        active:scale-90
      "
    >
      {nextLocale.toUpperCase()}
    </button>
  );
}