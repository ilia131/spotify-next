"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function DiscographyPage() {
      const params = useParams<{ artistname: string }>();
    

  const artistname = decodeURIComponent(params.artistname);

  return (
    <div className="w-full min-h-screen bg-black text-white p-6">

      <h1 className="text-3xl font-bold mb-8">
        Discography
      </h1>

      <div className="flex gap-4">

        <Link
          href={`/artist/discography/${artistname}/songs`}
          className="
            px-6 py-3 rounded-full
            bg-white text-black
            hover:opacity-80
            transition
          "
        >
          Songs
        </Link>

        <Link
          href={`/artist/discography/${artistname}/albums`}
          className="
            px-6 py-3 rounded-full
            border border-white/20
            hover:bg-white hover:text-black
            transition
          "
        >
          Albums
        </Link>

      </div>

    </div>
  );
}
