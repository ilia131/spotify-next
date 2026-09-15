import type { Metadata } from "next";
import RootClientLayout from "./RootClientLayout";
import localFont from "next/font/local";
import Provider from '@/redux/Provider';
import PWARegister from "./pwa-register";
import "./globals.css";
import Setup from "@/utils/authsetup/Setup";
import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor:'#121212'
};



export const metadata :Metadata = {
  title: "Milify",
  description: "Milify",
  manifest: "/manifest.webmanifest",
};


const myFont = localFont({
  src: "../public/fonts/Inter23.ttf",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body className={`${myFont.className} `}>
        <div className="fixed inset-0 -z-10 overflow-hidden">
  <div className="absolute left-[-200px] top-[-100px] h-[500px] w-[500px] rounded-full bg-green-500/20 blur-[150px]" />

  <div className="absolute right-[-150px] top-[50px] h-[450px] w-[450px] rounded-full bg-violet-500/20 blur-[150px]" />

  <div className="absolute bottom-[-200px] left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[180px]" />
   </div>
        <Provider>
         <PWARegister />
            <Setup />
             <RootClientLayout>{children}</RootClientLayout>
          </Provider>
      </body>
    </html>
  );
}
