"use client";

import { useState } from "react";
import { useGetArtistAlbumsQuery } from "@/redux/services/artistContentApiSlice";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Album } from "@/redux/services/artistApislice";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

export default function ArtistAlbumsPage() {

  const params = useParams<{ artistname: string }>();
  const artistname = decodeURIComponent(params.artistname);

  const [cursor, setCursor] = useState<string | null>(null);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const { data, isLoading, isFetching } =
    useGetArtistAlbumsQuery({
      artistname,
      cursor,
    });

  if (inView && data?.next && !isFetching) {
    const nextCursor =
      new URL(data.next).searchParams.get("cursor");

    if (nextCursor !== cursor) {
      setCursor(nextCursor);
    }
  }

  const albums: Album[] = data?.results ?? [];

  return (
    <div className="bg-black min-h-screen text-white p-6">

      <h1 className="text-3xl font-bold mb-8">
        Albums
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {albums.map((album: Album) => (
          <Link
            href={`/album/${artistname}/${album.title}`}
            key={album.id}
          >

            <Image
              src={album.cover}
              alt={album.title}
              width={300}
              height={300}
              className="
                w-full aspect-square
                object-cover rounded-xl
              "
            />

            <h2 className="mt-2 font-medium">
              {album.title}
            </h2>

          </Link>
        ))}

      </div>

      {(isLoading || isFetching) && (
        <div className="flex justify-center py-10">
          <div className="
            w-8 h-8
            border-2 border-white/30
            border-t-white
            rounded-full
            animate-spin
          " />
        </div>
      )}

      <div ref={ref} className="h-10" />

    </div>
  );
}
