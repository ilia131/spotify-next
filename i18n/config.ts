export const locales = ["fa", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fa";

export function isValidLocale(
  locale: string
): locale is Locale {
  return locales.includes(locale as Locale);
}