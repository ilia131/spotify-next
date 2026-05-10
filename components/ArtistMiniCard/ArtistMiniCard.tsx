"use client";

import Image from "next/image";
import { Artist, useGetFavArtistsQuery } from "@/redux/services/artistApislice";
import { useRouter } from "next/navigation";
const ArtistMiniCard = () => {
  const router = useRouter()
  const { data: artists, isLoading, error } = useGetFavArtistsQuery(0);

  if (isLoading) {
    return <p className="text-white p-4">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 p-4">Error loading artists</p>;
  }

  return (
    <section className="grid grid-cols-2 gap-3 pr-3">
      {artists?.map((artist : Artist) => (
        <div key={artist.id} className="flex" onClick={() => router.push(`artist/${artist?.artistname}`)}>
          <div className="h-15 w-17 rounded-tl-[5px] 
          rounded-tr-[1px] rounded-br-[1px] rounded-bl-[5px] overflow-hidden">
            <Image
              src={artist.profile_pic}
              width={60}
              height={60}
              alt={artist.artistname}
              className="h-full object-cover
              rounded-tl-[5px] 
          rounded-tr-[1px] rounded-br-[1px] rounded-bl-[5px]
              "
            />
          </div>

          <div className="w-full h-15 bg-[rgb(39_39_39/0.91)] flex pl-4 items-center rounded-tl-[1px] rounded-tr-[5px] rounded-br-[5px] rounded-bl-[1px]">
            <p className="text-[12.5px] font-semibold text-[rgb(255_255_255/0.86)]">
              {artist.artistname}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ArtistMiniCard;
