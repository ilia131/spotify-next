"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import fa from "./messages/fa.json";
import en from "./messages/en.json";

type Locale = "fa" | "en";

const messages = {
  fa,
  en,
};

type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (key: string) => string;
};

const LanguageContext =
  createContext<LanguageContextType | null>(null);

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>("fa");

  useEffect(() => {
    const saved = localStorage.getItem("milify-locale");

    if (saved === "fa" || saved === "en") {
      setLocaleState(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir =

    document.body.style.fontFamily =
      locale === "fa"
        ? "var(--font-vazirmatn)"
        : "var(--font-inter)";
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(
      "milify-locale",
      newLocale
    );
  };

  const toggleLocale = () => {
    setLocale(locale === "fa" ? "en" : "fa");
  };

  const t = (key: string) => {
    const keys = key.split(".");

    let value: any = messages[locale];

    for (const k of keys) {
      value = value?.[k];
    }

    return value ?? key;
  };

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        toggleLocale,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}