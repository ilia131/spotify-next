"use client";

import { useEffect, useMemo, useState } from "react";
import { useGetArtistAlbumsQuery } from "@/redux/services/artistContentApiSlice";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Album } from "@/redux/services/artistApislice";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

export default function ArtistAlbumsPage() {
  const params = useParams<{ artistname: string }>();
  const router = useRouter();

  const artistname = decodeURIComponent(params.artistname);

  const [cursor, setCursor] = useState<string | null>(null);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const {
    data,
    isLoading,
    isFetching,
  } = useGetArtistAlbumsQuery({
    artistname,
    cursor,
  });

  const albums: Album[] = useMemo(
    () => data?.results ?? [],
    [data?.results]
  );

  /*
   * Infinite pagination
   */
  useEffect(() => {
    if (!inView || !data?.next || isFetching) return;

    const nextCursor = new URL(data.next).searchParams.get(
      "cursor"
    );

    if (nextCursor && nextCursor !== cursor) {
      setCursor(nextCursor);
    }
  }, [
    inView,
    data?.next,
    isFetching,
    cursor,
  ]);

  /*
   * First album = Hero cover
   */
  const firstAlbum = albums[0];

  const heroCover = firstAlbum?.cover || "";

  return (
    <main className="min-h-screen w-full bg-[#121212] text-white">
      <div className="mx-auto min-h-screen w-full max-w-[440px] overflow-hidden">

        {/* ================================================= */}
        {/* HERO */}
        {/* ================================================= */}

        <section className="relative overflow-hidden">

          {/* Blurred album cover */}
          {heroCover && (
            <div
              className="
                absolute
                inset-x-0
                -top-20
                h-[430px]
                scale-125
                bg-cover
                bg-center
                opacity-35
                blur-3xl
              "
              style={{
                backgroundImage: `url(${heroCover})`,
              }}
            />
          )}

          {/* Spotify dark gradient */}
          <div
            className="
              absolute
              inset-0
              h-[480px]
              bg-gradient-to-b
              from-black/10
              via-[#121212]/65
              to-[#121212]
            "
          />

          <div className="relative px-5 pb-8 pt-5">

            {/* ================= TOP BAR ================= */}

            <div className="mb-8 flex items-center justify-between">

              <button
                type="button"
                onClick={() => router.back()}
                aria-label="Go back"
                className="
                  flex h-10 w-10
                  items-center justify-center
                  rounded-full
                  bg-black/40
                  backdrop-blur-md
                  transition
                  hover:bg-black/60
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
              </button>

              <button
                type="button"
                className="
                  flex h-10 w-10
                  items-center justify-center
                  rounded-full
                  bg-black/40
                  backdrop-blur-md
                  text-white/80
                  backdrop-blur-md
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

            {/* ================= HERO COVER ================= */}

            <div className="flex justify-center">

              {isLoading ? (
                <div
                  className="
                    aspect-square
                    w-[220px]
                    animate-pulse
                    rounded-[4px]
                    bg-[#282828]
                    shadow-[0_20px_60px_rgba(0,0,0,0.6)]
                  "
                />
              ) : heroCover ? (
                <div
                  className="
                    relative
                    aspect-square
                    w-[220px]
                    overflow-hidden
                    rounded-[4px]
                    bg-[#282828]
                    shadow-[0_20px_60px_rgba(0,0,0,0.65)]
                  "
                >
                  <Image
                    src={heroCover}
                    alt={firstAlbum?.title || "Album"}
                    fill
                    priority
                    sizes="220px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div
                  className="
                    flex
                    aspect-square
                    w-[220px]
                    items-center
                    justify-center
                    rounded-[4px]
                    bg-[#282828]
                    text-white/20
                  "
                >
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6Z" />
                  </svg>
                </div>
              )}

            </div>

            {/* ================= TITLE ================= */}

            <div className="mt-7">

              <p className="mb-2 text-[12px] font-semibold uppercase tracking-[2px] text-[#1ed760]">
                Discography
              </p>

              <h1
                className="
                  text-[34px]
                  font-black
                  leading-[1.05]
                  tracking-[-1.5px]
                "
              >
                Albums
              </h1>

              <p className="mt-2 text-[14px] text-[#b3b3b3]">
                {artistname}

                {albums.length > 0 && (
                  <>
                    {" "}
                    • {albums.length} albums
                  </>
                )}
              </p>

            </div>

          </div>
        </section>

        {/* ================================================= */}
        {/* ALBUMS */}
        {/* ================================================= */}

        <section className="px-5 pb-32">

          <div className="mb-5 flex items-end justify-between">

            <div>
              <h2 className="text-[21px] font-bold tracking-[-0.3px]">
                Albums
              </h2>

              <p className="mt-1 text-[13px] text-[#a7a7a7]">
                Albums and EPs
              </p>
            </div>

            {albums.length > 0 && (
              <span className="text-[12px] text-[#777]">
                {albums.length}
              </span>
            )}

          </div>

          {/* ================= LOADING ================= */}

          {isLoading ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-7">

              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i}>

                  <div
                    className="
                      aspect-square
                      w-full
                      animate-pulse
                      rounded-lg
                      bg-[#282828]
                    "
                  />

                  <div
                    className="
                      mt-3
                      h-4
                      w-[75%]
                      animate-pulse
                      rounded
                      bg-[#282828]
                    "
                  />

                  <div
                    className="
                      mt-2
                      h-3
                      w-[45%]
                      animate-pulse
                      rounded
                      bg-[#222222]
                    "
                  />

                </div>
              ))}

            </div>
          ) : albums.length > 0 ? (

            /* ================= ALBUM GRID ================= */

            <div className="grid grid-cols-2 gap-x-4 gap-y-8">

              {albums.map((album: Album) => (
                <Link
                  href={`/album/${artistname}/${album.title}`}
                  key={album.id}
                  className="
                    group
                    min-w-0
                    active:scale-[0.98]
                  "
                >

                  {/* Cover */}
                  <div
                    className="
                      relative
                      aspect-square
                      w-full
                      overflow-hidden
                      rounded-lg
                      bg-[#282828]
                      shadow-[0_8px_25px_rgba(0,0,0,0.25)]
                    "
                  >
                    <Image
                      src={album.cover}
                      alt={album.title}
                      fill
                      sizes="(max-width: 440px) 45vw, 200px"
                      className="
                        object-cover
                        transition-transform
                        duration-300
                        group-hover:scale-[1.03]
                      "
                    />

                    {/* Play button */}
                    <div
                      className="
                        absolute
                        bottom-2
                        right-2
                        flex
                        h-10
                        w-10
                        translate-y-2
                        items-center
                        justify-center
                        rounded-full
                        bg-[#1ed760]
                        text-black
                        opacity-0
                        shadow-lg
                        transition-all
                        duration-200
                        group-hover:translate-y-0
                        group-hover:opacity-100
                      "
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M8 5V19L19 12L8 5Z" />
                      </svg>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="
                      mt-3
                      truncate
                      text-[15px]
                      font-bold
                      text-white
                    "
                  >
                    {album.title}
                  </h3>

                  {/* Meta */}
                  <p className="mt-1 text-[12px] text-[#a7a7a7]">
                    Album
                  </p>

                </Link>
              ))}

            </div>

          ) : (

            /* ================= EMPTY ================= */

            <div
              className="
                flex
                min-h-[220px]
                flex-col
                items-center
                justify-center
                rounded-xl
                bg-[#181818]
                text-center
              "
            >
              <div
                className="
                  mb-4
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  bg-[#282828]
                  text-white/40
                "
              >
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M4 19.5V5.5C4 4.67 4.67 4 5.5 4H20"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />

                  <path
                    d="M8 8H20V20H8C6.9 20 6 19.1 6 18C6 16.9 6.9 16 8 16H20"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <p className="text-[15px] font-semibold">
                No albums yet
              </p>

              <p className="mt-1 text-[13px] text-[#777]">
                This artist hasn't released any albums.
              </p>
            </div>

          )}

          {/* ================= FETCH MORE ================= */}

          {isFetching && !isLoading && (
            <div className="flex justify-center py-8">

              <div
                className="
                  h-7
                  w-7
                  animate-spin
                  rounded-full
                  border-2
                  border-white/20
                  border-t-[#1ed760]
                "
              />

            </div>
          )}

          {/* Infinite scroll */}
          <div
            ref={ref}
            className="h-10"
          />

        </section>
      </div>
    </main>
  );
}