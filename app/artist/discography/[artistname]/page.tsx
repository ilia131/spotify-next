"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function DiscographyPage() {
  const params = useParams<{ artistname: string }>();
  const pathname = usePathname();

  const artistname = decodeURIComponent(params.artistname);

  const songsPath = `/artist/discography/${params.artistname}/songs`;
  const albumsPath = `/artist/discography/${params.artistname}/albums`;

  const isSongs = pathname === songsPath;
  const isAlbums = pathname === albumsPath;

  return (
    <main className="min-h-screen w-full bg-[#121212] text-white pb-30">
      <div className="mx-auto min-h-screen w-full max-w-[440px] overflow-hidden">

        {/* Top subtle Spotify-style glow */}
        <div
          className="
            pointer-events-none absolute left-0 top-0
            h-[320px] w-full
            bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.16),transparent_65%)]
          "
        />

        {/* Header */}
        <header className="relative px-5 pt-5">
          <div className="flex items-center justify-between">

            <Link
              href={`/artist/${artistname}`}
              aria-label="Back"
              className="
                flex h-10 w-10 items-center justify-center
                rounded-full
                bg-black/40
                backdrop-blur-md
                transition-all duration-200
                hover:bg-[#282828]
                active:scale-90
              "
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            <button
              type="button"
              className="
                flex h-10 w-10 items-center justify-center
                rounded-full
                bg-black/40
                text-white/70
                backdrop-blur-md
                transition
                hover:text-white
              "
            >
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="5"
                  cy="12"
                  r="1.5"
                  fill="currentColor"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="1.5"
                  fill="currentColor"
                />
                <circle
                  cx="19"
                  cy="12"
                  r="1.5"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </header>

        {/* Hero */}
        <section className="relative px-5 pb-7 pt-10">

          <p className="mb-2 text-[13px] font-semibold uppercase tracking-[2px] text-[#1ed760]">
            Artist
          </p>

          <h1 className="text-[36px] font-black leading-[1.05] tracking-[-1.5px]">
            Discography
          </h1>

          <p className="mt-3 text-[14px] text-[#b3b3b3]">
            Releases by{" "}
            <span className="font-medium text-white">
              {artistname}
            </span>
          </p>
        </section>

        {/* Tabs */}
        <nav className="relative flex gap-2 overflow-x-auto px-5 pb-6 hide-scrollbar">

          <Link
            href={songsPath}
            className={`
              flex h-9 shrink-0 items-center justify-center
              rounded-full px-5
              text-[14px] font-bold
              transition-all duration-200
              ${
                isSongs
                  ? "bg-[#1ed760] text-black shadow-[0_4px_20px_rgba(30,215,96,0.18)]"
                  : "bg-[#282828] text-white hover:bg-[#333333]"
              }
            `}
          >
            Songs
          </Link>

          <Link
            href={albumsPath}
            className={`
              flex h-9 shrink-0 items-center justify-center
              rounded-full px-5
              text-[14px] font-bold
              transition-all duration-200
              ${
                isAlbums
                  ? "bg-[#1ed760] text-black shadow-[0_4px_20px_rgba(30,215,96,0.18)]"
                  : "bg-[#282828] text-white hover:bg-[#333333]"
              }
            `}
          >
            Albums
          </Link>

        </nav>

        {/* Divider */}
        <div className="mx-5 h-px bg-white/[0.07]" />

        {/* Content */}
        <section className="px-5 pb-24 pt-7">

          {isSongs && (
            <div>
              <div className="mb-5">
                <h2 className="text-[22px] font-bold tracking-[-0.4px]">
                  Songs
                </h2>

                <p className="mt-1 text-[13px] text-[#a7a7a7]">
                  Singles and tracks
                </p>
              </div>

              <div
                className="
                  flex min-h-[180px]
                  items-center justify-center
                  rounded-xl
                  bg-[#181818]
                  text-[14px]
                  text-[#6f6f6f]
                "
              >
                Songs will appear here
              </div>
            </div>
          )}

          {isAlbums && (
            <div>
              <div className="mb-5">
                <h2 className="text-[22px] font-bold tracking-[-0.4px]">
                  Albums
                </h2>

                <p className="mt-1 text-[13px] text-[#a7a7a7]">
                  Albums and EPs
                </p>
              </div>

              <div
                className="
                  flex min-h-[180px]
                  items-center justify-center
                  rounded-xl
                  bg-[#181818]
                  text-[14px]
                  text-[#6f6f6f]
                "
              >
                Albums will appear here
              </div>
            </div>
          )}

          {!isSongs && !isAlbums && (
            <div>

              <div className="mb-5">
                <h2 className="text-[22px] font-bold">
                  Releases
                </h2>

                <p className="mt-1 text-[13px] text-[#a7a7a7]">
                  Explore the music of {artistname}
                </p>
              </div>

              {/* Featured cards */}
              <div className="grid grid-cols-2 gap-3">

                <Link
                  href={albumsPath}
                  className="
                    group
                    overflow-hidden
                    rounded-xl
                    bg-[#181818]
                    p-3
                    transition-all duration-200
                    hover:bg-[#242424]
                    active:scale-[0.98]
                  "
                >
                  <div
                    className="
                      relative aspect-square
                      overflow-hidden
                      rounded-lg
                      bg-gradient-to-br
                      from-[#333333]
                      via-[#202020]
                      to-[#101010]
                    "
                  >
                    <div
                      className="
                        absolute inset-0
                        bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_55%)]
                      "
                    />

                    <div className="absolute bottom-3 left-3">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-[#1ed760]"
                      >
                        <path
                          d="M7 4V20L19 12L7 4Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>

                  <h3 className="mt-3 text-[15px] font-bold">
                    Albums
                  </h3>

                  <p className="mt-1 text-[12px] text-[#a7a7a7]">
                    Full releases
                  </p>
                </Link>

                <Link
                  href={songsPath}
                  className="
                    group
                    overflow-hidden
                    rounded-xl
                    bg-[#181818]
                    p-3
                    transition-all duration-200
                    hover:bg-[#242424]
                    active:scale-[0.98]
                  "
                >
                  <div
                    className="
                      relative aspect-square
                      overflow-hidden
                      rounded-lg
                      bg-gradient-to-br
                      from-[#1ed760]/20
                      via-[#202020]
                      to-[#101010]
                    "
                  >
                    <div
                      className="
                        absolute inset-0
                        bg-[radial-gradient(circle_at_70%_30%,rgba(30,215,96,0.28),transparent_60%)]
                      "
                    />

                    <div className="absolute bottom-3 left-3">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-[#1ed760]"
                      >
                        <path
                          d="M7 4V20L19 12L7 4Z"
                          fill="currentColor"
                        />
                      </svg>
                      </div>
                  </div>

                  <h3 className="mt-3 text-[15px] font-bold">
                    Songs
                  </h3>

                  <p className="mt-1 text-[12px] text-[#a7a7a7]">
                    Singles & tracks
                  </p>
                </Link>

              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}