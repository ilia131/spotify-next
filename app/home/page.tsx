"use client";

import images from "@/public/images";
import { PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  return (
    <main
      onMouseMove={(e) =>
        setPosition({
          x: e.clientX,
          y: e.clientY,
        })
      }
      className="relative min-h-screen overflow-hidden bg-[#070707] text-white"
    >
      {/* Mouse Glow */}
      <div
        className="pointer-events-none absolute z-0 hidden lg:block h-[500px] w-[500px] rounded-full bg-green-500/20 blur-[180px] transition-all duration-300"
        style={{
          left: position.x - 250,
          top: position.y - 250,
        }}
      />

      {/* Aurora Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-20%] h-[400px] w-[400px] rounded-full bg-green-500/20 blur-[140px]" />

        <div className="absolute right-[-10%] top-[10%] h-[350px] w-[350px] rounded-full bg-violet-500/20 blur-[140px]" />

        <div className="absolute bottom-[-20%] left-[30%] h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[180px]" />
      </div>

      {/* Navbar */}
      <header className="fixed top-0 z-50 w-full">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <div className="rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-xl">
            <h1 className="text-lg font-black tracking-wider">
              MILIFY
            </h1>
          </div>

          <Link
            href="/music"
            className="rounded-full bg-green-500 px-5 py-3 text-sm font-semibold text-black transition hover:scale-105"
          >
            Open App
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 flex min-h-screen items-center px-6 py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          {/* Left Side */}
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur-xl">
              🎵 Future Of Music
            </span>

            <h1 className="mt-6 text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
              Music
              <br />
              Beyond
              <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                {" "}
                Streaming
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base text-zinc-400 sm:text-lg lg:mx-0">
              Discover millions of songs, immersive playlists and
              futuristic audio experiences in one beautiful platform.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Link
                href="/music"
                className="rounded-full bg-green-500 px-8 py-4 font-semibold text-black transition hover:scale-105"
              >
                Start Listening
              </Link>

              <button className="rounded-full border border-white/10 bg-white/5 px-8 py-4 backdrop-blur-xl transition hover:bg-white/10">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div className="order-1 flex items-center justify-center lg:order-2 lg:justify-end">
            <div className="relative">
              {/* Music Card */}
              <div className="animate-float rounded-[32px] border border-white/10 bg-white/5 p-4 backdrop-blur-3xl sm:p-6">
                <Image
                  src={images.dorcci2}
                  alt="Album"
                  width={220}
                  height={220}
                  className="
                    aspect-square
                    w-[220px]
                    rounded-3xl
                    object-cover
                    sm:w-[280px]
                    lg:w-[320px]
                  "
                />

                <div className="mt-5">
                  <h3 className="text-lg font-bold">
                    Be Koja Residi
                  </h3>

                  <p className="text-sm text-zinc-400">
                    Dorcci
                  </p>
                </div>

                {/* Progress */}
                <div className="mt-5 h-1 rounded-full bg-white/10">
                  <div className="h-full w-2/3 rounded-full bg-green-400" />
                </div>

                {/* Controls */}
                <div className="mt-5 flex items-center justify-center gap-6 text-xl">
                  <button>⏮</button>
                   <PlayCircle />
                  <button>⏭</button>
                </div>
              </div>

              {/* Equalizer */}
              <div className="absolute -left-10 top-1/2 hidden -translate-y-1/2 gap-2 md:flex">
                {[40, 70, 90, 50, 80].map((height, index) => (
                  <div
                    key={index}
                    style={{ height }}
                    className="w-2 animate-pulse rounded-full bg-green-400"
                  />
                ))}
              </div>

              {/* Floating Icons */}
              <div className="absolute -right-4 top-6 rounded-2xl border border-white/10 bg-white/10 p-3 text-2xl backdrop-blur-xl">
                🎵
              </div>

              <div className="absolute -left-4 bottom-8 rounded-2xl border border-white/10 bg-white/10 p-3 text-2xl backdrop-blur-xl">
                🎧
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}