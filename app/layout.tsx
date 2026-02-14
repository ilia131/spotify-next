import "./globals.css";

import type { Metadata } from "next";
import RootClientLayout from "./RootClientLayout";
import localFont from "next/font/local";
import Provider from '@/redux/Provider';
import PWARegister from "./pwa-register";

import Setup from "@/utils/authsetup/Setup";
import type { Viewport } from "next";
import images from "@/public/images";
import Image from "next/image";
export const viewport: Viewport = {
  // themeColor: "#121212",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor:'#121212'
};



export const metadata :Metadata = {
  title: "My App",
  description: "Next PWA",
  manifest: "/manifest.webmanifest",
};

const myFont = localFont({
  src: "../public/fonts/Poppins/Poppins-Medium.ttf",
});



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${myFont.className}`}>
        {/* <Provider>
        <PWARegister />

          <Setup />
             <RootClientLayout>{children}</RootClientLayout>
        </Provider> */}
        <Image src={images.hip2} alt='dd' width={375} height={500}
        className='fixed h-dvh pt-[-40px]'
        />
      </body>
    </html>
  );
}
