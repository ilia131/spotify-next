import type { Metadata, Viewport } from "next";
import { Vazirmatn } from "next/font/google";
import localFont from "next/font/local";

import RootClientLayout from "./RootClientLayout";
import Provider from "@/redux/Provider";
import PWARegister from "./pwa-register";
import "./globals.css";
import Setup from "@/utils/authsetup/Setup";
import { LanguageProvider } from "@/i18n/LanguageProvider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#121212",
};

export const metadata: Metadata = {
  title: "Milify",
  description: "Milify",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/Icons/milify-192.png",
    apple: "/Icons/milify-180.png",
  },
};

/* =========================
   ENGLISH FONT
========================= */

const inter = localFont({
  src: "../public/fonts/Inter23.ttf",
  variable: "--font-inter",
  display: "swap",
});

/* =========================
   PERSIAN FONT
========================= */

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
  display: "swap",
});

/* =========================
   ROOT LAYOUT
========================= */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fa"
      className={`${inter.variable} ${vazirmatn.variable}`}
    >
      <body className="font-[var(--font-vazirmatn)]">
        <LanguageProvider>
          <Provider>
            <PWARegister />
            <Setup />

            <RootClientLayout>
              {children}
            </RootClientLayout>
          </Provider>
        </LanguageProvider>
      </body>
    </html>
  );
}