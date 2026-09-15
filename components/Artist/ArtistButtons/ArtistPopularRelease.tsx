"use client"

import TitleMusic from "../ArtistTabs/TitleMusic"
import PopularReleaseCard from "./PopularReleaseCard"

import { useParams } from "next/navigation"

import { useGetArtistAlbumsQuery } from "@/redux/services/artistContentApiSlice"

import { Song } from "@/redux/features/playerSlice"
import { Album } from "@/redux/services/artistApislice"


const ArtistPopularRelease = () => {
  const params = useParams<{ artistname: string }>()

  const artistname = decodeURIComponent(
    params.artistname
  )

  const {
    data,
    isLoading,
    isError,
  } = useGetArtistAlbumsQuery({
    artistname,
    cursor: null,
  })


  const releases: Song[] =
    data?.results
      ?.slice(0, 5)
      .map((album: Album) => ({
        id: album.id,
        title: album.title,
        image_url: album.cover,
      })) ?? []


  /* =========================
     Loading
  ========================= */

  if (isLoading) {
    return (
      <div className="grid gap-2.25 px-4 pt-5.25">

        <TitleMusic title="Popular releases" />

        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="
              flex
              h-[64px]
              items-center
              gap-3
              overflow-hidden
              rounded-md
              bg-[#181818]
            "
          >

            <div
              className="
                h-[64px]
                w-[64px]
                shrink-0
                animate-pulse
                bg-[#292929]
              "
            />

            <div className="flex flex-1 flex-col gap-2">

              <div
                className="
                  h-4
                  w-32
                  animate-pulse
                  rounded
                  bg-[#292929]
                "
              />

              <div
                className="
                  h-3
                  w-20
                  animate-pulse
                  rounded
                  bg-[#292929]
                "
              />

            </div>

          </div>
        ))}

      </div>
    )
  }


  /* =========================
     Error
  ========================= */

  if (isError) {
    return (
      <div className="px-4 pt-5">
        <TitleMusic title="Popular releases" />

        <p className="mt-4 text-sm text-white/40">
          Couldn&apos;t load popular releases.
        </p>
      </div>
    )
  }


  /* =========================
     Empty
  ========================= */

  if (!releases.length) {
    return null
  }


  /* =========================
     Content
  ========================= */

  return (
    <div className="grid gap-2.25 px-4 pt-5.25">

      <TitleMusic title="Popular releases" />

      {releases.map((item, index) => (
        <PopularReleaseCard
          key={item.id ?? index}
          item={item}
        />
      ))}

    </div>
  )
}


export default ArtistPopularRelease
